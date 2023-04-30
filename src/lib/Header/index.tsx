import { useState } from "react";
import MenuButton from "./MenuButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed left-0 top-0 z-50 w-full h-20 bg-[#161616]">
      <div className="w-full h-full flex">
        <div className="w-14 h-14 my-auto mx-auto cursor-pointer">
          <img className="w-full h-full" src="/logo192.png" id="logo" alt="" />
        </div>
        <div
          className="absolute left-8 top-1/2 z-50 -translate-y-1/2 text-white cursor-pointer"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        >
          <MenuButton isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default Header;
