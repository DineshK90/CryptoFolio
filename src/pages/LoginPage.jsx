import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";

export default function LoginPage() {
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/app");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <AuthForm
        title="Log in to CryptoFolio"
        submitLabel="Log In"
        onSubmit={handleLogin}
        footerText="Don't have an account?"
        footerLinkText="Sign up"
        footerLinkHref="/register"
      />
    </div>
  );
}
