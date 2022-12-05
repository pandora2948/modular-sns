import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserService } from '../../../api/services';

const useFetchCheckIsFollow = ({ username }) => {
  const [isFollow, setIsFollow] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const isFollow = await UserService.checkFollow({ username });
        setIsFollow(isFollow);
      } catch (e) {
        alert(e);
      }
    })();
  }, [username]);

  return { isFollow, setIsFollow };
};

useFetchCheckIsFollow.propTypes = {
  username: PropTypes.string.isRequired,
};

export default useFetchCheckIsFollow;
