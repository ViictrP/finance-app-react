import './App.css';

import React, { FC } from 'react';
import { Button } from 'antd';

const App: FC = () => {
  return <div className='App'>
    <Button data-testid="button" type="primary">Primary</Button>
  </div>;
};

export default App;
