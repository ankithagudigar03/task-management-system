import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (!name || !email || !password) {
            setError("Name, email and password are required");
            return;
        }

        try {

            setLoading(true);

            await registerUser({
                name,
                email,
                password
            });

            setSuccess(
                "Registration successful! You can now login."
            );

            setName("");
            setEmail("");
            setPassword("");
            navigate("/login");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Register to manage your tasks
                </p>


                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}


                {success && (
                    <div className="auth-success">
                        {success}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

               <div className="auth-field">

                    <label>Name</label>

                    <div className="input-with-icon">

                        <span className="input-icon name-icon">👤</span>

                   <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />

                    </div>

</div>

                <div className="auth-field">

                    <label>Email</label>

                    <div className="input-with-icon">

                        <span className="input-icon mail-icon">✉</span>

                      <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />

                    </div>

                </div>


               <div className="auth-field">

                        <label>Password</label>

                        <div className="input-with-icon">

                            <svg
                                className="input-icon lock-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <rect
                                    x="5"
                                    y="10"
                                    width="14"
                                    height="10"
                                    rx="2"
                                    fill="#1E3A5F"
                                />

                                <path
                                    d="M8 10V7a4 4 0 0 1 8 0v3"
                                    stroke="#1E3A5F"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />

                                <circle
                                    cx="12"
                                    cy="15"
                                    r="1"
                                    fill="white"
                                />
                            </svg>
                  <input
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating account..."
                            : "Register"
                        }
                    </button>

                </form>


               <p className="auth-switch">
                    Already have an account?
                    {" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;