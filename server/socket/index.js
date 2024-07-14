const express = require('express');
const {Server} = require("socket.io");
const http = require("http");
const UserModel = require("../models/user-model");
const {ConversationModel, MessageModel} = require('../models/conversation-model')
const getUserDetailsFromToken = require('./../helpers/get-user-details-from-token');
const app = express();

/// socket connection
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: ['http://localhost:5173', process.env.FRONTEND_URL],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    }
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5174'); // Замените на ваш домен, если он отличается
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST'); // Укажите допустимые методы запроса
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Укажите допустимые заголовки запроса
    next();
});
const onlineUsers = new Set()
io.on('connection', async (socket) => {
    console.log('connected user', socket.id);

    /// current user
    const token = socket.handshake.auth.token;

    try {
        const user = await getUserDetailsFromToken(token);

        socket.join(user?._id.toString());

        onlineUsers.add(user._id.toString());


        io.emit('online users', Array.from(onlineUsers));

        socket.on('message page', async (userId)=>{
            console.log('user id', userId)
            userId = userId.replace(/^:/, '');
          const user = await UserModel.findById(userId).select('-password')
            console.log('user details', user)

            const payload = {
                _id : user?._id,
                name: user?.name,
                email: user?.email,
                profile_pic: user?.profile_pic,
                online: onlineUsers.has(userId)
            }
            socket.emit('message user', payload);

        })

        /// new message

        socket.on('new message', async (data) => {

            /// check conversation is available both user
            const cleanedReceiver = data.receiver.replace(':', '');

            let conversation = await ConversationModel.findOne({
                '$or': [
                    {sender:data?.sender, receiver: cleanedReceiver},
                    {sender:cleanedReceiver, receiver: data?.sender}
                ]
            })
            console.log('conversation', conversation)
            /// if conversation is not available
           if(!conversation) {
               const createConversation = await ConversationModel({
                   sender:data.sender,
                   receiver: cleanedReceiver
               })
               conversation = await createConversation.save()
           }
           const message = new MessageModel({
                text: data.text,
               imageUrl: data.imageUrl,
               videoUrl: data.videoUrl,
               msByUserId: data.msByUserId
           })
            const saveMessage = await message.save()

            const updateConversation = await ConversationModel.updateOne({_id: conversation._id}, {
                '$push': {
                    messages: saveMessage._id
                }
            })
            const getConversationMessage = await ConversationModel.findOne({
                '$or': [
                    {sender:data?.sender, receiver: cleanedReceiver},
                    {sender:cleanedReceiver, receiver: data?.sender}
                ]
            }).populate('messages').sort({updatedAt: -1})

            io.to(data?.sender).emit('message', getConversationMessage.messages)
            io.to(cleanedReceiver).emit('message', getConversationMessage.messages)
        })

        socket.on('disconnect', () => {
            onlineUsers.delete(user._id);
            console.log('disconnected user', socket.id);

            io.emit('online users', Array.from(onlineUsers));
        });
    } catch (error) {
        console.error('Error retrieving user details from token:', error.message);
    }
})
module.exports = {
    app,
    server
};