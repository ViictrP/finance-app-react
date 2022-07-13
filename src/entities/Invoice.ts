import CreditCard from './CreditCard';
import Transaction from './Transaction';

export default interface Invoice {
  id: string;
  month: string;
  year: number;
  isClosed: boolean;
  creditCard: CreditCard;
  transactions: Transaction[];
  createdAt: Date;
}
