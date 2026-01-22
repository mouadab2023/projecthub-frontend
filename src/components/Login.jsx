import React from "react";
import Input from "./Input";
import Form from "./Form";
import {Link} from "react-router-dom";
import AuthFooter from "./AuthFooter";

const Login = () => {
    return (

            <Form
                introduction="Welcome Back 👋"
                title="Sign in to continue to ProjectHub"
                submitLabel="Sign in"
                onSubmit={null}
                footer={
                    <AuthFooter
                        footerText="Don’t have an account?"
                        footerLinkLabel="Sign up"
                        footerLinkTo="/register"
                    />
                }
            >
                <Input
                    type="email"
                    name="Email"
                    placeholder="you@example.com"
                    onChange={null}
                />

                <Input
                    type="password"
                    name="Password"
                    placeholder="••••••••"
                    onChange={null}
                />

                <div className="flex justify-end text-sm">
                    <Link
                        to="/wdp"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>
            </Form>

    );
};

export default Login;
