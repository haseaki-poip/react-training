const Gallery = () => {
  return (
    <div className="h-[60vh] overflow-hidden my-10 relative">
      <div className="bg-black columns-2 md:columns-3 px-5 py-10">
        <div className="w-full break-inside-avoid bg-white mb-2 h-36"></div>
        <div className="w-full break-inside-avoid bg-red-400 mb-2 h-28"></div>
        <div className="w-full break-inside-avoid bg-blue-500 mb-2 h-40"></div>
        <div className="w-full break-inside-avoid bg-green-400 mb-2 h-32"></div>
        <div className="w-full break-inside-avoid bg-yellow-400 mb-2 h-36"></div>
        <div className="w-full break-inside-avoid bg-green-500 mb-2 h-44"></div>
        <div className="w-full break-inside-avoid bg-gray-500 mb-2 h-28"></div>
        <div className="w-full break-inside-avoid bg-red-500 mb-2 h-32"></div>
        <div className="w-full break-inside-avoid bg-yellow-400 mb-2 h-24"></div>
        <div className="w-full break-inside-avoid bg-blue-400 mb-2 h-56"></div>
        <div className="w-full break-inside-avoid bg-gray-400 mb-2 h-48"></div>
        <div className="w-full break-inside-avoid bg-white mb-2 h-32"></div>
      </div>
      <div className="w-full h-24 opacity-90 bg-gradient-to-b from-transparent to-black absolute left-0 bottom-0 z-10"></div>
    </div>
  );
};

export default Gallery;
