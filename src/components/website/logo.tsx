import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-[13px] text-[#f2f0ea] max-[700px]:gap-2.5"
      aria-label="SDP Machines home"
    >
      <span className="flex h-[54px] w-[60px] shrink-0 items-center justify-center overflow-visible bg-transparent max-[700px]:h-[45px] max-[700px]:w-[50px]">
        <Image
          src="/images/brand/sdp-logo-original.png"
          alt="SDP"
          width={60}
          height={52}
          priority
          className="block h-[54px] w-[60px] object-contain max-[700px]:h-[45px] max-[700px]:w-[50px]"
        />
      </span>

      <span className="flex flex-col gap-1">
        <strong className="whitespace-nowrap text-[14px] font-bold leading-none tracking-[-0.015em] max-[700px]:text-[12px]">
          SDP MACHINES
        </strong>

        <small className="whitespace-nowrap text-[7px] font-semibold uppercase leading-[1.2] tracking-[0.13em] text-[#777a75] max-[700px]:hidden">
          Stone Processing Machines
        </small>
      </span>
    </Link>
  );
}
