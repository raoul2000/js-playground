
import Link from "next/link";
import { options } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function NavBar() {
    const session = await getServerSession(options);
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {session ? (
                    <li>
                        <Link href="/api/auth/signout?callbackUrl=/">
                            Sign Out ({session.user?.name})
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link href="/api/auth/signin">Sign In</Link>
                    </li>
                )}
                <li>
                    <Link href="/dashboard">Dashboard</Link>
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
}
