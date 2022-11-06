import { PlusCircleFilled } from '@ant-design/icons';
import { useModal } from 'hooks/useModal';
import shortid from 'shortid';
import Marketplace from './Marketplace';

const Nav = () => {
  const { isModalOpen, toggleModal, openModal } = useModal();

  return (
    <nav>
      <Marketplace isOpen={isModalOpen} onClick={toggleModal} />
      <section className="h-12 inset-x-0 bottom-0 bg-white px-4 py-2 flex justify-between">
        {Array(5)
          .fill(0)
          .map(() => (
            <button key={shortid.generate()} onClick={openModal}>
              <PlusCircleFilled style={{ fontSize: '1.8em' }} />
            </button>
          ))}
      </section>
    </nav>
  );
};

export default Nav;
