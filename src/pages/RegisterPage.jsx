import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-slate-950">
      {/* Fintech background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl -z-10" />
      <div className="absolute inset-0 opacity-5 -z-10" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(99, 102, 241, 0.1) 25%, rgba(99, 102, 241, 0.1) 26%, transparent 27%, transparent 74%, rgba(99, 102, 241, 0.1) 75%, rgba(99, 102, 241, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(99, 102, 241, 0.1) 25%, rgba(99, 102, 241, 0.1) 26%, transparent 27%, transparent 74%, rgba(99, 102, 241, 0.1) 75%, rgba(99, 102, 241, 0.1) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AuthForm
          title="Create your CryptoFolio account"
          submitLabel="Create Account"
          onSubmit={handleRegister}
          showNameField={true}
          footerText="Already have an account?"
          footerLinkText="Log in"
          footerLinkHref="/login"
        />
      </motion.div>
    </div>
  );
}
