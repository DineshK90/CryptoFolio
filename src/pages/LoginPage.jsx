import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
          title="Log in to CryptoFolio"
          submitLabel="Log In"
          onSubmit={handleLogin}
          footerText="Don't have an account?"
          footerLinkText="Sign up"
          footerLinkHref="/register"
        />
      </motion.div>
    </div>
  );
}
