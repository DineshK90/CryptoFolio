import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";

export default function RegisterPage() {
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save display name in Firebase Auth profile
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      navigate("/app");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <AuthForm
        title="Create your CryptoFolio account"
        submitLabel="Create Account"
        onSubmit={handleRegister}
        showNameField={true}
        footerText="Already have an account?"
        footerLinkText="Log in"
        footerLinkHref="/login"
      />
    </div>
  );
}
