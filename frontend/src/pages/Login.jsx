import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authApi";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {

            setLoading(true);

            const data = await loginUser({
                email,
                password
            });

          localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                setSuccess("Login successful!");

                window.location.href = "/";

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Welcome Back</h1>

                <p className="auth-subtitle">
                    Login to manage your tasks
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
                                    className="input-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="10"
                                        rx="2"
                                        fill="#454da4"
                                    />

                                    <path
                                        d="M8 10V7a4 4 0 0 1 8 0v3"
                                       stroke="#454da4"
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
                            ? "Logging in..."
                            : "Login"
                        }
                    </button>

                </form>


                 <p className="auth-switch">
                    Don't have an account?
                    {" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;