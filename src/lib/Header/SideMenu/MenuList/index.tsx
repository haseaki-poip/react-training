import { memo } from "react";

type Props = {
  listNameArray: string[];
  listType: "large" | "normal";
};
const MenuList = memo(({ listNameArray, listType }: Props) => {
  return (
    <ul>
      <style>
        {`.after-arrow:after {
                        content: ' ';
                        width: ${listType === "normal" ? "8px" : "16px"};
                        height: ${listType === "normal" ? "8px" : "16px"};
                        position: absolute;
                        top: 50%;
                        right: 40px;
                        transform: rotate(45deg) translateY(-50%);
                        border-top: 1px solid white;
                        border-right: 1px solid white;
                    }`}
      </style>
      {listType === "normal"
        ? listNameArray.map((listName, key) => {
            return (
              <li
                key={key}
                className="h-10 flex my-1 group relative after-arrow"
              >
                <a href="/" className="flex items-center flex-grow pl-8">
                  <span className="text-base transition-all linear duration-300 group-hover:translate-x-4">
                    {listName}
                  </span>
                </a>
              </li>
            );
          })
        : listNameArray.map((listName, key) => {
            return (
              <li
                key={key}
                className="h-16 flex my-4 group relative after-arrow"
              >
                <a href="/" className="flex items-center flex-grow pl-8">
                  <span className="text-2xl transition-all linear duration-300 group-hover:translate-x-4">
                    {listName}
                  </span>
                </a>
              </li>
            );
          })}
    </ul>
  );
});

export default MenuList;
