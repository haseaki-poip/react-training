import { memo, useEffect, useState } from "react";
import SubMenu from "./SubMenu";

const SideMenu = memo(({ isOpenMenu }: { isOpenMenu: boolean }) => {
  const [isOpenSubMenu, setIsOpenSubmenu] = useState(false);
  useEffect(() => {
    if (!isOpenMenu) {
      setIsOpenSubmenu(false);
    }
  }, [isOpenMenu]);

  return (
    // absolute top-full (100%)を設定することで基準の親要素のbottomにtopが合う
    <>
      <div
        className={
          "w-full md:w-96 h-screen absolute top-full z-40 bg-[#161616] border-t-[1px] border-t-white transition-all linear duration-500 " +
          (isOpenMenu ? "left-0" : "-left-full md:-left-96")
        }
      >
        <div className="text-white">
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li
              onClick={() =>
                setIsOpenSubmenu((prevIsOpenSubMenu) => !prevIsOpenSubMenu)
              }
            >
              Design Tent
            </li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <SubMenu
        isOpenSubMenu={isOpenSubMenu}
        handleBackButton={() => setIsOpenSubmenu(false)}
      />
    </>
  );
});

export default SideMenu;
