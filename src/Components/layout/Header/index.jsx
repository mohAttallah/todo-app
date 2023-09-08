import { Link } from "react-router-dom";
import "./header.scss"
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
            </div>

        </nav>
    );
}

export default Header;