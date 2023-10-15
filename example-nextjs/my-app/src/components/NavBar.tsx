import React from "react";
import Link from "next/link";

type Props = {
    title?: string;
};

export const NavBar: React.FC<Props> = ({ title }): React.JSX.Element => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/api/auth/signin">Sign In</Link>
                </li>
                <li>
                    <Link href="/api/auth/signout">Sign Out</Link>
                </li>
                <li>
                    <Link href="/server">Server</Link>
                </li>
                <li>
                    <Link href="/client">Client</Link>
                </li>
                <li>
                    <Link href="/doc">Documentation</Link>
                </li>
                <li>
                    <Link href="/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    );
};
