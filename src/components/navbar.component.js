import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    IMDB
                </Link>
                <Link className="navbar-brand" to="/movies">
                    Movies
                </Link>
                <Link className="navbar-brand" to="/create-movies">
                    Create Movies
                </Link>
                <Link className="navbar-brand" to="/login">
                    Login
                </Link>
                <Link className="navbar-brand" to="/sign-up">
                    Sign-Up
                </Link>
            </nav>
        </>
    );
};

export default Navbar;
