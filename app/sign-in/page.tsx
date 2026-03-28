import Authentication from "@/app/components/authentication/Authentication";

async function handleLogin(email: string, password: string) {
  "use server";

  console.log("Login attempt:", email, password);
}

export default function SignInPage() {
  return (
    <div>
      <Authentication onSignIn={handleLogin} />
    </div>
  );
}
