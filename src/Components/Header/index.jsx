import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
            <h1>to do list</h1>
            <Link to="/Settings" className="link">
                Settings
            </Link>
        </div>
    );
}

export default Header;