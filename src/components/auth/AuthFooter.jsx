import React from "react";
import {Link} from "react-router-dom";

const AuthFooter = ({footerText, footerLinkLabel, footerLinkTo}) => {
    return (

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            {footerText}{" "}
            <span className="text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer">
                        <Link to={footerLinkTo}>
                            {footerLinkLabel}
                        </Link>
                    </span>
        </p>
    );
};

export default AuthFooter;
