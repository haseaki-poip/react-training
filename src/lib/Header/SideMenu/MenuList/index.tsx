import { memo } from "react";

type Props = {
  listNameArray: string[];
  listType: "large" | "normal";
};
const MenuList = memo(({ listNameArray, listType }: Props) => {
  return (
    <ul>
      <style>
        {`
        .border-bottom-move span:after {
                        content: " ";
                        width: 0%;
                        position: absolute;
                        left: 0;
                        bottom: -4px;
                        border-bottom: 2px solid white;
                        transition: width .2s linear .1s;
        }
        .border-bottom-move:hover span:after {
            width: 140%;
        }
        `}
      </style>
      {/* タイプによってサイズを変える */}
      {listType === "normal"
        ? listNameArray.map((listName, key) => {
            return (
              <li key={key} className="h-10 flex my-1">
                <a
                  href="/"
                  className="flex items-center flex-grow pl-8 border-bottom-move"
                >
                  <span className="relative text-base">{listName}</span>
                </a>
              </li>
            );
          })
        : listNameArray.map((listName, key) => {
            return (
              <li key={key} className="h-16 flex my-4">
                <a
                  href="/"
                  className="flex items-center flex-grow pl-8 border-bottom-move"
                >
                  <span className="relative text-2xl">{listName}</span>
                </a>
              </li>
            );
          })}
    </ul>
  );
});

export default MenuList;
