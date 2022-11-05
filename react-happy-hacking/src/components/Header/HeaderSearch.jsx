import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input, message } from 'antd';
import qs from 'qs';

const HeaderSearch = ({ closeSearch }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const onSearch = useCallback(
    (searchText) => {
      if (!searchText) {
        return;
      }

      const hashtags = searchText.match(/#+[가-힣a-zA-Z0-9]+/g);

      if (!hashtags) {
        return message.error('해시태그로 검색해주세요.');
      }

      const filteredHashTags = [
        ...new Set(hashtags.map((v) => v.replace(/#{2,}/g, '#'))),
      ];

      if (filteredHashTags.length > 5) {
        return message.error('해시태그는 5개 이상 검색할 수 없습니다.');
      }

      closeSearch();
      navigate(`/search?${qs.stringify(filteredHashTags)}`);
    },
    [navigate, closeSearch]
  );

  useEffect(() => {
    if (!inputRef.current) return;

    const search = inputRef.current.input;
    search.focus();
    search.onblur = closeSearch;
  }, [closeSearch, inputRef]);

  return (
    <div className="absolute right-1 -bottom-12 z-10">
      <Input.Search
        ref={inputRef}
        placeholder="#개발 #개발자"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
};

HeaderSearch.propTypes = {
  closeSearch: PropTypes.func.isRequired,
};

export default HeaderSearch;
