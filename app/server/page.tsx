import {getServerSession} from "next-auth";
import {options} from "../api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import UserCard from "../components/UserCard";

export default async function ServerPage() {
    const session = await getServerSession(options);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/server");
    }

    return (
        <section className="flex flex-col gap-12">
            <UserCard user={session?.user} pagetype={"Server"}/>
            <p className="text-2xl text-center">To see this page, you only need to be logged in. :)</p>
        </section>
    )
}
