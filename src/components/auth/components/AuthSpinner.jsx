import React, { useState, useEffect } from "react";
import Spinner from "../../ui/Spinner";
const AuthSpinner = ({ loading }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => setShow(true), 100);
        } else {
            setShow(false);
        }
        return () => clearTimeout(timer);
    }, [loading]);

    return show ? <Spinner /> : null;
};

export default AuthSpinner;
