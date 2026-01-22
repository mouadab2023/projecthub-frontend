import React from "react";
import Form from "./Form";
import Input from "./Input";
const Register = () => (
    <Form
        introduction="Join projectHub  🚀"
        title="Create your account to start managing your projects"
        submitLabel="Sign up"
        onSubmit={null}

    >
        <Input
            type="text"
            name="First Name"
            placeholder="Alex"
            onChange={null}
        />
        <Input
            type="text"
            name="Last Name"
            placeholder="Dupont"
            onChange={null}
        />
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
        <Input
            type="password"
            name="Confirm your password"
            placeholder="••••••••"
            onChange={null}
        />

    </Form>

)
export default Register;