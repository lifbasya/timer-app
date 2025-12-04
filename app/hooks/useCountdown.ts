import { useState, useEffect, useCallback } from "react";

const useCountdown = (initialSeconds: number) => {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds); // Total detik awal yang diset
  const [seconds, setSeconds] = useState(initialSeconds); // Detik yang tersisa
  const [running, setRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mengatur ulang state saat totalSeconds berubah dari luar
  useEffect(() => {
    setSeconds(totalSeconds);
    setRunning(false);
    setIsCompleted(false);
  }, [totalSeconds]);

  // Logika utama timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    
    if (running && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && running) {
      // Timer selesai
      setRunning(false);
      setIsCompleted(true);
      // Biarkan seconds tetap 0
    }
    
    return () => clearInterval(timer);
  }, [running, seconds]);

  const start = useCallback(() => {
    if (seconds > 0) {
        setRunning(true);
        setIsCompleted(false);
    }
  }, [seconds]);
  
  const pause = useCallback(() => setRunning(false), []);

  const cancel = useCallback(() => {
    setRunning(false);
    setTotalSeconds(0); // Reset total seconds
    setSeconds(0); // Reset seconds yang tersisa
    setIsCompleted(false);
  }, []);

  // Perhitungan H:M:S
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  return {
    seconds,
    hours,
    minutes,
    sec,
    running,
    isCompleted,
    setTotalSeconds,
    start,
    pause,
    cancel,
  };
};

export default useCountdown;