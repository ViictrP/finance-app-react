import { createAsyncThunk } from '@reduxjs/toolkit';
import { Invoice, UserProfile } from '../../entities';
import { api } from '../../lib/api';
import axios from 'axios';

const getInvoiceThunk = createAsyncThunk('get/invoice', async (invoice: Invoice, thunkApi) => {
  try {
    const id = invoice.creditCard.id;
    const response = await api.get<UserProfile>(`/credit-cards/${id}/invoices?month=${invoice.month}&year=${invoice.year}`, {
      headers: axios.defaults.headers.common
    });
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    console.log('[getInvoiceThunk] an error ocurred while trying to get invoice', error);
    return thunkApi.rejectWithValue(error);
  }
});

export default getInvoiceThunk;
