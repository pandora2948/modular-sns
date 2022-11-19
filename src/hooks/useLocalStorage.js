import { useState } from 'react';

/**
 * @param { string } key - 로컬 스토리지 키
 * @param { any } initialValue - 초기값
 *
 * @returns { [ storedValue: any, setValue: (nextValue: any) => void ] }
 */
export const useLocalStorage = (key, initialValue) => {
  // 값을 저장할 상태
  // 로직이 한 번만 실행되도록 초기 상태 함수를 useState 에 전달합니다.
  const [storedValue, setStoredValue] = useState(() => getStoredValue(key, initialValue));
  // useState 의 setter 함수의 래핑된 버전을 반환합니다.
  // ... 새 값을 localStorage 에 유지합니다.
  const setValue = (value) => {
    try {
      // 값이 함수가 되도록 허용하여 useState 와 동일한 API 를 갖습니다.
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // 상태 저장
      setStoredValue(valueToStore);
      // localStorage 에 저장
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // 오류 케이스를 처리하도록 구현할 수 있습니다.
      // log.error('setValue', error)
    }
  };
  return [storedValue, setValue];
};

function getStoredValue(key, initialValue) {
  try {
    // 키로 로컬 저장소에서 가져오기
    const item = window.localStorage.getItem(key);
    // 저장된 json 을 구문 분석하거나 아무것도 반환하지 않으면 initialValue 를 반환합니다.
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    return initialValue;
  }
}
