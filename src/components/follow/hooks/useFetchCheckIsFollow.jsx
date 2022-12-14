import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { UserService } from 'api/services';

const useFetchCheckIsFollow = ({ username }) => {
  const [isFollow, setIsFollow] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    (async () => {
      try {
        const isFollow = await UserService.checkFollow({ username });
        setIsFollow(isFollow);
      } catch (err) {
        messageApi.error(err.message);
      }
    })();
  }, [messageApi, username]);

  return { contextHolder, isFollow, setIsFollow };
};

useFetchCheckIsFollow.propTypes = {
  username: PropTypes.string.isRequired,
};

export default useFetchCheckIsFollow;
