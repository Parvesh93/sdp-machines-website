import { signOut } from "../../../auth";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut({
          redirectTo: "/login",
        });
      }}
    >
      <button
        type="submit"
        className="h-[38px] w-full cursor-pointer border border-white/10 bg-transparent text-[#bdbdbd] transition-colors hover:border-white/25 hover:text-white"
      >
        Sign out
      </button>
    </form>
  );
}
