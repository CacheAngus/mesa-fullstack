"use client";

import { useRouter } from "next/navigation";
import { Button, Input, Space } from "antd";
import React, { useState } from "react";

export default function OrganizationColorSecondary() {
    const [color, setColor] = useState("#B71A2E");
    const router = useRouter();

    const handleClick = () => {
        // TODO save any updated organization colors
        // then navigate to the next
        router.push("/onboarding/organization-logo");
    };
    const handleBackClick = () => {
        router.push("/onboarding/organization-color");
    };
    return (
        <>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="w-sm text-center text-sm mb-8">
                    Type or select the secondary brand color across the site
                </div>
                <div className="flex flex-row w-100 justify-between px-16 gap-4">
                    <Space.Compact>
                        <Space.Addon>HEX</Space.Addon>
                        <Input
                            className="shadow-sm"
                            placeholder="#B71A2E"
                            defaultValue={color}
                            variant="underlined"
                            onChange={(e) => setColor(e.target.value)}
                        ></Input>
                    </Space.Compact>
                    <div
                        style={{ background: color, height: 36, width: 36 }}
                    ></div>
                </div>
                <div className="flex flex-row justify-between w-100 mt-8">
                    <Button
                        type="text"
                        className=" text-sm"
                        onClick={handleBackClick}
                    >
                        Back
                    </Button>
                    <Button
                        type="text"
                        className=" text-sm"
                        onClick={handleClick}
                        disabled={!color}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}
