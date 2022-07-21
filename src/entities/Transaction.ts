import Invoice from './Invoice';
import UserProfile from './UserProfile';

export default interface Transaction {
  id: string;
  amount: number;
  description: string;
  isInstallment: boolean;
  installmentAmount?: number;
  date: Date;
  createdAt: Date;
  invoice?: Invoice;
  user?: UserProfile;
  category: 'food' | 'home' | 'credit-card' | 'shop' | 'other'
}
