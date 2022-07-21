import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../entities';
import { RootState } from '../store';
import { getUserProfileThunk, postTransactionThunk, putUserProfileThunk } from '../thunks';

interface UserSlice {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoadingProfile: boolean;
  saveTransactionSuccess: boolean;
  saveTransactionError: boolean;
}

const initialState: UserSlice = {
  profile: null,
  isAuthenticated: false,
  isLoadingProfile: false,
  saveTransactionError: false,
  saveTransactionSuccess: false
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

    builder.addCase(getUserProfileThunk.rejected, state => {
      state.profile = null;
      state.isLoadingProfile = false;
    });

    builder.addCase(putUserProfileThunk.pending, state => {
      state.isLoadingProfile = true;
    });

    builder.addCase(putUserProfileThunk.fulfilled, (state, action: any) => {
      state.isLoadingProfile = false;
      state.profile = action.payload;
    });

    builder.addCase(putUserProfileThunk.rejected, state => {
      state.isLoadingProfile = false;
    });

    builder.addCase(postTransactionThunk.pending, state => {
      state.isLoadingProfile = true;
      state.saveTransactionSuccess = false;
      state.saveTransactionError = false;
    });

    builder.addCase(postTransactionThunk.fulfilled, (state, action: any) => {
      state.isLoadingProfile = false;
      state.saveTransactionSuccess = true;
      state.saveTransactionError = false;
    });

    builder.addCase(postTransactionThunk.rejected, state => {
      state.isLoadingProfile = false;
      state.saveTransactionSuccess = false;
      state.saveTransactionError = true;
    });
  },
});

export const userActions = userSlice.actions;
export const userApiActions = { getUserProfileThunk, putUserProfileThunk, postTransactionThunk };
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
