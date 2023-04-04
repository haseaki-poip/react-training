import { MouseEvent, useState } from "react";

const Bar = () => {
  const halfSizeCursor = 16;

  const [absolutePositionY, setAbsolutePositionY] = useState(-halfSizeCursor);

  const moveCursorByClick = (e: React.MouseEvent<HTMLElement>) => {
    const barPositionY = e.currentTarget.getBoundingClientRect().y;
    const clickPositionOnPageY = e.pageY;
    const clickPositionOnBarY = clickPositionOnPageY - barPositionY;
    setAbsolutePositionY(clickPositionOnBarY - halfSizeCursor);
  };
  return (
    <>
      <style>
        {`
          .cursor-position-top {
            top: ${absolutePositionY}px;
          }
        `}
      </style>
      <div
        onClick={(e) => moveCursorByClick(e)}
        className="w-8 h-96 bg-blue-500 relative"
      >
        <div className="w-8 h-8 absolute cursor-position-top left-2 z-10 border-[16px] border-transparent border-r-[16px] border-r-red-600"></div>
      </div>
    </>
  );
};

export default Bar;
