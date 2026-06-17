export function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Abstract Background Blobs */}
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-[#ebd3ce] rounded-bl-full opacity-60" />
      <div className="absolute top-[30%] left-0 w-[15vw] h-[30vw] min-w-[150px] min-h-[300px] bg-[#ebd3ce] rounded-r-full opacity-60 -translate-x-1/2" />
      <div className="absolute bottom-0 left-[10%] w-[25vw] h-[20vw] min-w-[200px] min-h-[150px] bg-[#ebd3ce] rounded-t-full opacity-60" />
      <div className="absolute bottom-[20%] right-0 w-[10vw] h-[25vw] min-w-[100px] min-h-[200px] bg-[#ebd3ce] rounded-l-full opacity-60" />
    </div>
  );
}
