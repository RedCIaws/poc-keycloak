import Link from 'next/link';

export default function Denied() {
    return (
        <section className="flex flex-col items-center gap-12">
            <h1 className="text-3xl">Access Denied</h1>
            <p className="text-2xl max-w-2xl text-center">You are logged in, but you do not have the required access
                to view this page.
            </p>
            <Link href="/" className="text-2xl text-center underline">Return to Home Page</Link>
        </section>
    )
}
