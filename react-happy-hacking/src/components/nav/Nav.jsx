import { PlusCircleFilled } from '@ant-design/icons';
import { useModal } from 'hooks/useModal';
import shortid from 'shortid';
import Marketplace from './Marketplace';

const Nav = () => {
  const {
    isModalOpen: isMarketPlaceModalOpen,
    toggleModal: toggleMarketPlaceModal,
    openModal: openMarketPlaceModal,
  } = useModal();

  return (
    <nav>
      <section className="fixed h-12 inset-x-0 bottom-0 bg-white px-4 py-2 flex justify-between">
        {Array(5)
          .fill(0)
          .map(() => (
            <button key={shortid.generate()} onClick={openMarketPlaceModal}>
              <PlusCircleFilled style={{ fontSize: '1.8em' }} />
            </button>
          ))}
      </section>

      <Marketplace
        isOpen={isMarketPlaceModalOpen}
        onClick={toggleMarketPlaceModal}
      />
    </nav>
  );
};

export default Nav;
