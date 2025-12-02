import { Metadata } from "next";
import Signin from "./sign-in/page";
import Signup from "./sign-up/page";
import { Route, Routes } from "react-router";

export const metadata: Metadata = {
    title: "Mesa Solutions",
    description: "Signin",
};

export default function HomePage({ children }) {
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
                    {/* <Routes>
                        <Route
                            path="/sign-in"
                            element={<Signin />}
                        ></Route>
                        <Route
                            path="/sign-up"
                            element={<Signup />}
                        ></Route>{" "}
                    </Routes> */}
                    {children}
                </div>
            </div>
        </>
    );
}
