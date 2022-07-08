import { api } from '../../lib/api';
import { UserProfile } from '../../entities';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getUserProfileThunk = createAsyncThunk('userProfile', async (data, thunkApi) => {
  try {
    const response = await api.get<UserProfile>('/me', {
      headers: axios.defaults.headers.common,
    });
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    console.log('[getUserProfile] an error ocurred while trying to get logged user profile', error);
    thunkApi.rejectWithValue(error);
  }
});

export default getUserProfileThunk;
