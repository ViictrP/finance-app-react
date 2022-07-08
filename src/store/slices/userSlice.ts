import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../entities';
import { RootState } from '../store';
import { getUserProfileThunk } from '../thunks';

interface UserSlice {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoadingProfile: boolean;
}

const initialState: UserSlice = {
  profile: null,
  isAuthenticated: false,
  isLoadingProfile: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = { ...action.payload };
    },
    setIsLoadingProfile: (state, action: PayloadAction<boolean>) => {
      state.isLoadingProfile = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserProfileThunk.pending, state => {
      state.isLoadingProfile = true;
    });

    builder.addCase(getUserProfileThunk.fulfilled, (state, action: any) => {
      state.profile = action.payload;
      state.isLoadingProfile = false;
    });

    builder.addCase(getUserProfileThunk.rejected, (state, action: any) => {
      state.profile = null;
      state.isLoadingProfile = false;
    });
  },
});

export const userActions = userSlice.actions;
export const userApiActions = { getUserProfileThunk };
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
