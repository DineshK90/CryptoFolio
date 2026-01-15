import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export async function uploadProfilePicture(userId, file) {
  const fileRef = ref(
    storage,
    `profile-pictures/${userId}/avatar`
  );

  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}
