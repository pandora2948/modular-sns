import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import AppLayout from 'layouts/AppLayout';

const { Text } = Typography;

const Error = () => (
  <AppLayout>
    <section className="w-full h-full flex flex-col items-center justify-center">
      <WarningFilled style={{ fontSize: '5rem' }} />
      <Text className="text-2xl mt-5">
        해당하는 페이지가 없습니다.
      </Text>
      <Link
        to="/"
        className="text-sky-600 text-xl"
      >
        메인으로 돌아가기
      </Link>
    </section>
  </AppLayout>
);

export default Error;
