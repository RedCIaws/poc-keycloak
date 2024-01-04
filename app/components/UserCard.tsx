import Image from "next/image"
import type {User} from "next-auth"

type Props = {
    user: User,
    pagetype: string,
}

export default function Card({user, pagetype}: Props) {

    //console.log(user)

    const greeting = user?.name ? (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-2xl text-black">
            Hello {user?.name}!
        </div>
    ) : null;

    const emailDisplay = user?.email ? (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-2xl text-black">
            {user?.email}
        </div>
    ) : null;

    const userImage = user?.image ? (
        <Image
            className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
            src={user?.image}
            width={200}
            height={200}
            alt={user?.name ?? "Profile Pic"}
            priority={true}
        />
    ) : null;

    const rolesDisplay = user?.roles ? (
        <div className="inline p-3 text-2xl text-black">
            <b>Roles :</b> {user.roles?.map((role, index) => (
            <span key={index} className="mr-2">{role}, </span>
        ))}
        </div>
    ) : null;

    return (
        <section className="flex flex-col items-center gap-12">
            <h1 className="text-5xl">{pagetype} Page!</h1>
            {greeting}
            {emailDisplay}
            {userImage}
            {rolesDisplay}
        </section>
    )
}
