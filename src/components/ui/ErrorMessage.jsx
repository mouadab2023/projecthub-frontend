import React from "react";

const ErrorMessage = ({errorMessage}) => {
       return(
           errorMessage &&
        <p className="text-sm text-red-500 mt-1">
            {errorMessage}
        </p>
       )
}
export default ErrorMessage;