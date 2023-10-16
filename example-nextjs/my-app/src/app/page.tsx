
import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "@/components/NavBar";
import {Counter} from "@/components/Counter";

export default function Home() {
    return (
        <main>
            <NavBar />
            <Counter label="Value"></Counter>
        </main>
    );
}
