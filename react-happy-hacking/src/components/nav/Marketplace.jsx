import { Collapse, Modal } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { MarketItem } from 'components/nav/MarketItem';
import shortid from 'shortid';

const mockItems = [
  { name: 'firstFunction', description: 'lorem..blah blah' },
  { name: 'secondFunction', description: 'lorem..blah' },
  { name: 'thirdFunction', description: 'lorem..blah' },
  { name: 'fourthFunction', description: 'lorem..blah' },
  { name: 'fifthFunction', description: 'lorem..blah' },
];

const Marketplace = ({ isOpen, onClick }) => {
  return (
    <Modal
      open={isOpen}
      centered
      onCancel={onClick}
      onOk={onClick}
      closable={false}
      footer={null}
    >
      <div className="h-96 overflow-y-scroll">
        <Collapse accordion>
          {mockItems.map(({ name, description }) => {
            return (
              <CollapsePanel
                key={shortid.generate()}
                header={name}
                showArrow={false}
              >
                <MarketItem name={name} description={description} />
              </CollapsePanel>
            );
          })}
        </Collapse>
      </div>
    </Modal>
  );
};

export default Marketplace;
