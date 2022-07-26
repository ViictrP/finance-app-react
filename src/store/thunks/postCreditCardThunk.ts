import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreditCard } from '../../entities';
import { api } from '../../lib/api';
import axios from 'axios';

const postCreditCardThunk = createAsyncThunk('post/creditCard', async (data: CreditCard, thunk) => {
  try {
    const payload = {
      title: data.title,
      description: data.description,
      number: data.number,
      invoiceClosingDay: Number(data.invoiceClosingDay),
      backgroundColor: data.backgroundColor,
    };
    const response = await api.post<CreditCard>(`/credit-cards`, payload, {
      headers: axios.defaults.headers.common,
    });
    return thunk.fulfillWithValue(response.data);
  } catch (error) {
    console.log('[postCreditCardThunk] an error ocurred while trying to save credit card', error);
    return thunk.rejectWithValue(null);
  }
});

export default postCreditCardThunk;
