"use client";

import { useRouter } from "next/navigation";
import { Button, Input, Space } from "antd";
import { useState } from "react";

export default function OrganizationColor() {
    const [color, setColor] = useState("#E31635");
    const router = useRouter();

    const handleClick = () => {
        // TODO save any updated organization colors
        // then navigate to the next
        router.push("/onboarding/organization-color-secondary");
    };
    const handleBackClick = () => {
        router.push("/onboarding/organization-name");
    };
    return (
        <>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="w-sm text-center text-sm mb-8">
                    Type or select the brand color across the site
                </div>
                <div className="flex flex-row w-100 justify-between px-16 gap-4">
                    <Space.Compact>
                        <Space.Addon>HEX</Space.Addon>
                        <Input
                            className="shadow-sm"
                            placeholder="#E31635"
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
