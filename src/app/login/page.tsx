import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#111111] px-[18px] py-10 text-[#161616]">
      <div className="w-full max-w-[430px] rounded-lg border border-white/10 bg-[#f4f4f2] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-9">
        <div className="mb-10 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center bg-[#f36b21] text-[12px] font-extrabold tracking-[0.04em] text-[#111111]">
            SDP
          </div>

          <div>
            <strong className="block text-[14px] leading-none">
              SDP MACHINES
            </strong>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#858585]">
              Administration
            </p>
          </div>
        </div>

        <h1 className="m-0 text-[38px] font-semibold leading-none tracking-[-0.045em]">
          Sign in
        </h1>

        <p className="mb-7 mt-3 text-[13px] leading-[1.6] text-[#737373]">
          Access the SDP Machines content management system.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
