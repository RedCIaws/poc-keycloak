// Without a defined matcher, this one line applies next-auth to the entire project
// export {default} from 'next-auth/middleware';

// https://next-auth.js.org/configuration/nextjs#advanced-usage
import {withAuth, NextRequestWithAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
    // withAuth augments your Request with the user's token
    function middleware(request: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname);
        // console.log(request.nextauth.token);

        if (request.nextUrl.pathname.startsWith("/dashboard")
            && !request.nextauth.token?.roles.includes("Premium")) {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith("/client")
            && !request.nextauth.token?.roles.includes("Admin")
            && !request.nextauth.token?.roles.includes("Premium")) {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({token}) => !!token,
        }
    }
);

// matcher apply next-auth only to matching routes
export const config = {matcher: ["/extra", "/dashboard", "/client"]}
