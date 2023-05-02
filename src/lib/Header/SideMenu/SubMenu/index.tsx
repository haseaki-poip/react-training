import { memo } from "react";

type Props = {
  isOpenSubMenu: boolean;
  handleBackButton: () => void;
};

const SubMenu = memo(({ isOpenSubMenu, handleBackButton }: Props) => {
  return (
    <div
      className={
        "w-full md:w-96 h-screen absolute top-full z-50 md:z-30 bg-[#232323] border-t-[1px] border-t-white transition-all linear duration-500 " +
        (isOpenSubMenu ? "left-0 md:left-96" : "-left-full md:-left-96")
      }
    >
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
  );
});

export default SubMenu;
