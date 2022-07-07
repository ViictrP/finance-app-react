export default interface UserProfile {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: Date;
};
