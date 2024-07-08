import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export type UserState = {
  _id: string
  email: string
  name: string
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
    },
    setToken: (state, action: PayloadAction<TokenState>) => {
      state.token = action.payload.token
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id
      state.email = action.payload.email
      state.name = action.payload.name
      state.profile_pic = action.payload.profile_pic
    },
  },
})

export const { logout, setToken, setUser } = userSlice.actions
export default userSlice.reducer
