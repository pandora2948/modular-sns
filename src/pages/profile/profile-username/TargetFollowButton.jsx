import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';
import { useRecoilState } from 'recoil';
import { UserService } from '../../../api/services';
import atomStore from '../../../store/atom';

const TargetFollowButton = ({ username }) => {
  const [users, setUsers] = useRecoilState(atomStore.meAtom);
  const [isFollow, isSetFollow] = useState(false);
  const onClickFollowUser = async () => {
    try {
      if (!isFollow) {
        await UserService.addFollow({ username });
        isSetFollow(true);
        setUsers({ ...users, allFollowerCount: users.allFollowerCount + 1 });
        return;
      }
      await UserService.removeFollow({ username });
      isSetFollow(false);
    } catch (e) {
      message.error(e);
    }
  };

  return (
    <Button className="mt-1.5" onClick={onClickFollowUser}>
      {isFollow ? '팔로우 취소' : '팔로우'}
    </Button>
  );
};

TargetFollowButton.propTypes = {
  username: PropTypes.string.isRequired,
};

export default TargetFollowButton;
