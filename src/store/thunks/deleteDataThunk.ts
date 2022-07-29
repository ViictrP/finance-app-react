import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api';
import axios from 'axios';

const deleteDataThunk = createAsyncThunk('delete/resetData', async (data, thunk) => {
  try {
    const response = await api.delete('/admin/reset-data', {
      headers: axios.defaults.headers.common,
    });
    return thunk.fulfillWithValue(response.data);
  } catch (error) {
    console.log('[resetDataThunk] an error ocurred while trying to reset user profile', error);
    return thunk.rejectWithValue(error);
  }
});

export default deleteDataThunk;
