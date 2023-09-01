import React, { useEffect } from 'react';
import { devtools } from 'valtio/utils';
import { useSnapshot } from 'valtio';

import './index.css';
import Pages from './Pages';
import { actions, state } from './state';
import Loader from './components/ui/Loader';
import { getTokenPayload } from './util';
import SnackBar from './components/ui/SnackBar';

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

  useEffect(() => {
    console.log('App useEffect - check current participant');
    const myID = currentState.me?.id;

    if (
      myID &&
      currentState.socket?.connected &&
      !currentState.poll?.participants[myID]
    ) {
      actions.startOver();
    }
  }, [currentState.poll?.participants]);

  return (
    <>
      <Loader isLoading={currentState.isLoading} color="orange" width={120} />
      {currentState.wsErrors.map((error) => (
        <SnackBar
          key={error.id}
          type="error"
          title={error.type}
          message={error.message}
          show={true}
          onClose={() => actions.removeWsError(error.id)}
          autoCloseDuration={5000}
        />
      ))}
      <Pages />
    </>
  );
};

export default App;
