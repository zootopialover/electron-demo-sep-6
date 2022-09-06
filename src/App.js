import { useEffect, useCallback, useState } from 'react';
import './App.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {

  const [captured, setCaptured] = useState('Not Captured');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const screen1 = useFullScreenHandle();

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if ((e.metaKey || e.altKey) && e.code === 'Tab') {
        setCaptured('Captured');
      } else {
        setCaptured('Not Captured');
      }
    });
  });

  const reportChange = useCallback((state, handle) => {
    if (handle === screen1) {
      setIsFullScreen(state)
    }
  }, [screen1]);

  return (
    <div>
      <p> {captured} </p>
      <div>
        <button onClick={screen1.enter}>
          Enter fullscreen
        </button>

        <FullScreen handle={screen1} onChange={reportChange}>
          {isFullScreen ? <p> Entered Full Screen </p> : <p> Not in Full Screen </p>}
        </FullScreen>
      </div>
    </div>
  );
}

export default App;
