import { PlusCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
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
      <section className="h-12 bottom-0 bg-white px-4 py-2 flex justify-between z-[16] absolute w-full">
        {Array(5)
          .fill(0)
          .map(() => (
            <Button
              type="text"
              key={shortid.generate()}
              onClick={openMarketPlaceModal}
            >
              <PlusCircleFilled style={{ fontSize: '1.8em' }} />
            </Button>
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
