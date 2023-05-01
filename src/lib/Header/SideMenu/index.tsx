import { memo } from "react";

const SideMenu = memo(({ isOpen }: { isOpen: boolean }) => {
  return (
    // absolute top-full (100%)を設定することで基準の親要素のbottomにtopが合う
    <div
      className={
        "w-full sm:w-96 h-screen absolute top-full z-50 bg-[#161616] border-t-[1px] border-t-white transition-all ease-out duration-500 " +
        (isOpen ? "left-0" : "-left-full sm:-left-96")
      }
    >
      <div className="text-white"></div>
    </div>
  );
});

export default SideMenu;
