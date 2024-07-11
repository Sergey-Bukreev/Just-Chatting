import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'
export type OnlineUsersType = string[]
export type UserState = {
  _id: string
  email: string
  name: string
  onlineUsers: OnlineUsersType
  profile_pic: string
  socketConnection: Socket | null
  token: string
}
export type TokenState = {
  token: string
}
type SetSocketConnectionPayload = {
  socketConnection: Socket | null
}
const initialState: UserState = {
  _id: '',
  email: '',
  name: '',
  onlineUsers: [],
  profile_pic: '',
  socketConnection: null,
  token: '',
}

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    logout: state => {
      state._id = ''
      state.email = ''
      state.name = ''
      state.profile_pic = ''
      state.token = ''
      state.onlineUsers = []
      state.socketConnection = null
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    },
    setSocketConnection: (state, action: PayloadAction<SetSocketConnectionPayload>) => {
      // @ts-ignore
      state.socketConnection = action.payload.socketConnection
    },
    setToken: (state, action: PayloadAction<TokenState>) => {
      state.token = action.payload.token
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id
      state.email = action.payload.email
      state.name = action.payload.name
      state.profile_pic = action.payload.profile_pic
      state.onlineUsers = action.payload.onlineUsers
    },
  },
})

export const { logout, setOnlineUsers, setSocketConnection, setToken, setUser } = userSlice.actions
export default userSlice.reducer
