import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import shortid from 'shortid';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

const { Text } = Typography;

export const Hashtag = ({ tag }) => {
  const navigate = useNavigate();
  const query = useMemo(() => qs.stringify([tag]), [tag]);
  const onClickTag = () => navigate(`/search?${query}`);

  return (
    <Text
      onClick={onClickTag}
      className="text-sky-500 pr-0.5 cursor-pointer"
      key={shortid.generate()}
    >
      { tag }
    </Text>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};
