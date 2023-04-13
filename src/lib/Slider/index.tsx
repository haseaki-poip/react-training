import {
  Children,
  DragEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { useWindowDimensions } from "./useWindowDimensions";

type Props = {
  children: ReactNode;
};
const Slider = ({ children }: Props) => {
  const { width, height } = useWindowDimensions();
  const countOfChildren = Children.count(children);
  const [centerIndex, setCenterIndex] = useState(1);
  const [startX, setStartX] = useState(0);
  const [positionX, setPositionX] = useState(-centerIndex * width);

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
          .spaceX {
            margin: 0 ${width / 4}px
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
        <div className="flex items-center positionX cursor-pointer">
          {Children.map(children, (child) => {
            console.log(child);
            return (
              <div className="min-w-full h-full flex justify-center items-center">
                {child}
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Slider;
