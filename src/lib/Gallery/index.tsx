import { useEffect, useMemo, useRef, useState } from "react";

const Gallery = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [galleryMaxHeight, setGalleryMaxHeight] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    setGalleryMaxHeight(ref.current.clientHeight);
  }, [ref.current?.clientHeight]);

  const [isExpand, setIsExpand] = useState(false);
  const galleryHeightClass = useMemo(() => {
    if (isExpand) return "gallery-height-expand-animation";
    return "gallery-height";
  }, [isExpand]);

  return (
    <>
      <style>{`
               .gallery-height-expand-animation {
                    animation-name: expand-animation;
                    animation-fill-mode: forwards;
                    animation-duration: 1s;
                    animation-timing-function: ease;
                }
                @keyframes expand-animation {
                    from {
                        height: 60vh;
                    }
                    to {
                        height: ${galleryMaxHeight}px;
                    }
                }
                .gallery-height { height: 60vh }
            `}</style>
      <div
        className={
          "overflow-hidden mt-10 relative gallery-height " + galleryHeightClass
        }
      >
        <div ref={ref} className="bg-black columns-2 md:columns-3 px-5 py-10">
          <div className="break-inside-avoid bg-white mb-2 h-36"></div>
          <div className="break-inside-avoid bg-red-400 mb-2 h-28"></div>
          <div className="break-inside-avoid bg-blue-500 mb-2 h-40"></div>
          <div className="break-inside-avoid bg-green-400 mb-2 h-32"></div>
          <div className="break-inside-avoid bg-yellow-400 mb-2 h-36"></div>
          <div className="break-inside-avoid bg-green-500 mb-2 h-44"></div>
          <div className="break-inside-avoid bg-gray-500 mb-2 h-28"></div>
          <div className="break-inside-avoid bg-red-500 mb-2 h-32"></div>
          <div className="break-inside-avoid bg-yellow-400 mb-2 h-24"></div>
          <div className="break-inside-avoid bg-blue-400 mb-2 h-56"></div>
          <div className="break-inside-avoid bg-gray-400 mb-2 h-48"></div>
          <div className="break-inside-avoid bg-white mb-2 h-32"></div>
        </div>
        {!isExpand ? (
          <div className="w-full h-24 opacity-90 bg-gradient-to-b from-transparent to-black absolute left-0 bottom-0 z-10">
            <div className="absolute right-0 bottom-0 z-20">
              <button
                onClick={() => setIsExpand(true)}
                className="text-white px-5 py-2"
              >
                more...
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Gallery;