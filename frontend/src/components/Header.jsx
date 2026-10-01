import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="header-content">

                <h1>Task Management System</h1>

                <p>Manage your tasks efficiently</p>

                <nav className="header-nav">
                    <Link to="/tasks/new">Add Task</Link>
                    <Link to="/tasks">My Tasks</Link>
                </nav>

            </div>
        </header>
    );
}

export default Header;