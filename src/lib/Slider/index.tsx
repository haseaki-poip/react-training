import { Children, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const Slider = ({ children }: Props) => {
  const countOfChildren = Children.count(children);
  console.log(countOfChildren);
  return (
    <div className="w-full">
      <div className="flex gap-64 justify-center items-center overflow-hidden">
        {/* overflow-hiddenをしていてもmin-wを設定しないと要素が小さくなって画面内に収まるだけ */}
        {children}
      </div>
      <div></div>
    </div>
  );
};

export default Slider;
