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

const initialPositionState = {
  centerIndex: 0,
  startX: 0,
  beforePositionX: 0,
  positionX: 0,
  isAnimation: false,
};

type Props = {
  children: ReactNode;
};
const Slider = ({ children }: Props) => {
  const { width } = useWindowDimensions();
  const countOfChildren = Children.count(children);

  const reducer = useCallback(
    (state: StateType, action: Action) => {
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
            positionX: nextPositionX,
            startX: action.payload.startX,
          };
        case "MOVE_RETURN":
          return {
            ...state,
            beforePositionX: state.positionX,
            positionX: -state.centerIndex * width,
            isAnimation: true,
          };
        case "MOVE_NEXT":
          const nextCenterIndex = state.centerIndex + 1;
          return {
            ...state,
            centerIndex: nextCenterIndex,
            beforePositionX: state.positionX,
            positionX: -nextCenterIndex * width,
            isAnimation: true,
          };
        case "MOVE_BACK":
          const backedCenterIndex = state.centerIndex - 1;
          return {
            ...state,
            centerIndex: backedCenterIndex,
            beforePositionX: state.positionX,
            positionX: -backedCenterIndex * width,
            isAnimation: true,
          };
        case "CHANGE_WIDTH":
          return {
            ...state,
            positionX: -state.centerIndex * width,
          };
      }
    },
    [width]
  );

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
    const deltaX = -positionState.centerIndex * width - positionState.positionX;
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
    const deltaX = -positionState.centerIndex * width - positionState.positionX;
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
          animation-name: move-animation-${positionState.positionX};
            animation-fill-mode: forwards;
            animation-duration: 0.5s;
            animation-timing-function: ease;
        }
        @keyframes move-animation-${positionState.positionX} {
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
        {positionState.centerIndex !== 0 ? (
          <div
            onClick={() => dispatch({ type: "MOVE_BACK" })}
            className="absolute top-1/2 left-5 z-50 md:left-10 lg:left-20 -translate-y-1/2 group cursor-pointer"
          >
            <div className="w-8 h-8 md:w-16 md:h-16 border-t-4 border-l-4 border-gray-400 -rotate-45 group-hover:border-gray-600"></div>
          </div>
        ) : null}
        {positionState.centerIndex !== countOfChildren - 1 ? (
          <div
            onClick={() => dispatch({ type: "MOVE_NEXT" })}
            className="absolute top-1/2 right-5 z-50 md:right-10 lg:right-20 -translate-y-1/2 group cursor-pointer"
          >
            <div className="w-8 h-8 md:w-16 md:h-16 border-t-4 border-r-4 rotate-45 border-gray-400 group-hover:border-gray-600"></div>
          </div>
        ) : null}
        <div className="flex items-center positionX cursor-pointer">
          {Children.map(children, (child) => {
            return (
              <div className="min-w-full h-full flex justify-center items-center">
                {child}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Slider;
