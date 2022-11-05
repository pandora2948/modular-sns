import { PlusCircleFilled } from '@ant-design/icons';
import shortid from 'shortid';
import { useModal } from '../../hooks/useModal';
import { Marketplace } from './Marketplace';

export const NavBar = () => {
  const { open, handleFlip, handleOpen } = useModal();

  const InitialComp = () => <PlusCircleFilled style={{ fontSize: '1.8em' }} />;

  return (
    <nav>
      <Marketplace isOpen={open} onClick={handleFlip} />
      <section className="h-12 inset-x-0 bottom-0 bg-white px-4 py-2 flex justify-between">
        {Array(5)
          .fill(0)
          .map(() => (
            <button key={shortid.generate()} onClick={handleOpen}>
              <InitialComp />
            </button>
          ))}
      </section>
    </nav>
  );
};
