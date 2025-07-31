import upload from "../lib/uploadImage";
import { User } from "lucide-react";
import { useState } from "react";
import "../styles/auth.css";
import { toast } from "sonner";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const Auth = () => {
  const [profileImg, setProfileImg] = useState({
    file: null,
    url: "",
  });

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleProfileImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg({
        file: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // console.log("Email:", email);
    // console.log("Password:", password);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgURL = await upload(profileImg.file);
      // console.log("Image URL:", imgURL);

      await setDoc(doc(database, "users", res.user.uid), {
        uid: res.user.uid,
        username,
        email,
        avatarURL: imgURL,
        blocked: [],
      });

      await setDoc(doc(database, "userchats", res.user.uid), {
        chat: [],
      });
      toast.success("Account created! You can Sign - In Now :)");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="login">
        {isLogin ? (
          // Sign - In Form
          <form onSubmit={handleLogin}>
            <h2>Welcome back</h2>
            <input type="email" name="email" placeholder="Enter your email" />
            <input type="password" name="password" placeholder="******" />
            <input type="checkbox" name="rememberME" id="rememberME" />
            <label htmlFor="rememberME">Remember me</label>
            <span>Forgot password</span>
            <button disabled={loading}>
              {loading ? "Loading" : "Sign in"}
            </button>
            {/* <button>Sign in with Google</button> */}
            <p>
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Sign up
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h2>Create an account</h2>
            <label htmlFor="file">
              {profileImg.url ? (
                <img
                  src={profileImg.url}
                  alt="profile"
                  className="preview-img"
                />
              ) : (
                <User className="default-userIcon" />
              )}
              Upload an Image
            </label>
            <input
              type="file"
              name="avatar"
              id="file"
              style={{ display: "none" }}
              onChange={handleProfileImg}
            />
            <input type="text" name="username" placeholder="Enter your name" />
            <input type="email" name="email" placeholder="Enter your email" />
            <input
              type="password"
              name="password"
              placeholder="Create a password"
            />
            <button disabled={loading}>
              {loading ? "Loading" : "Sign up"}
            </button>

            <p>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Sign in
              </span>
            </p>
          </form>
        )}
      </div>
      {/* <div className="line"></div>
      <div className="image">
        <img src="/authBG.jpg" alt="Auth Page Image" className="auth-image" />
      </div> */}
    </div>
  );
};
export default Auth;
