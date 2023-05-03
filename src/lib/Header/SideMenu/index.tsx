import { memo, useEffect, useState } from "react";
import SubMenu from "./SubMenu";
import MenuList from "./MenuList";

const SideMenu = memo(({ isOpenMenu }: { isOpenMenu: boolean }) => {
  const [isOpenSubMenu, setIsOpenSubmenu] = useState(false);
  // sidemenuが閉じた時は強制的にsubmenuも閉じる
  useEffect(() => {
    if (!isOpenMenu) {
      setIsOpenSubmenu(false);
    }
  }, [isOpenMenu]);

  return (
    // absolute top-full (100%)を設定することで基準の親要素のbottomにtopが合う
    <div
      className={
        "w-full md:w-96 h-screen absolute top-full z-40 transition-all linear duration-500 " +
        (isOpenMenu ? "left-0" : "-left-full md:-left-96")
      }
    >
      <div className="bg-[#161616] border-t-[1px] border-t-white w-full h-full pt-10">
        <div className="text-white">
          <MenuList listNameArray={["Home", "About us"]} listType="large" />
          <style>
            {`.after-arrow:after {
                        content: ' ';
                        width: 16px;
                        height: 16px;
                        position: absolute;
                        top: 50%;
                        right: 40px;
                        transform: rotate(45deg) translateY(-50%);
                        border-top: 1px solid white;
                        border-right: 1px solid white;
                    }`}
          </style>
          <div
            className="h-16 flex my-4 group relative after-arrow"
            onClick={() =>
              setIsOpenSubmenu((prevIsOpenSubMenu) => !prevIsOpenSubMenu)
            }
          >
            <div className="flex items-center flex-grow pl-8 cursor-pointer">
              <span className="text-2xl transition-all linear duration-300 group-hover:translate-x-4">
                Design Tent
              </span>
            </div>
          </div>
          <div className="mt-12">
            <div className="mx-4 mb-4 pl-4 py-1 border-b-white border-b-[1px]">
              <h3 className="text-lg">contact</h3>
            </div>
            <MenuList
              listNameArray={["Instagram", "FaceBook", "Twitter", "Youtube"]}
              listType="normal"
            />
          </div>
        </div>
      </div>
      <SubMenu
        isOpenSubMenu={isOpenSubMenu}
        handleBackButton={() => setIsOpenSubmenu(false)}
      />
    </div>
  );
});

export default SideMenu;
