'use client'
// Remember you must use and AuthProvider for client components to useSession

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import UserCard from "../components/UserCard";

export default function ClientPage() {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/client");
        }
    });

    if (!session?.user) return

    return (
        <section className="flex flex-col gap-12">
            <UserCard user={session?.user} pagetype={"Client"}/>
            <p className="text-2xl text-center">Congrats! If you can see this page, it means you are logged in
                with either &apos;<b>Premium</b>&apos; or &apos;<b>Admin</b>&apos; access.
            </p>
        </section>
    )
}
