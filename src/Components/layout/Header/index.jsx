import { Link } from "react-router-dom";
import "./header.scss"
function Header() {
    return (
        <header>
            <h1>to do list</h1>
            <Link to="/" className="link">
                Home
            </Link>
            <Link to="/Settings" className="link">
                Settings
            </Link>
        </header>
    );
}

export default Header;