import {
  Children,
  MouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useWindowDimensions } from "./useWindowDimensions";

type Props = {
  children: ReactNode;
};
const Slider = ({ children }: Props) => {
  const { width } = useWindowDimensions();
  const countOfChildren = Children.count(children);
  const [centerIndex, setCenterIndex] = useState(1);
  const [startX, setStartX] = useState(0);
  const [positionX, setPositionX] = useState(-centerIndex * width);
  const [beforePositionX, setBeforePositionX] = useState(-centerIndex * width);
  const [isAnimation, setIsAnimation] = useState(false);

  useEffect(() => {
    setPositionX(-centerIndex * width);
  }, [centerIndex, width]);

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    setStartX(e.clientX);
  };
  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    // クリックしていない状態でもeventが発火してしまうため、クリックしているかどうか判別
    if (e.buttons === 0) return;

    const deltaX = e.clientX - startX;

    // 要素がない方向へスクロールできなくする
    if (centerIndex === 0 && deltaX > 0) return;
    if (centerIndex === countOfChildren - 1 && deltaX < 0) return;

    setPositionX((x) => x + deltaX);
    setStartX(e.clientX);
  };
  const handleMouseUp = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    setIsAnimation(true);
    setBeforePositionX(positionX);
    const deltaX = -centerIndex * width - positionX;
    if (deltaX > 200) {
      return setCenterIndex((i) => i + 1);
    }
    if (deltaX < -200) {
      return setCenterIndex((i) => i - 1);
    }
    setPositionX(-centerIndex * width);
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const deltaX = e.touches[0].clientX - startX;

    // 要素がない方向へスクロールできなくする
    if (centerIndex === 0 && deltaX > 0) return;
    if (centerIndex === countOfChildren - 1 && deltaX < 0) return;

    setPositionX((x) => x + deltaX);
    setStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsAnimation(true);
    setBeforePositionX(positionX);
    const deltaX = -centerIndex * width - positionX;
    if (deltaX > 200) {
      return setCenterIndex((i) => i + 1);
    }
    if (deltaX < -200) {
      return setCenterIndex((i) => i - 1);
    }
    setPositionX(-centerIndex * width);
  };

  const style = useMemo(() => {
    if (isAnimation) {
      setIsAnimation(false);
      return `
        .positionX {
          animation-name: move-animation-${positionX};
            animation-fill-mode: forwards;
            animation-duration: 0.5s;
            animation-timing-function: ease;
        }
        @keyframes move-animation-${positionX} {
            from {
                transform: translateX(${beforePositionX}px);
            }
            to {
                transform: translateX(${positionX}px);
            }
        }
      `;
    }

    return `
    .positionX {
        transform: translateX(${positionX}px);
      }
    `;
  }, [positionX]);

  return (
    <>
      <style>{style}</style>
      <div
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={(e) => handleTouchEnd(e)}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        className="w-full overflow-hidden"
      >
        <div className="flex items-center positionX cursor-pointer">
          {Children.map(children, (child) => {
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
