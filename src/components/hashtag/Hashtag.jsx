import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import qs from 'qs';
import shortid from 'shortid';

const { Text } = Typography;

const Hashtag = ({ tag }) => {
  const navigate = useNavigate();
  const query = useMemo(() => qs.stringify([tag]), [tag]);

  const onClickTag = useCallback(
    () => navigate(`/search?${query}`),
    [navigate, query]
  );

  return (
    <Text
      onClick={onClickTag}
      className="text-sky-500 pr-0.5 cursor-pointer"
      key={shortid.generate()}
    >
      {tag}
    </Text>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default Hashtag;
