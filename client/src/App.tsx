import React from 'react';
import { devtools } from 'valtio/utils';
import { useSnapshot } from 'valtio';

import './index.css';
import Pages from './Pages';
import { state } from './state';
import Loader from './components/ui/Loader';

devtools(state, 'App State');
const App: React.FC = () => {
  const currentState = useSnapshot(state);

  return (
    <>
      <Loader isLoading={currentState.isLoading} color="orange" width={120} />
      <Pages/>
    </>
  );
};

export default App;
