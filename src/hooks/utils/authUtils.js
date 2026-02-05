export const emailIsValid = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
export const passwordIsValid = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(password);
}
export const nameIsValid = (name) => {
    const regex = /^[a-zA-Z]{2,}$/;
    return regex.test(name);
}
