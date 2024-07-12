import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export type OnlineUsersType = string[]
export type UserState = {
  _id: string
  email: string
  name: string
  onlineUsers: OnlineUsersType
  profile_pic: string
  token: string
}
export type TokenState = {
  token: string
}

const initialState: UserState = {
  _id: '',
  email: '',
  name: '',
  onlineUsers: [],
  profile_pic: '',
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
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
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

export const { logout, setOnlineUsers, setToken, setUser } = userSlice.actions
export default userSlice.reducer
