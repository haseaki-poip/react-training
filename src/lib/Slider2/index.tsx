import {
  Children,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useWindowDimensions } from "./useWindowDimensions";
import type { StateType, Action } from "./type";

type Props = {
  children: ReactNode;
};
const Slider = ({ children }: Props) => {
  // スライドの全体の大きさを決定
  // 以下の場合画面サイズの2.64倍
  const slideWidth_vw = 264;

  const { width } = useWindowDimensions();
  const countOfChildren = Children.count(children);

  const positionByIndex = useCallback(
    (centerIndex: number) => {
      return (
        width / 2 -
        ((slideWidth_vw * width) / 100 / (2 * countOfChildren)) *
          (1 + 2 * centerIndex)
      );
    },
    [width]
  );
  const initialPositionState = {
    centerIndex: 0,
    startX: positionByIndex(0),
    beforePositionX: positionByIndex(0),
    positionX: positionByIndex(0),
    isAnimation: false,
  };

  const reducer = (state: StateType, action: Action) => {
    switch (action.type) {
      case "MOVE_START":
        return {
          ...state,
          startX: action.payload.startX,
          isAnimation: false,
        };
      case "MOVING":
        const nextPositionX = state.positionX + action.payload.deltaX;
        return {
          ...state,
          startX: action.payload.startX,
          positionX: nextPositionX,
        };
      case "MOVE_RETURN":
        return {
          ...state,
          beforePositionX: state.positionX,
          positionX: positionByIndex(state.centerIndex),
          isAnimation: true,
        };
      case "MOVE_NEXT":
        const nextCenterIndex = state.centerIndex + 1;
        return {
          ...state,
          centerIndex: nextCenterIndex,
          beforePositionX: state.positionX,
          positionX: positionByIndex(nextCenterIndex),
          isAnimation: true,
        };
      case "MOVE_BACK":
        const backedCenterIndex = state.centerIndex - 1;
        return {
          ...state,
          centerIndex: backedCenterIndex,
          beforePositionX: state.positionX,
          positionX: positionByIndex(backedCenterIndex),
          isAnimation: true,
        };
      case "CHANGE_WIDTH":
        return {
          ...state,
          positionX: positionByIndex(state.centerIndex),
        };
    }
  };

  const [positionState, dispatch] = useReducer(reducer, initialPositionState);

  useEffect(() => {
    dispatch({
      type: "CHANGE_WIDTH",
    });
  }, [width]);

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    dispatch({
      type: "MOVE_START",
      payload: {
        startX: e.clientX,
      },
    });
  };
  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    // クリックしていない状態でもeventが発火してしまうため、クリックしているかどうか判別
    if (e.buttons === 0) return;

    const deltaX = e.clientX - positionState.startX;

    // 要素がない方向へスクロールできなくする
    if (positionState.centerIndex === 0 && deltaX > 0) return;
    if (positionState.centerIndex === countOfChildren - 1 && deltaX < 0) return;

    dispatch({
      type: "MOVING",
      payload: {
        startX: e.clientX,
        deltaX: deltaX,
      },
    });
  };
  const handleMouseUp = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const deltaX =
      positionByIndex(positionState.centerIndex) - positionState.positionX;
    const actionType = (() => {
      if (deltaX > 200) {
        return "MOVE_NEXT";
      }
      if (deltaX < -200) {
        return "MOVE_BACK";
      }
      return "MOVE_RETURN";
    })();

    return dispatch({
      type: actionType,
    });
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dispatch({
      type: "MOVE_START",
      payload: {
        startX: e.touches[0].clientX,
      },
    });
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const deltaX = e.touches[0].clientX - positionState.startX;

    // 要素がない方向へスクロールできなくする
    if (positionState.centerIndex === 0 && deltaX > 0) return;
    if (positionState.centerIndex === countOfChildren - 1 && deltaX < 0) return;

    dispatch({
      type: "MOVING",
      payload: {
        startX: e.touches[0].clientX,
        deltaX: deltaX,
      },
    });
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const deltaX =
      positionByIndex(positionState.centerIndex) - positionState.positionX;
    const actionType = (() => {
      if (deltaX > 200) {
        return "MOVE_NEXT";
      }
      if (deltaX < -200) {
        return "MOVE_BACK";
      }
      return "MOVE_RETURN";
    })();

    return dispatch({
      type: actionType,
    });
  };

  const style = useMemo(() => {
    if (positionState.isAnimation) {
      return `
        .positionX {
          animation-name: move-animation;
            animation-fill-mode: forwards;
            animation-duration: 0.4s;
            animation-timing-function: ease;
        }
        @keyframes move-animation {
            from {
                transform: translateX(${positionState.beforePositionX}px);
            }
            to {
                transform: translateX(${positionState.positionX}px);
            }
        }
      `;
    }

    return `
    .positionX {
        transform: translateX(${positionState.positionX}px);
      }
    `;
  }, [positionState.positionX]);

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
        className="w-full overflow-hidden relative"
      >
        <div
          // tailwindは動的なクラス名を使用できない
          style={{ width: `${slideWidth_vw}vw` }}
          className="flex items-center justify-around positionX cursor-pointer"
        >
          {/* space-aroundでそれぞれの要素が等しい領域を持つことが重要 */}
          {Children.map(children, (child) => {
            return <div className="h-full">{child}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default Slider;
