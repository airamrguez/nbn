import { useState, useEffect, useCallback, useRef } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { isNil } from '../utils';

// This is countdown is not fine grained. It discards
// the milliseconds when it is paused.
export default function useCountdown(startSecs) {
  const [countdown, setCountdown] = useState(startSecs);
  const [isCounting, setIsCounting] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    return () => {
      if (!isNil(timer.current)) {
        BackgroundTimer.clearInterval(timer.current);
      }
    };
  }, []);

  const clearTimer = () => {
    BackgroundTimer.clearInterval(timer.current);
    timer.current = null;
    setIsCounting(false);
  };

  const toggleCountdown = useCallback(() => {
    function tick() {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          clearTimer();
        }
        return prevCountdown - 1;
      });
    }
    if (isNil(timer.current)) {
      if (countdown === 0) {
        setCountdown(startSecs);
      }
      // Timer is not running
      timer.current = BackgroundTimer.setInterval(tick, 1000);
      setIsCounting(true);
    } else {
      // Timer was running. Pause it.
      clearTimer();
    }
  });

  return [countdown, isCounting, toggleCountdown];
}
