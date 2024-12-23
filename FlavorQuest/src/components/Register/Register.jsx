import React, { useContext, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
    const { createUser, loginWithGoogle,isRegistered } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photoURL: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); 
    
        try {
            const { name, email, password, photoURL } = formData;
            if (!name || !email || !password || !photoURL) {
                setError("All fields are required.");
                setLoading(false); 
                return;
            }
    
            
            await createUser(email, password, name, photoURL);
    
            
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, photoURL,password }),
            });
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Registration failed");
            }
    
            
            Swal.fire({
                title: "Success!",
                text: "Account created successfully! Redirecting to the login page.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                
                navigate("/login");
            });
        } catch (err) {
            console.error("Registration error:", err);
            
            Swal.fire({
                title: "Error!",
                text: err.message || "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
            setError(err.message); 
        } finally {
            setLoading(false); 
        }
    };

    const handleGoogleRegister = async () => {
        setError("");
        setLoading(true); 
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (err) {
            setError(err.message);
            
            Swal.fire({
                title: "Error!",
                text: err.message || "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false); 
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
                                value={formData.name}
                                onChange={handleInputChange}
                                name="name"
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
                                value={formData.email}
                                onChange={handleInputChange}
                                name="email"
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
                                value={formData.photoURL}
                                onChange={handleInputChange}
                                name="photoURL"
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
                                value={formData.password}
                                onChange={handleInputChange}
                                name="password"
                                required
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </div>

                        <div className="divider">OR</div>

                        <div className="form-control">
                            <button
                                type="button"
                                className="btn btn-outline btn-secondary"
                                onClick={handleGoogleRegister}
                                disabled={loading}
                            >
                                {loading ? "Registering..." : "Register with Google"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
