import {
  Children,
  DragEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};
const Slider = ({ children }: Props) => {
  const countOfChildren = Children.count(children);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    setStartX(e.clientX);
  };
  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (e.buttons === 1) {
      setDeltaX(e.clientX - startX);
    }
  };

  console.log(deltaX);

  const onDrag = (
    e:
      | React.TouchEvent<HTMLDivElement>
      | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    console.log(e);
  };

  return (
    <>
      <style>
        {/* アニメーション名も更新しないと反映されない */}
        {`
          .positionX {
            transform: translateX(${deltaX}px);
          }
    
        `}
      </style>
      <div className="w-full overflow-hidden">
        <div
          //   onTouchMove={(e) => onDrag(e)}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          className="flex gap-64 justify-center items-center positionX"
        >
          {children}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Slider;
