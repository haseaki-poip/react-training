const Header = () => {
  return (
    <div className="fixed left-0 top-0 z-50 w-full h-20 bg-[#161616]">
      <div className="w-full h-full flex">
        <div className="w-14 h-14 my-auto mx-auto">
          <img className="w-full h-full" src="/logo192.png" id="logo" alt="" />
        </div>
        <div className="absolute left-8 top-1/2 z-50 -translate-y-1/2 text-white">
          <div className="w-10 h-14 relative">
            <i className="bg-white w-full h-0.5 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
            <i className="bg-white w-full h-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
            <i className="bg-white w-full h-0.5 absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
