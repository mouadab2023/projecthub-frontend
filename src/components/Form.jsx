import React from "react";
import Button from "./Button";
const Form =(props)=>{
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">

            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    {props.introduction}
                </h2>

                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                    {props.title}
                </p>

                <form className="space-y-5" onSubmit={props.onSubmit}>
                    {props.children}
                    <Button submitLabel={props.submitLabel} />
                </form>

                {props.footer}

            </div>

        </div>

    )
}
export default Form;