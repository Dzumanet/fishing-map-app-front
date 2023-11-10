import React from "react";
import {Link} from "react-router-dom";

import './NoPage.css'

export const NoPage = () => {

    return (
        <div className="no-page">
            <h1>oops the page doesn't exist</h1>
            <Link to={'/'}>Back to Home Page</Link>
        </div>
    )
};