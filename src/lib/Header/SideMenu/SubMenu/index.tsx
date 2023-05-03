import { memo } from "react";

type Props = {
  isOpenSubMenu: boolean;
  handleBackButton: () => void;
};

const SubMenu = memo(({ isOpenSubMenu, handleBackButton }: Props) => {
  return (
    // 親要素のsidemenuを基準とした配置
    <div
      className={
        "w-full md:w-96 h-screen absolute top-0 z-50 md:-z-30 transition-all ease-linear duration-300 " +
        (isOpenSubMenu ? "left-0 md:left-full" : "-left-full md:left-0")
      }
    >
      <div className="bg-[#232323] border-t-[1px] border-t-white w-full h-full">
        <div className="text-white">
          <div
            className="py-6 pl-6 pr-8 w-12 group cursor-pointer"
            onClick={handleBackButton}
          >
            <div className="w-4 h-4 border-t-[1px] border-l-[1px] border-white -rotate-45 transition-transform ease-linear duration-300 group-hover:scale-125"></div>
          </div>
          <div className="mt-8">
            <CardMenuList
              cardDatas={[
                { name: "HANASAKA STAND" },
                { name: "Seijo University Dining" },
                { name: "MITSUI Office" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

const CardMenuList = ({ cardDatas }: { cardDatas: { name: string }[] }) => {
  return (
    <ul>
      {cardDatas.map((cardData, key) => {
        return (
          <li key={key} className="w-full h-24 my-4 flex bg-[#606060]">
            <a
              href="/"
              className="flex flex-grow content-start items-center group"
            >
              <div className="w-16 h-16 ml-6 transition-transform ease-linear duration-200 delay-100 group-hover:scale-110">
                <div className="w-full h-full rounded-md bg-white"></div>
              </div>
              <div className="ml-8">
                <h3 className="text-base">{cardData.name}</h3>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SubMenu;
