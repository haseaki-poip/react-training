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
  const [positionX, setPositionX] = useState(0);

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    setStartX(e.clientX);
  };
  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    // クリックしていない状態でもeventが発火してしまうため、クリックしているかどうか判別
    if (e.buttons === 1) {
      const deltaX = e.clientX - startX;
      setPositionX((x) => x + deltaX);
      setStartX(e.clientX);
    }
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const deltaX = e.touches[0].clientX - startX;
    setPositionX((x) => x + deltaX);
    setStartX(e.touches[0].clientX);
  };

  return (
    <>
      <style>
        {`
          .positionX {
            transform: translateX(${positionX}px);
          }
        `}
      </style>
      <div
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        className="w-full overflow-hidden"
      >
        <div className="flex gap-64 justify-center items-center positionX">
          {children}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Slider;
