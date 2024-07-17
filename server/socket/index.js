const express = require('express');
const { Server } = require("socket.io");
const http = require("http");
const UserModel = require("../models/user-model");
const { ConversationModel, MessageModel } = require('../models/conversation-model');
const getUserDetailsFromToken = require('./../helpers/get-user-details-from-token');

const app = express();

/// socket connection
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', process.env.FRONTEND_URL],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    }
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5174');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

const onlineUsers = new Set();

io.on('connection', async (socket) => {

    /// current user
    try {
        const token = socket.handshake.auth.token;
        const user = await getUserDetailsFromToken(token);

        socket.join(user?._id.toString());
        onlineUsers.add(user._id.toString());
        io.emit('online users', Array.from(onlineUsers));

        /// message page
        socket.on('message page', async (userId) => {
            console.log('user id', userId);
            userId = userId.replace(/^:/, '');

            try {
                const otherUser = await UserModel.findById(userId).select('-password');
                console.log('user details', otherUser);

                if (!otherUser) {
                    console.log('Other user not found');
                    socket.emit('message', []);
                    return;
                }

                const payload = {
                    _id: otherUser._id,
                    name: otherUser.name,
                    email: otherUser.email,
                    profile_pic: otherUser.profile_pic,
                    online: onlineUsers.has(userId)
                };
                socket.emit('message user', payload);

                /// get prev conversation messages
                const conversation = await ConversationModel.findOne({
                    '$or': [
                        { sender: user?._id, receiver: userId },
                        { sender: userId, receiver: user?._id }
                    ]
                }).populate('messages').sort({ updatedAt: -1 });

                if (!conversation || !conversation.messages || conversation.messages.length === 0) {
                    console.log('No conversation or messages found');
                    socket.emit('message', []);
                    return;
                }

                socket.emit('message', conversation.messages);

            } catch (error) {
                console.error('Error fetching conversation and messages:', error.message);
                socket.emit('message', []);
            }
        });

        // new message
        socket.on('new message', async (data) => {
            const cleanedReceiver = data.receiver.replace(':', '');

            try {
                let conversation = await ConversationModel.findOne({
                    '$or': [
                        { sender: data?.sender, receiver: cleanedReceiver },
                        { sender: cleanedReceiver, receiver: data?.sender }
                    ]
                });
                /// if conversation is not available
                if (!conversation) {
                    const newConversation = new ConversationModel({
                        sender: data.sender,
                        receiver: cleanedReceiver
                    });
                    conversation = await newConversation.save();
                }

                const message = new MessageModel({
                    text: data.text,
                    imageUrl: data.imageUrl,
                    videoUrl: data.videoUrl,
                    msByUserId: data.msByUserId
                });

                const savedMessage = await message.save();

                await ConversationModel.findByIdAndUpdate(conversation._id, {
                    $push: { messages: savedMessage._id }
                });

                conversation = await ConversationModel.findById(conversation._id)
                    .populate('messages')
                    .sort({ updatedAt: -1 });

                io.to(data?.sender).emit('message', conversation.messages);
                io.to(cleanedReceiver).emit('message', conversation.messages);

            } catch (error) {
                console.error('Error saving new message:', error.message);
            }
        });

        /// sidebar
        socket.on('sidebar', async (currentUserId) => {
            try {
                const currentUserConversations = await ConversationModel.find({
                    $or: [
                        { sender: currentUserId },
                        { receiver: currentUserId }
                    ]
                }).sort({ updatedAt: -1 }).populate('messages').populate('sender').populate('receiver');

                const conversations = currentUserConversations.map((conv) => {
                    const unseenMessages = conv.messages.reduce((prev, current) => {
                        if (current.msByUserId.toString() !== currentUserId && !current.seen) {
                            return prev + 1;
                        } else {
                            return prev;
                        }
                    }, 0);
                    return {
                        id: conv._id,
                        sender: conv.sender,
                        receiver: conv.receiver,
                        unseenMessages: unseenMessages,
                        lastMessage: conv.messages[conv.messages.length - 1]
                    };
                });

                socket.emit('conversation', conversations);

                /// seen-unseen messages
                socket.on('seen', async (msgByUserId) => {
                    try {
                        let conversation = await ConversationModel.findOne({
                            '$or': [
                                { sender: currentUserId, receiver: msgByUserId },
                                { sender: msgByUserId, receiver: currentUserId }
                            ]
                        });

                        const updateMessages = await MessageModel.updateMany(
                            { _id: { '$in': conversation.messages }, msByUserId: msgByUserId, seen: false },
                            { '$set': { seen: true } }
                        );

                        const updatedConversations = await ConversationModel.find({
                            $or: [
                                { sender: currentUserId },
                                { receiver: msgByUserId }
                            ]
                        }).sort({ updatedAt: -1 }).populate('messages').populate('sender').populate('receiver');

                        const updatedConvPayload = updatedConversations.map((conv) => {
                            const unseenMessages = conv.messages.reduce((prev, current) => {
                                if (current.msByUserId.toString() !== currentUserId && !current.seen) {
                                    return prev + 1;
                                } else {
                                    return prev;
                                }
                            }, 0);
                            return {
                                id: conv._id,
                                sender: conv.sender,
                                receiver: conv.receiver,
                                unseenMessages: unseenMessages,
                                lastMessage: conv.messages[conv.messages.length - 1]
                            };
                        });

                        socket.emit('conversation', updatedConvPayload);

                    } catch (error) {
                        console.error('Error marking messages as seen:', error.message);
                    }
                });

            } catch (error) {
                console.error('Error fetching sidebar conversations:', error.message);
            }
        });

        // disconnect
        socket.on('disconnect', () => {
            onlineUsers.delete(user._id.toString());
            console.log('disconnected user', socket.id);
            io.emit('online users', Array.from(onlineUsers));
        });

    } catch (error) {
        console.error('Error retrieving user details from token:', error.message);
    }
});

module.exports = {
    app,
    server
};
