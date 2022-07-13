import Invoice from './Invoice';
import UserProfile from './UserProfile';

export default interface Transaction {
  id: string;
  amount: number;
  isInstallment: boolean;
  installmentAmount?: number;
  createdAt: Date;
  invoice?: Invoice;
  user?: UserProfile;
  category: 'food' | 'home' | 'credit-card' | 'shop' | 'other'
}
