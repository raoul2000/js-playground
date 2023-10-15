import Image from "next/image";
import styles from "./page.module.css";
import { NavBar } from "@/components/NavBar";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(options);

    if (!session) {
      redirect('/api/auth/signin?callbarkUrl=')
    }
    return (
        <main className={styles.main}>
            <NavBar />
            {session && <div>Hello {session.user?.name} !!</div>}
        </main>
    );
}
