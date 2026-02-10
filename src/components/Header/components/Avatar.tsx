import React, { useEffect, useState } from "react";
type Props = {
    avatarUrl: string | undefined;
    userName: string | undefined;
}
const Avatar = ({ avatarUrl, userName }:Props) => {
    const [loaded, setLoaded] = useState(false);
    const src = avatarUrl || null;

    useEffect(() => {
        if (src) {
            const img = new Image();
            img.src = src;
        }
    }, [src]);

    const fallbackLetter = userName ? userName.charAt(0).toUpperCase() : "U";

    return (
        <div className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">

            {(!src || !loaded) && (
                <div
                    className={`
            absolute inset-0 rounded-full
            bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500
            flex items-center justify-center text-white font-semibold
            transition-opacity duration-300
            ${loaded ? "opacity-0" : "opacity-100 animate-pulse"}
          `}
                >
                    {fallbackLetter}
                </div>
            )}

            {src && (
                <img
                    src={src}
                    alt="Profil"
                    className={`
            w-full h-full object-cover rounded-full
            transition-opacity duration-500
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
                    onLoad={() => setLoaded(true)}
                    onError={() => setLoaded(false)}
                />
            )}
        </div>
    );
};

export default Avatar;
