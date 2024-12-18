import React, { useContext, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { createUser, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !photoURL) {
            setError("Please provide both your name and photo URL.");
            return;
        }

        try {
            await createUser(email, password, name, photoURL);
            alert("Registration successful!");
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleRegister = async () => {
        setError("");
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register Now!</h1>
                    <p className="py-6">
                        Create an account to get started. Join us today and enjoy access to exclusive features, personalized content, and seamless user experience.
                    </p>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleRegister} className="card-body">
                        {error && (
                            <p className="text-red-500 text-sm text-center mb-4">
                                {error}
                            </p>
                        )}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input input-bordered"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="url"
                                placeholder="Photo URL"
                                className="input input-bordered"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>

                        <div className="divider">OR</div>

                        <div className="form-control">
                            <button
                                type="button"
                                className="btn btn-outline btn-secondary"
                                onClick={handleGoogleRegister}
                            >
                                Register with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
