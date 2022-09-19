import PropTypes from 'prop-types';
import { Input } from 'antd';
import { useEffect, useRef } from 'react';

export const Search = ({ open, setOpen }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const onBlur = () => setOpen(false);

    if (inputRef.current) {
      const { input: search } = inputRef.current;
      search.focus();
      search.onblur = onBlur;
    }

    return () => {
      if (inputRef.current) {
        const { input: search } = inputRef.current;
        search.onblur = null;
      }
    }
  }, [open, inputRef.current, setOpen]);

  if (!open) return null;
  return (
    <div className="absolute right-1 -bottom-12 z-10">
      <Input.Search size="large" ref={inputRef} />
    </div>
  );
};

Search.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
