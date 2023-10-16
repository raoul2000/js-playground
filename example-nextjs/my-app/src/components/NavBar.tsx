
import Link from "next/link";
import { options } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

const items: MenuItem[] = [
    {
        label: "File",
        icon: "pi pi-fw pi-file",
        items: [
            {
                label: "New",
                icon: "pi pi-fw pi-plus",
                items: [
                    {
                        label: "Bookmark",
                        icon: "pi pi-fw pi-bookmark",
                    },
                    {
                        label: "Video",
                        icon: "pi pi-fw pi-video",
                    },
                ],
            },
            {
                label: "Delete",
                icon: "pi pi-fw pi-trash",
            },
            {
                separator: true,
            },
            {
                label: "Export",
                icon: "pi pi-fw pi-external-link",
            },
        ],
    },
    {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        items: [
            {
                label: "Left",
                icon: "pi pi-fw pi-align-left",
            },
            {
                label: "Right",
                icon: "pi pi-fw pi-align-right",
            },
            {
                label: "Center",
                icon: "pi pi-fw pi-align-center",
            },
            {
                label: "Justify",
                icon: "pi pi-fw pi-align-justify",
            },
        ],
    },
    {
        label: "Users",
        icon: "pi pi-fw pi-user",
        items: [
            {
                label: "New",
                icon: "pi pi-fw pi-user-plus",
            },
            {
                label: "Delete",
                icon: "pi pi-fw pi-user-minus",
            },
            {
                label: "Search",
                icon: "pi pi-fw pi-users",
                items: [
                    {
                        label: "Filter",
                        icon: "pi pi-fw pi-filter",
                        items: [
                            {
                                label: "Print",
                                icon: "pi pi-fw pi-print",
                            },
                        ],
                    },
                    {
                        icon: "pi pi-fw pi-bars",
                        label: "List",
                    },
                ],
            },
        ],
    },
    {
        label: "Events",
        icon: "pi pi-fw pi-calendar",
        items: [
            {
                label: "Edit",
                icon: "pi pi-fw pi-pencil",
                items: [
                    {
                        label: "Save",
                        icon: "pi pi-fw pi-calendar-plus",
                    },
                    {
                        label: "Delete",
                        icon: "pi pi-fw pi-calendar-minus",
                    },
                ],
            },
            {
                label: "Archive",
                icon: "pi pi-fw pi-calendar-times",
                items: [
                    {
                        label: "Remove",
                        icon: "pi pi-fw pi-calendar-minus",
                    },
                ],
            },
        ],
    },
    {
        label: "Quit",
        icon: "pi pi-fw pi-power-off",
    },
];

export default async function NavBar() {
    const session = await getServerSession(options);
    return (
        <div>
            <Menubar model={items} />
        </div>
    );
/*
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
    );*/
}
