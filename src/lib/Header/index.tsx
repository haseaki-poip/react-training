import { useEffect, useState } from "react";
import MenuButton from "./MenuButton";
import useScroll from "./useScroll";
import SideMenu from "./SideMenu";

type Props = {
  ControlStartPosition: number;
  initIsShowHeader: boolean;
};
const Header = (props: Props) => {
  // headerの有無の制御が始まる位置とheaderの初期状態
  const { ControlStartPosition, initIsShowHeader } = props;
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isShowHeader, setIsShowHeader] = useState(initIsShowHeader);
  const scrollPosition = useScroll(); // 現在のスクロール量取得ようカスタムフック
  const [stateOfPosition, setStatePosition] = useState({
    now: scrollPosition,
    pre: scrollPosition,
  });

  useEffect(() => {
    setStatePosition({
      now: scrollPosition,
      pre: stateOfPosition.now,
    });

    // 制御範囲外とメニューが出てきている時はHeaderの有無を変更しない
    if (scrollPosition < ControlStartPosition) return;
    if (isOpenMenu) return;

    const delY = scrollPosition - stateOfPosition.pre;
    if (delY > 0) return setIsShowHeader(false);
    if (delY < 0) return setIsShowHeader(true);
    return;
  }, [scrollPosition]);

  return (
    <div
      className={
        "fixed left-0 z-50 w-full h-20 bg-[#161616] transition-all ease-out duration-300 " +
        (isShowHeader ? "top-0" : "-top-24")
      }
    >
      <div className="w-full h-full flex">
        <div className="w-12 h-12 my-auto mx-auto cursor-pointer">
          <img className="w-full h-full" src="/logo192.png" id="logo" alt="" />
        </div>
        <div
          className="absolute left-8 top-1/2 z-50 -translate-y-1/2 text-white cursor-pointer"
          onClick={() => setIsOpenMenu((prevIsOpenMenu) => !prevIsOpenMenu)}
        >
          <MenuButton isOpenMenu={isOpenMenu} />
        </div>
      </div>
      <SideMenu isOpenMenu={isOpenMenu} />
    </div>
  );
};

export default Header;
