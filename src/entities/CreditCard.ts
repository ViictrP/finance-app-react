import UserProfile from './UserProfile';
import Invoice from './Invoice';

export default interface CreditCard {
  id: string;
  title: string;
  description: string;
  number: string;
  user: UserProfile;
  invoices: Invoice[];
  invoiceClosingDay: number;
  createAt: Date;
}
