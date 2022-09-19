import { PlusCircleFilled } from '@ant-design/icons';

export const NavBar = ({
  buttons = [...new Array(5)].map((el, i) => (
    <PlusCircleFilled style={{ fontSize: '1.8em' }} />
  )),
}) => {
  return (
    <nav className="relative h-12 inset-x-0 flex bottom-0 bg-white px-4 py-2 justify-between items-center">
      {buttons.map((btn) => (
        <button>{btn}</button>
      ))}
    </nav>
  );
};
