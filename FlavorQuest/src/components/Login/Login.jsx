import React, { useContext, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import { useNavigate, Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
    const { loginWithEmail, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await loginWithEmail(email, password);
            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome!",
                timer: 2000,
                showConfirmButton: false,
            });
            navigate("/");
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: err.message || "Please try again.",
                showConfirmButton: true,
            });
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            await loginWithGoogle();
            Swal.fire({
                icon: "success",
                title: "Logged in with Google!",
                text: "Welcome!",
                timer: 2000,
                showConfirmButton: false,
            });
            navigate("/");
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Google Login Failed",
                text: err.message || "Please try again.",
                showConfirmButton: true,
            });
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            Swal.fire({
                icon: "warning",
                title: "Email Required",
                text: "Please enter your email to reset your password.",
                showConfirmButton: true,
            });
            return;
        }
        try {
            await sendPasswordResetEmail(email);
            Swal.fire({
                icon: "success",
                title: "Password Reset Email Sent",
                text: "Check your inbox for further instructions.",
                showConfirmButton: true,
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "An error occurred while resetting the password.",
                showConfirmButton: true,
            });
            setError(err.message || "An error occurred while resetting the password.");
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Access your account to manage your profile, view personalized content,
                        and stay updated. If you don't have an account, sign up today to unlock all features!{" "}
                        <Link to="/register" className="link link-primary">
                            Register
                        </Link>
                    </p>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleLogin}>
                        {error && (
                            <p className="text-red-500 text-sm text-center mb-4">
                                {error}
                            </p>
                        )}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"} // Toggles input type
                                placeholder="password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="absolute right-3 top-10 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <AiFillEyeInvisible size={20} />
                                ) : (
                                    <AiFillEye size={20} />
                                )}
                            </span>
                            <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>

                        <div className="divider">OR</div>

                        <div className="form-control">
                            <button
                                type="button"
                                className="btn btn-outline btn-secondary"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                            >
                                Login with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
