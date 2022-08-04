import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../entities';
import { RootState } from '../store';
import {
  deleteDataThunk,
  getUserProfileThunk,
  postCreditCardThunk,
  postTransactionThunk, putCreditCardThunk,
  putUserProfileThunk
} from '../thunks';

interface UserSlice {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoadingProfile: boolean;
  saveTransactionSuccess: boolean;
  saveTransactionError: boolean;
  saveCreditCardSuccess: boolean;
  saveCreditCardError: boolean;
  deleteError: boolean;
  deleteSuccess: boolean;
}

const initialState: UserSlice = {
  profile: null,
  isAuthenticated: false,
  isLoadingProfile: false,
  saveTransactionError: false,
  saveTransactionSuccess: false,
  saveCreditCardSuccess: false,
  saveCreditCardError: false,
  deleteError: false,
  deleteSuccess: false
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
    resetTransactionSuccessError: state => {
      state.saveTransactionError = false;
      state.saveTransactionSuccess = false;
    },
    resetCreditCardSuccessError: state => {
      state.saveCreditCardError = false;
      state.saveCreditCardSuccess = false;
    },
    resetDeleteError: state => {
      state.deleteError = false;
      state.deleteSuccess = false;
    }
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

    builder.addCase(postCreditCardThunk.pending, state => {
      state.isLoadingProfile = true;
      state.saveCreditCardSuccess = false;
      state.saveCreditCardError = false;
    });

    builder.addCase(postCreditCardThunk.fulfilled, (state, action: any) => {
      state.isLoadingProfile = false;
      state.saveCreditCardSuccess = true;
      state.saveCreditCardError = false;
    });

    builder.addCase(postCreditCardThunk.rejected, state => {
      state.isLoadingProfile = false;
      state.saveCreditCardSuccess = false;
      state.saveCreditCardError = true;
    });

    builder.addCase(putCreditCardThunk.pending, state => {
      state.isLoadingProfile = true;
      state.saveCreditCardSuccess = false;
      state.saveCreditCardError = false;
    });

    builder.addCase(putCreditCardThunk.fulfilled, (state, action: any) => {
      state.isLoadingProfile = false;
      state.saveCreditCardSuccess = true;
      state.saveCreditCardError = false;
    });

    builder.addCase(putCreditCardThunk.rejected, state => {
      state.isLoadingProfile = false;
      state.saveCreditCardSuccess = false;
      state.saveCreditCardError = true;
    });

    builder.addCase(deleteDataThunk.pending, state => {
      state.isLoadingProfile = true;
      state.deleteError = false;
      state.deleteSuccess = false;
    });

    builder.addCase(deleteDataThunk.fulfilled, (state, action: any) => {
      state.isLoadingProfile = false;
      state.deleteError = false;
      state.deleteSuccess = true;
    });

    builder.addCase(deleteDataThunk.rejected, state => {
      state.isLoadingProfile = false;
      state.deleteError = true;
      state.deleteSuccess = false;
    });
  }
});

export const userActions = userSlice.actions;
export const userApiActions = {
  getUserProfileThunk,
  putUserProfileThunk,
  postTransactionThunk,
  postCreditCardThunk,
  putCreditCardThunk,
  deleteDataThunk
};
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
