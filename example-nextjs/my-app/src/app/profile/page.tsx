import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {

    /*
    // this is another way to protect this page from public access
    const session = await getServerSession(options);

    if (!session) {
        redirect("/api/auth/signin?callbarkUrl=/profile");
    }
    */

    return (
        <main>
            <h1>Profile</h1>
        </main>
    );
}
