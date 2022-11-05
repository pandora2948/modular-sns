import { Collapse, Modal } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import shortid from 'shortid';
import { MarketItem } from './MarketItem';

const itemInfo = [
  { name: 'firstFunction', description: 'lorem..blah blah' },
  { name: 'secondFunction', description: 'lorem..blah' },
  { name: 'thirdFunction', description: 'lorem..blah' },
  { name: 'fourthFunction', description: 'lorem..blah' },
  { name: 'fifthFunction', description: 'lorem..blah' },
];

export const Marketplace = ({ isOpen, onClick }) => {
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
          {itemInfo.map(({ name, description }, i) => {
            return (
              <CollapsePanel header={name} showArrow={false}>
                <MarketItem
                  name={name}
                  description={description}
                  key={shortid.generate()}
                />
              </CollapsePanel>
            );
          })}
        </Collapse>
      </div>
    </Modal>
  );
};
