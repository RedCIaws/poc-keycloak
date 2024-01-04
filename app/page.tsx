import {getServerSession} from "next-auth";
import {options} from "./api/auth/[...nextauth]/options";

export default async function Home() {
    const session = await getServerSession(options);

    const secretMessage = session ? (
        <p className="text-2xl max-w-2xl text-center">You are logged in as <b>{session?.user?.name}</b>.</p>
    ) : null;

    return (
        <section className="flex flex-col items-center gap-12">
            <h1 className="text-5xl">Public Home Page</h1>
            <p className="text-2xl max-w-2xl text-center">This page is accessible to anyone, even if they are not logged
                in.
            </p>
            {secretMessage}
        </section>
    )
}
