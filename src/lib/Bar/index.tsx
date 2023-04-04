import { MouseEvent, useState } from "react";

const Bar = () => {
  const halfSizeCursor = 16;

  const [absolutePositionY, setAbsolutePositionY] = useState({
    pre: -halfSizeCursor,
    now: -halfSizeCursor,
  });

  const moveCursorByClick = (e: React.MouseEvent<HTMLElement>) => {
    const barPositionY = e.currentTarget.getBoundingClientRect().y;
    const clickPositionOnPageY = e.pageY;
    const clickPositionOnBarY = clickPositionOnPageY - barPositionY;
    setAbsolutePositionY({
      pre: absolutePositionY.now,
      now: clickPositionOnBarY - halfSizeCursor,
    });
  };
  return (
    <>
      <style>
        {/* アニメーション名も更新しないと反映されない */}
        {`
          .cursor-position-top {
            top: ${absolutePositionY.pre}px;
            animation-name: move-animation-${absolutePositionY.now};
            animation-fill-mode: forwards;
            animation-duration: 0.5s;
            animation-timing-function: ease;
          }
    
          @keyframes move-animation-${absolutePositionY.now} {
            0% {
                top: ${absolutePositionY.pre}px;
            }
            100% {
                top: ${absolutePositionY.now}px;
            }
          }
        `}
      </style>
      <div
        onClick={(e) => moveCursorByClick(e)}
        className="w-8 h-96 bg-blue-500 relative cursor-pointer"
      >
        <div className="w-8 h-8 absolute cursor-position-top left-2 z-10 border-[16px] border-transparent border-r-[16px] border-r-red-600"></div>
      </div>
    </>
  );
};

export default Bar;
