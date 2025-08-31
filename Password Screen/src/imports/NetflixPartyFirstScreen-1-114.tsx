import svgPaths from "./svg-abiszimvds";

function Frame1() {
  return (
    <div className="basis-0 bg-[#5b6470] grow h-full min-h-px min-w-px relative rounded-[18px] shrink-0">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex font-['Joan:Regular',_sans-serif] gap-2.5 items-center justify-center leading-[0] not-italic px-[205px] py-[212px] relative size-full text-[32px] text-nowrap text-white">
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

function User() {
  return (
    <div className="absolute content-stretch flex gap-2.5 h-[90px] items-center justify-start left-[616px] top-[379px] w-[611px]" data-name="User">
      <Frame1 />
    </div>
  );
}

function VuesaxBulkLogout() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/bulk/logout">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="logout">
          <path d={svgPaths.pf7f1700} fill="var(--fill-0, #292D32)" id="Vector" opacity="0.4" />
          <path d={svgPaths.pc716200} fill="var(--fill-0, #292D32)" id="Vector_2" />
          <g id="Vector_3" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function BackButton() {
  return (
    <div className="absolute left-[576px] opacity-[0.52] size-6 top-[412px]" data-name="Back Button">
      <VuesaxBulkLogout />
    </div>
  );
}

function LoginButton() {
  return (
    <div className="relative shrink-0 size-6" data-name="Login Button">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Login Button">
          <path d={svgPaths.p24fa2780} fill="var(--fill-0, black)" id="Vector" opacity="0.5" />
          <path clipRule="evenodd" d={svgPaths.p313d8a70} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function PasswordSubmitBox() {
  return (
    <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0 w-[312px]" data-name="Password submit box">
      <div className="basis-0 font-['Jura:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[24px] text-black">
        <p className="leading-[normal]">Password placeholder</p>
      </div>
      <LoginButton />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-9 items-center justify-start left-[481px] px-[100px] py-3 top-[553px] w-[881px]">
      <div className="font-['Jura:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[24px] text-black text-nowrap">
        <p className="leading-[normal] whitespace-pre">Password:</p>
      </div>
      <PasswordSubmitBox />
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
      <BackButton />
      <Frame2 />
    </div>
  );
}