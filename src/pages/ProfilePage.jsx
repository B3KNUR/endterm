import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  uploadProfilePicture,
  updateProfileData,
} from "../store/profileSlice";
import { useAuth } from "../hooks/useAuth";
import "../styles/profile.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const { logoutUser } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.loading);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (profile?.displayName) 
      setDisplayName(profile.displayName);
  }, [profile]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleUpload = () => {
    if (!file || !user) return;
    dispatch(uploadProfilePicture({ file, uid: user.uid }));
    setFile(null);
  };

  const handleSaveName = () => {
    if (!user) return;
    dispatch(updateProfileData({ uid: user.uid, data: { displayName } }));
  };

  if (!user) return <p>You must be logged in to see this page.</p>;

  return (
    <div className="profile">
      <h1>Profile</h1>

      <button onClick={logoutUser} disabled={loading}>
        Log out
      </button>

      <p><strong>Email:</strong> {user.email}</p>

      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Enter your name"
      />

      <button onClick={handleSaveName} disabled={loading}>
        Save
      </button>

      <hr />

      <h3>Profile picture</h3>

      {profile?.photoURL && (
        <img src={profile.photoURL} className="avatar" alt="Avatar" />
      )}

      {preview && (
        <img src={preview} className="avatar" alt="Preview" />
      )}

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload} disabled={loading || !file}>
        Upload
      </button>

      {loading && <p>Uploading...</p>}
    </div>
  );
}

export default ProfilePage;
