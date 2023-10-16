import React from "react";
import {Link} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function NavBar(props) {
    const currentUser = props.currentUser;
    const handleSignOut = (event) => {
        signOut(getAuth());
    }

    return (
        <nav className="nav justify-content-center">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link className="nav-link nav-brand" to="/">Eng-Chi</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dictionary">Home-Dictionary</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/compare">Comparison</Link>
                </li>
                {!currentUser.userId &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin">Sign in</Link>
                    </li>
                }
                {currentUser.userId &&
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/quiz">Quiz</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/history/mix">History</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-secondary" onClick={handleSignOut}>Sign Out</button>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
}