export default function Frame1() {
  return (
    <div className="bg-[#5b6470] relative rounded-[18px] size-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex font-['Joan:Regular',_sans-serif] gap-2.5 items-center justify-center leading-[0] not-italic px-[215px] py-[27px] relative size-full text-[32px] text-nowrap text-white">
          <div className="relative shrink-0">
            <p className="leading-[normal] text-nowrap whitespace-pre">Hi</p>
          </div>
          <div className="relative shrink-0">
            <p className="leading-[normal] text-nowrap whitespace-pre">Fred</p>
          </div>
          <div className="relative shrink-0">
            <p className="leading-[normal] text-nowrap whitespace-pre">{`.... `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}