import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="site-logo site-logo-brand"
      aria-label="SDP Machines home"
    >
      <span className="site-logo-icon">
        <Image
          src="/images/brand/sdp-logo-original.png"
          alt="SDP"
          width={60}
          height={52}
          priority
        />
      </span>

      <span className="site-logo-wordmark">
        <strong>SDP MACHINES</strong>

        <small>
          Stone Processing Machines
        </small>
      </span>
    </Link>
  );
}