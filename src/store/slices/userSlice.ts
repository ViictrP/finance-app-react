import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../entities';
import { RootState } from '../store';

interface UserSlice {
  profile: UserProfile;
  isAuthenticated: boolean;
}

const initialState: UserSlice = {
  profile: {} as UserProfile,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = { ...action.payload };
    },
  },
});

export const userActions = userSlice.actions;
export const selectProfile = (state: RootState) => state.user;

export default userSlice.reducer;
