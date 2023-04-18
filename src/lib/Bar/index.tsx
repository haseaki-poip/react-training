import { ChangeEvent, useState } from "react";

const Bar = () => {
  const halfSizeCursor = 16;
  const maxInputNum = 384; // barの長さpx

  const [absolutePositionY, setAbsolutePositionY] = useState({
    pre: -halfSizeCursor,
    now: -halfSizeCursor,
  });
  const [inputNmber, setInputNumber] = useState(
    absolutePositionY.now + halfSizeCursor
  );

  const moveCursorByClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.getBoundingClientRect());
    const barPositionY = e.currentTarget.getBoundingClientRect().y;
    const clickPositionOnPageY = e.pageY;
    const clickPositionOnBarY = clickPositionOnPageY - barPositionY;
    const now = clickPositionOnBarY - halfSizeCursor;
    setAbsolutePositionY({
      pre: absolutePositionY.now,
      now: now,
    });

    setInputNumber(now + halfSizeCursor);
  };

  const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    if (number > maxInputNum) {
      setInputNumber(maxInputNum);
      const now = maxInputNum - halfSizeCursor;
      setAbsolutePositionY({
        pre: absolutePositionY.now,
        now: now,
      });
      return;
    }
    if (number < 0) {
      setInputNumber(0);
      const now = -halfSizeCursor;
      setAbsolutePositionY({
        pre: absolutePositionY.now,
        now: now,
      });
      return;
    }

    setInputNumber(number);
    const now = number - halfSizeCursor;
    setAbsolutePositionY({
      pre: absolutePositionY.now,
      now: now,
    });
    return;
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
      <div className="mt-5">
        <input
          value={inputNmber}
          onChange={(e) => onEdit(e)}
          type="number"
          className="w-56 h-32 border-2 border-black text-center text-6xl"
        />
      </div>
    </>
  );
};

export default Bar;
