import { useEffect, useState } from "react";

export const useDebounce = <T>(val: T, delay: number) => {
  const [debounce, setDebounce] = useState(val);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(val);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [val]);
  return debounce;
};
