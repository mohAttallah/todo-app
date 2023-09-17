import { Link } from "react-router-dom";
import "./header.scss"
import Login from "../../Login";
function Header() {
    return (
        <nav>
            <h1>Todo list</h1>
            <div>
                <Link to="/" className="link">
                    Home
                </Link>
                <Link to="/Settings" className="link">
                    Settings
                </Link>
                <Link to="/Signup" className="link">
                    Signup
                </Link>
                <Login />
            </div>

        </nav>
    );
}

export default Header;