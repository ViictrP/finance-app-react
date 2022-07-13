import CreditCard from './CreditCard';
import Transaction from './Transaction';

export default interface UserProfile {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: Date;
  salary: number;
  creditCards: CreditCard[];
  transactions: Transaction[];
};
