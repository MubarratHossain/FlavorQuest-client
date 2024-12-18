import React, { useContext, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
    const { loginWithEmail, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await loginWithEmail(email, password);
            alert("Login successful!");
            navigate("/");
        } catch (err) {
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
            alert("Logged in with Google!");
            navigate("/");
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            alert("Please enter your email to reset your password.");
            return;
        }
        try {
            await sendPasswordResetEmail(email);
            alert("Password reset email sent!");
        } catch (err) {
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
                        and stay updated. If you don’t have an account, sign up today to unlock all features!
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

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
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
