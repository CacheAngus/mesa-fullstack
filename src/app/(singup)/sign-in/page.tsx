"use client";

import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Signin() {
    const route = useRouter();
    const handleOnClick = () => {
        route.push("/onboarding/organization-name");
    };
    return (
        <>
            <div className="flex flex-col justify-between items-center h-full">
                <Button
                    type="default"
                    size="large"
                    // icon={<EntraIcon />}
                    className="mt-24"
                    onClick={handleOnClick}
                >
                    Sign in with EntraId
                </Button>
                <div className="mb-8">
                    <p className="text-black text-xs">
                        Don't have an account?
                        <Link
                            href="/onboarding/organization-name"
                            className="text-indigo-600 pl-2"
                        >
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
