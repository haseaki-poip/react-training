import { memo } from "react";

type Props = {
  isOpenSubMenu: boolean;
  handleBackButton: () => void;
};

const SubMenu = memo(({ isOpenSubMenu, handleBackButton }: Props) => {
  return (
    <div
      className={
        "w-full md:w-96 h-screen absolute top-0 z-50 md:-z-30 transition-all linear duration-500 " +
        (isOpenSubMenu ? "left-0 md:left-full" : "-left-full md:left-0")
      }
    >
      <div className="bg-[#232323] w-full h-full">
        <div className="text-white">
          <ul>
            <li onClick={handleBackButton}>back</li>
            <li>Home</li>
            <li>About us</li>
            <li>Design Tent</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default SubMenu;
