import { memo } from "react";

const MenuButton = memo(({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="w-8 h-12 relative">
      <i
        className={
          "bg-white w-full h-0.5 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-out duration-300 " +
          (isOpen ? "top-1/2 rotate-45" : "top-1/4 rotate-0")
        }
      ></i>
      <i
        className={
          "bg-white w-full h-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity ease-out duration-300 " +
          (isOpen ? "opacity-0" : "opacity-100")
        }
      ></i>
      <i
        className={
          "bg-white w-full h-0.5 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-out duration-300 " +
          (isOpen ? "top-1/2 -rotate-45" : "top-3/4 rotate-0")
        }
      ></i>
    </div>
  );
});

export default MenuButton;
