import { api } from '../../lib/api';
import { UserProfile } from '../../entities';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const putUserProfileThunk = createAsyncThunk('put/userProfile', async (data: any, thunkApi) => {
  try {
    const payload = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      salary: data.salary
    };
    const response = await api.put<UserProfile>(`/users/${data.id}`, payload, {
      headers: axios.defaults.headers.common,
    });
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    console.log('[putUserProfileThunk] an error ocurred while trying to save user profile', error);
    return thunkApi.rejectWithValue(error);
  }
});

export default putUserProfileThunk;
