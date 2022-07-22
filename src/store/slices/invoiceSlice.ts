import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Invoice } from '../../entities';
import { getInvoiceThunk } from '../thunks';

interface InvoiceSlice {
  isLoading: boolean;
  invoice: Invoice | null;
  fetchError: boolean;
}

const initialState: InvoiceSlice = {
  isLoading: false,
  invoice: null,
  fetchError: false
};

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    clearError: state => {
      state.fetchError = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(getInvoiceThunk.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(getInvoiceThunk.fulfilled, (state, action: any) => {
      state.invoice = action.payload;
      state.isLoading = false;
      state.fetchError = false;
    });

    builder.addCase(getInvoiceThunk.rejected, state => {
      state.isLoading = false;
      state.fetchError = true;
      state.invoice = null;
    });
  }
});

export const invoiceActions = invoiceSlice.actions;
export const invoiceApiActions = {};
export const selectInvoice = (state: RootState) => state.invoice;

export default invoiceSlice.reducer;
