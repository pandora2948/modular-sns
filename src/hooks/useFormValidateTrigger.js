import { useCallback, useState } from 'react';

export function useFormValidateTrigger() {
  const [hasFeedback, setHasFeedback] = useState(false);
  const [formValidateTrigger, setFormValidateTrigger] = useState('onFinish');

  const onFormFinishFailed = useCallback(() => {
    setFormValidateTrigger(['onFinish', 'onChange']);
    setHasFeedback(true);
  }, []);

  return {
    hasFeedback,
    formValidateTrigger,
    onFormFinishFailed,
  };
}
