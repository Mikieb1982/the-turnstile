
<<<<<<< HEAD
import { useState } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
=======
import { useState, useEffect } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
<<<<<<< HEAD
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
=======
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
    } catch (error) {
      console.error(error);
    }
  };

<<<<<<< HEAD
=======
  useEffect(() => {
     try {
        const item = window.localStorage.getItem(key);
        if (item) {
            setStoredValue(JSON.parse(item));
        }
     } catch (error) {
        console.error(error)
     }
  }, [key]);

>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
  return [storedValue, setValue];
};
