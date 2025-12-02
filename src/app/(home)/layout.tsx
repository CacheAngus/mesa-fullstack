import { Metadata } from "next";

import HomeNavPage from "./page";

export const metadata: Metadata = {
    title: "Mesa Solutions",
    description: "Signin",
};

export default function HomeNav({ children }) {
    return (
        <>
            <HomeNavPage children={children} />
        </>
    );
}
