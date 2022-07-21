import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api';
import { Transaction } from '../../entities';
import axios from 'axios';

const postTransactionThunk = createAsyncThunk('put/transaction', async (transaction: Transaction, thunk) => {
  try {
    const payload = {
      amount: transaction.amount,
      description: transaction.description,
      isInstallment: transaction.isInstallment,
      installmentAmount: transaction.installmentAmount,
      date: transaction.date,
      category: transaction.category,
      invoice: transaction.invoice,
    };
    const response = await api.post<Transaction>(`/transactions`, payload, {
      headers: axios.defaults.headers.common,
    });
    return thunk.fulfillWithValue(response.data);
  } catch (error) {
    console.log('[postTransactionThunk] an error ocurred while trying to save transaction', error);
    return thunk.rejectWithValue(error);
  }
});

export default postTransactionThunk;
