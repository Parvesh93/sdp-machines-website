import Link from "next/link";

type AdminTopbarProps = {
  userName?: string | null;
};

export function AdminTopbar({
  userName,
}: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#ddddda] bg-[rgba(244,244,242,0.92)] px-[18px] backdrop-blur-[12px] md:px-8">
      <div className="flex items-center gap-3.5">
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#737373]">
          SDP Machines Administration
        </span>

        {userName ? (
          <span className="border-l border-[#d3d3ce] pl-3.5 text-[12px] text-[#787878] max-[640px]:hidden">
            {userName}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center border border-[#d3d3ce] px-3.5 text-[13px] font-semibold text-[#202020] transition-colors hover:bg-white"
        >
          View website
        </Link>
      </div>
    </header>
  );
}
