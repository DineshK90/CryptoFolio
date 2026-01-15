import { useState } from "react";
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
    console.error(err);
    alert("Failed to upload image");
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
      console.error(err);
      alert("Failed to generate avatar");
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
      console.error(err);
      alert("Failed to update name");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-6">
        Profile
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <img
            src={preview || "/avatar-placeholder.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full border border-slate-700 object-cover"
          />

          <div className="space-y-2">
            <label className="block">
              <span className="sr-only">Upload avatar</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={loading}
                className="block text-sm text-slate-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:bg-slate-800 file:text-slate-300
                  hover:file:bg-slate-700"
              />
            </label>

            <button
              onClick={handleRandomAvatar}
              disabled={loading}
              className="text-sm text-indigo-400 hover:text-indigo-300 transition"
            >
              Generate random avatar
            </button>
          </div>
        </div>

        {/* Name */}
        <div>
          <p className="text-slate-400 text-sm mb-1">Name</p>

          {editingName ? (
            <div className="flex gap-2">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                disabled={loading}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              />

              <button
                onClick={handleSaveName}
                disabled={loading}
                className="bg-indigo-500 hover:bg-indigo-400 px-3 rounded-md text-sm"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setEditingName(false);
                  setNameInput(user.displayName || "");
                }}
                disabled={loading}
                className="text-slate-400 hover:text-white text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <p>{user?.displayName}</p>
              <button
                onClick={() => setEditingName(true)}
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <p className="text-slate-400 text-sm">Email</p>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
