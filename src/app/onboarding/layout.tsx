import { Metadata } from "next";
import OrganizationName from "./organization-name/page";
import OrganizationColor from "./organization-color/page";
import OrganizationLogo from "./organization-logo/page";
import { Route } from "react-router";

export const metadata: Metadata = {
    title: "Mesa Solutions",
    description: "Onboarding",
};

export default function Onboarding({ children }) {
    return (
        <>
            <div className=" flex flex-col h-screen items-center">
                <div className="bg-black w-md py-4 px-8 mt-auto">
                    <div className="flex flex-col items-center text-primary text-sm pb-2">
                        Welcome to
                    </div>
                    <div className="flex flex-col text-white items-center font-cousine font-bold text-4xl">
                        MESA SOLUTIONS
                    </div>
                </div>
                <div className="bg-white w-md h-70 mb-auto static shadow-lg">
                    <div className="flex flex-col justify-between items-center">
                        <div className="text-black font-inter text-2xl font-bold my-4">
                            Company information
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
