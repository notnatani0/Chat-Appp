import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.warn("Missing Cloudinary credentials");
}

const upload = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUD_NAME);
  formData.append("resource_type", "auto");

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      formData,
      {
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          console.log(`Upload is ${progress}% done`);
        },
      }
    );
    return res.data.secure_url;
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

export default upload;
