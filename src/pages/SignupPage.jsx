import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const { signupUser, loading, error, user } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (!emailRegex.test(email)) return "Invalid email format";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!passwordRegex.test(password))
      return "Password must contain number and special character";
    if (password !== repeatPassword) return "Passwords do not match";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) return setLocalError(validationError);

    setLocalError("");
    await signupUser(email, password);
  };

  useEffect(() => {
    if (user) navigate("/profile");
  }, [user, navigate]);

  return (
    <div className="signup">
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>

      {(localError || error) && (
        <p className="error">{localError || error}</p>
      )}
    </div>
  );
}

export default SignupPage;
