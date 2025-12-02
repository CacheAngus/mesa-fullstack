"use client";

import { useRouter } from "next/navigation";
import { Button, Input } from "antd";
import React, { useState } from "react";

export default function OrganizationName() {
    const [name, setName] = useState("");
    const router = useRouter();

    const handleClick = () => {
        // TODO save any updated organization name
        // then navigate to the next
        router.push("/onboarding/organization-color");
    };
    const handleInputChange = (e: any) => {
        setName(e.target.value);
    };
    return (
        <>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="w-sm text-center text-sm mb-8">
                    Fill in the name of the company as it will appear across the
                    site
                </div>
                <Input
                    className="shadow-sm"
                    placeholder="Company name"
                    variant="underlined"
                    onChange={handleInputChange}
                ></Input>
                <div className="flex flex-row justify-between w-100 mt-8">
                    <div></div>
                    <div className="">
                        <Button
                            type="text"
                            className=" text-sm"
                            onClick={handleClick}
                            disabled={!name}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
