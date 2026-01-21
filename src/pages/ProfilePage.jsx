import { useState } from "react";
import { motion } from "framer-motion";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import { uploadProfilePicture } from "../services/storage";
import { generateRandomAvatar } from "../utils/avatar";
import { resizeImage } from "../utils/image";

export default function ProfilePage() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(user?.photoURL);

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.displayName || "");

  async function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  setLoading(true);

  try {
    const processedImage = await resizeImage(file, 256);

    const url = await uploadProfilePicture(user.uid, processedImage);

    await updateProfile(user, {
      photoURL: url,
    });

    await user.reload();
    setPreview(url);
  } catch (err) {
    console.error("Upload error:", err);
    alert("Failed to upload image. Please try again.");
  } finally {
    setLoading(false);
  }
}


  async function handleRandomAvatar() {
    setLoading(true);

    try {
      const avatarUrl = generateRandomAvatar(user.uid);

      await updateProfile(user, {
        photoURL: avatarUrl,
      });

      await user.reload();
      setPreview(avatarUrl);
    } catch (err) {
      console.error("Avatar generation error:", err);
      alert("Failed to generate avatar. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveName() {
    if (!nameInput.trim()) {
      alert("Name cannot be empty");
      return;
    }

    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: nameInput.trim(),
      });

      await user.reload();
      setEditingName(false);
    } catch (err) {
      console.error("Name update error:", err);
      alert("Failed to update name. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="max-w-lg relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      <motion.h1 
        variants={itemVariants}
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
      >
        Profile
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="relative bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 space-y-8 shadow-xl overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-indigo-500/30 rounded-tr-2xl" />

        {/* Avatar */}
        <motion.div variants={itemVariants} className="flex items-center gap-6 relative z-10">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={preview || "/avatar-placeholder.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-indigo-500/50 object-cover shadow-lg"
          />

          <div className="space-y-3">
            <motion.label className="block">
              <span className="sr-only">Upload avatar</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={loading}
                className="block text-sm text-slate-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:bg-indigo-600 file:text-slate-100 file:font-medium
                  hover:file:bg-indigo-500 file:transition-colors"
              />
            </motion.label>

            <motion.button
              whileHover={{ x: 4 }}
              onClick={handleRandomAvatar}
              disabled={loading}
              className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition"
            >
              ✨ Generate random avatar
            </motion.button>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants} className="relative z-10">
          <p className="text-slate-300 text-sm font-medium mb-3">Name</p>

          {editingName ? (
            <div className="flex gap-2">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                disabled={loading}
                className="flex-1 bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveName}
                disabled={loading}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 px-4 rounded-lg text-sm font-medium transition"
              >
                Save
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingName(false);
                  setNameInput(user.displayName || "");
                }}
                disabled={loading}
                className="text-slate-400 hover:text-slate-300 text-sm font-medium transition"
              >
                Cancel
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-slate-100 font-medium">{user?.displayName}</p>
              <motion.button
                whileHover={{ x: 2 }}
                onClick={() => setEditingName(true)}
                className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition"
              >
                ✏️ Edit
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants} className="relative z-10">
          <p className="text-slate-300 text-sm font-medium mb-2">Email Address</p>
          <p className="text-slate-100 font-medium">{user?.email}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
