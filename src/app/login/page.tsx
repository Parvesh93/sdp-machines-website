import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <div>
          <strong>
            SDP MACHINES
          </strong>

          <p>
            Administration
          </p>
        </div>

        <h1>
          Sign in
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}