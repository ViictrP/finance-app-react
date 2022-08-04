import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreditCard } from '../../entities';
import { api } from '../../lib/api';
import axios from 'axios';

const putCreditCardThunk = createAsyncThunk('put/creditCard', async (creditCard: CreditCard, thunk) => {
  try {
    const response = await api.put<CreditCard>(`/credit-cards/${creditCard.id}`, creditCard, {
      headers: axios.defaults.headers.common
    });
    return thunk.fulfillWithValue(response.data);
  } catch (error) {
    console.log('[putCreditCardThunk] an error ocurred while trying to save credit card', error);
    return thunk.rejectWithValue(error);
  }
});

export default putCreditCardThunk;
