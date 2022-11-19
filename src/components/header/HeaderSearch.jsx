import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal } from 'antd';
import { useModal } from 'hooks/useModal';
import qs from 'qs';

const HeaderSearch = () => {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
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

      const filteredHashTags = [...new Set(hashtags.map((v) => v.replace(/#{2,}/g, '#')))];

      if (filteredHashTags.length > 5) {
        return message.error('해시태그는 5개 이상 검색할 수 없습니다.');
      }

      navigate(`/search?${qs.stringify(filteredHashTags)}`);
    },
    [navigate]
  );

  return (
    <>
      <Button shape="circle" icon={<SearchOutlined />} onClick={openModal} />

      <Modal title="해쉬태그 검색" open={isModalOpen} onCancel={closeModal} footer={null} centered destroyOnClose>
        <Input.Search ref={inputRef} placeholder="#개발 #개발자" size="large" onSearch={onSearch} />
      </Modal>
    </>
  );
};

HeaderSearch.propTypes = {};

export default HeaderSearch;
