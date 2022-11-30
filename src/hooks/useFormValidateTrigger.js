import { useCallback, useState } from 'react';

export function useFormValidateTrigger() {
  const [hasFeedback, setHasFeedback] = useState(false);

  const onFormFinishFailed = useCallback(() => {
    setHasFeedback(true);
  }, []);

  return {
    hasFeedback,
    onFormFinishFailed,
  };
}
