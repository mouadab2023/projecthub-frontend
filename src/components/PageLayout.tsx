import type {ReactNode} from "react";

const PageLayout = ({ children }:{children:ReactNode}) => {
    return (
        <div className="max-w-5xl mx-auto px-8 py-10">
            {children}
        </div>
    );
};

export default PageLayout;