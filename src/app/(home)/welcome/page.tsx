"use client";

import { Button, ColorPicker } from "antd";
import React from "react";
import { FormsList } from "./(display)/FormList";
import { FormsHeader } from "./(display)/FormsHeader";
import { useOrganization } from "../page";

export default function Welcome() {
    const { primary_color, secondary_color, name, logo } = useOrganization();
    const formItems = [
        {
            key: "1",
            title: "Form 1",
            description: " This is a description of that form",
            formType: "type",
            completed: true,
        },
        {
            key: "2",
            title: "Form 2",
            description: " This is a description of that form",
            completed: false,
            formType: "type",
        },
        {
            key: "3",
            title: "Form 3",
            description: " This is a description of that form",
            completed: false,
            formType: "type",
        },
    ];
    const organizationItems = [
        {
            key: "1",
            title: "Name",
            description: " Add a name to your organization",
            url: "/organization",
            completed: true,
        },
        {
            key: "2",
            title: "Logo",
            description: "Add a logo to your organization",
            url: "/organization",
            completed: true,
        },
        {
            key: "3",
            title: "Brand Color",
            description: "Add a brand color to your organization",
            url: "/organization",
            completed: true,
        },
    ];
    const catalogItems = [
        {
            key: "1",
            title: "Add catalog",
            description: "Add a catalog to begin ordering",
            url: "/catalogs",
            completed: false,
        },
    ];
    const completedSteps = 1;
    const totalSteps = 3;
    return (
        <>
            <div className="flex flex-col gap-8 py-9 mx-8">
                <div className="text-5xl text-black font-semibold">Welcome</div>
                <div className="bg-white rounded-md shadow w-300">
                    <FormsHeader
                        steps={{ completedSteps, totalSteps }}
                        title="Forms"
                        color={primary_color}
                    />
                    <FormsList
                        items={formItems}
                        color={secondary_color}
                    />
                </div>
                <div className="bg-white rounded-md shadow w-300">
                    <FormsHeader
                        steps={{ completedSteps: 0, totalSteps: 1 }}
                        title="Catalogs"
                        color={primary_color}
                    />

                    <FormsList
                        items={catalogItems}
                        color={secondary_color}
                    />
                </div>
                <div className="bg-white rounded-md shadow w-300">
                    <FormsHeader
                        steps={{ completedSteps: 3, totalSteps: 3 }}
                        title="Organization"
                        color={primary_color}
                    />

                    <FormsList
                        items={organizationItems}
                        color={secondary_color}
                    />
                </div>
            </div>
        </>
    );
}
