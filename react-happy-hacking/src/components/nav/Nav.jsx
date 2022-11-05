import { PlusCircleFilled } from '@ant-design/icons';
import { useModal } from 'hooks/useModal';
import shortid from 'shortid';
import Marketplace from './Marketplace';

const Nav = () => {
  const { open, handleFlip, handleOpen } = useModal();

  return (
    <nav>
      <Marketplace isOpen={open} onClick={handleFlip} />
      <section className="h-12 inset-x-0 bottom-0 bg-white px-4 py-2 flex justify-between">
        {Array(5)
          .fill(0)
          .map(() => (
            <button key={shortid.generate()} onClick={handleOpen}>
              <PlusCircleFilled style={{ fontSize: '1.8em' }} />
            </button>
          ))}
      </section>
    </nav>
  );
};

export default Nav;
