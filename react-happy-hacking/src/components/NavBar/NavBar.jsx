import { PlusCircleFilled } from '@ant-design/icons';
import shortid from 'shortid';

const InitialComp = () => <PlusCircleFilled style={{ fontSize: '1.8em' }} />;

export const NavBar = () => {
  return (
    <nav className="relative h-12 inset-x-0 flex bottom-0 bg-white px-4 py-2 justify-between items-center">
      {Array(5).fill(0).map(() => (
        <button key={shortid.generate()}>
          <InitialComp />
        </button>
      ))}
    </nav>
  );
};
