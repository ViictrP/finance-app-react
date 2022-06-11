import React from 'react';

import SignRoutes from 'routes/SignRoutes';
import AuthenticatedRoutes from 'routes/AuthenticatedRoutes';
import { useAuth } from 'auth/context';

const Routes = () => {
  const { signed } = useAuth();
  return signed ? <AuthenticatedRoutes /> : <SignRoutes />;
};

export default Routes;
