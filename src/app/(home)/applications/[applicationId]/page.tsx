"use client";

import { Button } from "antd";
import React, { useState } from "react";
import { useOrganization } from "../../page";

export default function Application() {
    // todo getquery if it is editing
    const { primary_color, secondary_color, name, logo } = useOrganization();

    const [isEdit, setIsEdit] = useState(false);
    const [application, setApplication] = useState({ name: "Application 1" });
    const handleEdit = () => {
        setIsEdit(true);
    };
    // todo formDisplays get type display that form
    let applicationDisplay;
    let editDisplay;

    switch (application.type) {
        case "type_1": {
            applicationDisplay = <></>;
            editDisplay = (
                <>
                    <div className="flex flex-col gap">
                        <div className="bg-white rounded-md shadow w-300"></div>
                        <div className="bg-white rounded-md shadow w-300"></div>
                    </div>
                </>
            );
        }
        default: {
            applicationDisplay = (
                <>
                    <div>Information</div>
                </>
            );
            editDisplay = (
                <>
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-md shadow w-300">
                            <div className="p-4 text-2xl"> Financial </div>
                            <div className="p-4">Information</div>
                        </div>
                        <div className="bg-white rounded-md shadow w-300">
                            <div className="p-4 text-2xl">
                                Contact information
                            </div>
                            <div className="p-4">Information</div>
                        </div>
                    </div>
                </>
            );
        }
    }
    return (
        <>
            <div className="flex flex-col gap-8 py-9 mx-8">
                <div className="text-5xl text-black font-semibold ">
                    {application.name}
                </div>
                {isEdit ? (
                    <>
                        <div>{editDisplay}</div>
                    </>
                ) : (
                    <>
                        <div className="bg-white rounded-md shadow w-300">
                            <div className="flex flex-row justify-end items-end mt-2">
                                <Button
                                    className="mr-4"
                                    style={{
                                        background: primary_color,
                                        color: "white",
                                    }}
                                    onClick={handleEdit}
                                >
                                    Edit
                                </Button>
                            </div>
                            <div className="m-4">{applicationDisplay}</div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
