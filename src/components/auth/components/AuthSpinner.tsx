import React, { useState, useEffect } from "react";
import Spinner from "../../ui/Spinner";
type Props = {
    loading: boolean;
}
const AuthSpinner = ({ loading }:Props) => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
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
