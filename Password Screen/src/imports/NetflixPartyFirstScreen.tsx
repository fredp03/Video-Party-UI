function Frame1() {
  return (
    <div className="absolute bg-[#5e705b] box-border content-stretch flex flex-col gap-2.5 h-[488px] items-center justify-center left-0 px-[205px] py-[212px] rounded-[18px] top-0 w-[471px]">
      <div className="font-['Joan:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e3e3e3] text-[32px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Avalene</p>
      </div>
    </div>
  );
}

function User() {
  return (
    <div className="absolute h-[488px] left-[1057px] rounded-[18px] shadow-[-2px_2px_4px_0px_rgba(98,98,98,0.2),2px_-2px_4px_0px_rgba(98,98,98,0.2),-2px_-2px_4px_0px_rgba(255,255,255,0.9),2px_2px_5px_0px_rgba(98,98,98,0.9)] top-[314px] w-[471px]" data-name="User">
      <Frame1 />
      <div className="absolute inset-0 pointer-events-none shadow-[1px_1px_2px_0px_inset_rgba(255,255,255,0.3),-1px_-1px_2px_0px_inset_rgba(98,98,98,0.5)]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[#5b6470] box-border content-stretch flex flex-col gap-2.5 h-[488px] items-center justify-center left-0 px-[205px] py-[212px] rounded-[18px] top-0 w-[471px]">
      <div className="font-['Joan:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e3e3e3] text-[32px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Fred</p>
      </div>
    </div>
  );
}

function User1() {
  return (
    <div className="absolute h-[488px] left-[289px] rounded-[18px] shadow-[-2px_2px_4px_0px_rgba(98,98,98,0.2),2px_-2px_4px_0px_rgba(98,98,98,0.2),-2px_-2px_4px_0px_rgba(255,255,255,0.9),2px_2px_5px_0px_rgba(98,98,98,0.9)] top-[314px] w-[471px]" data-name="User">
      <Frame2 />
      <div className="absolute inset-0 pointer-events-none shadow-[1px_1px_2px_0px_inset_rgba(255,255,255,0.3),-1px_-1px_2px_0px_inset_rgba(98,98,98,0.5)]" />
    </div>
  );
}

export default function NetflixPartyFirstScreen() {
  return (
    <div className="bg-white relative size-full" data-name="Netflix Party First Screen">
      <div className="absolute font-['Jacques_Francois:Regular',_sans-serif] leading-[0] left-[745px] not-italic text-[40px] text-black text-nowrap top-[120px]">
        <p className="leading-[normal] whitespace-pre">Who’s Watching....</p>
      </div>
      <User />
      <User1 />
    </div>
  );
}