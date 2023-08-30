import React, { useEffect } from 'react';
import { devtools } from 'valtio/utils';
import { useSnapshot } from 'valtio';

import './index.css';
import Pages from './Pages';
import { actions, state } from './state';
import Loader from './components/ui/Loader';
import { getTokenPayload } from './util';

devtools(state, 'App State');
const App: React.FC = () => {
  const currentState = useSnapshot(state);

  useEffect(() => {
    console.log('App useEffect - checking token and send to proper page');

    actions.startLoading();

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      actions.stopLoading();
      return;
    }

    const { exp: tokenExp } = getTokenPayload(accessToken);
    const currentTimeInSeconds = Date.now() / 1000;

    if (tokenExp < currentTimeInSeconds - 100) {
      localStorage.removeItem('accessToken');
      actions.stopLoading();
      return;
    }

    actions.setPollAccessToken(accessToken);

    actions.initializeSocket();
  }, []);

  return (
    <>
      <Loader isLoading={currentState.isLoading} color="orange" width={120} />
      <Pages />
    </>
  );
};

export default App;
