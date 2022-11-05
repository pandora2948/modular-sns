import { PlusCircleFilled } from '@ant-design/icons';
import shortid from 'shortid';

const Nav = () => {
  return (
    <nav className="relative h-12 inset-x-0 flex bottom-0 bg-white px-4 py-2 justify-between items-center">
      {Array(5).fill(0).map(() => (
        <button key={shortid.generate()}>
          <PlusCircleFilled style={{ fontSize: '1.8em' }} />
        </button>
      ))}
    </nav>
  );
};

export default Nav;
