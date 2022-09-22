import { useEffect, useRef } from 'react';
import qs from 'qs';
import { redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input, message } from 'antd';

export const Search = ({ open, setOpen }) => {
  const inputRef = useRef(null);

  const onSearch = searchText => {
    const hashtags = searchText.match(/(#+[가-힣a-zA-Z0-9]+)/g);
    if (!hashtags)
      return message.error('해시태그를 검색해주세요.');
    if (hashtags?.length > 5)
      return message.error('해시태그 5개 이상 검색할 수 없습니다.');
    const queries = qs.stringify(hashtags);
    const redir = redirect(`/search?tags=${queries}`);
    console.log(redir);
  };

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
  }, [open, setOpen]);

  if (!open) return null;
  return (
    <div className="absolute right-1 -bottom-12 z-10">
      <Input.Search
        size="large" ref={inputRef}
        onSearch={onSearch}
      />
    </div>
  );
};

Search.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
