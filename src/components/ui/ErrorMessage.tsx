import React from "react";
export type Props = {
    errorMessage: string | undefined;
}
const ErrorMessage = ({errorMessage}:Props) => {
       return(
           errorMessage ?
        <p className="text-sm text-red-500 mt-1">
            {errorMessage}
        </p>:<></>
       )
}
export default ErrorMessage;