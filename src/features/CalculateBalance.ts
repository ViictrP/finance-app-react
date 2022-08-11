import { UserProfile } from '../entities';
import { api } from '../lib/api';
import axios from 'axios';

interface Balance {
  expensesTotalAmount: number;
  availableAmount: number;
}

const calculateBalance = async (user: UserProfile, month: string, year: number) => {
  const response = await api.get<Balance>(`/balances?month=${month}&year=${year}`, {
    headers: axios.defaults.headers.common
  });
  return response.data;
};

export default calculateBalance;
