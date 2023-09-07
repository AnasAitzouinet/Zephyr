"use client"
const Loader = () => {
  return (
    <div className="bg-[#080808] h-[110vh] w-auto gap-2 flex flex-row justify-center items-center overflow-hidden">
      <img src="/lg.svg"  alt="asmodeus logo" />
      <div className="flex flex-row justify-center items-center gap-1">
      <div className="bg-[#e6e6f7] rounded-full h-4 w-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="bg-[#e6e6f7] rounded-full h-4 w-4 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="bg-[#e6e6f7] rounded-full h-4 w-4 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
};

export default Loader;
