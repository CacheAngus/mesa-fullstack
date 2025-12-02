"use client";

import { FileOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { useOrganization } from "../page";
import React, { useState } from "react";
import { Button } from "antd";
import Link from "next/link";

export default function Home() {
    const { primary_color, secondary_color, name, logo } = useOrganization();
    const [applications, setApplications] = useState({ open: 0, completed: 0 });
    const [catalogs, setCatalogs] = useState(0);

    return (
        <>
            <div className="flex flex-col gap-8 py-9 mx-8">
                <div className="text-5xl text-black font-semibold ">
                    Welcome
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-16 w-250">
                    <div className="bg-white rounded-md shadow  h-65 flex flex-col">
                        <div
                            className="h-35 flex justify-center items-center rounded-t-md"
                            style={{ background: primary_color }}
                        >
                            <FileOutlined
                                style={{ fontSize: "96px", color: "white" }}
                            />
                        </div>
                        <Link
                            href="/applications"
                            className="text-2xl font-semibold mb-2 mt-4 px-4"
                            style={{ color: "black" }}
                        >
                            Applications
                        </Link>
                        <div className="text-lg text-gray-500 px-4">
                            {applications.open} open / {applications.completed}{" "}
                            completed
                        </div>
                    </div>

                    <div className="bg-white rounded-md shadow  h-65 flex flex-col">
                        <div
                            className="h-35 flex justify-center items-center rounded-t-md"
                            style={{ background: secondary_color }}
                        >
                            <FolderOpenOutlined
                                style={{ fontSize: "96px", color: "white" }}
                            />
                        </div>
                        <Link
                            href="/catalogs"
                            className="text-2xl font-semibold mb-2 mt-4 px-4"
                            style={{ color: "black" }}
                        >
                            Catalogs
                        </Link>
                        <div className="text-lg text-gray-500 px-4">
                            {catalogs} catalogs
                        </div>
                    </div>
                    <div className="bg-white rounded-md shadow  h-65 flex flex-col">
                        <div
                            className="h-35 flex justify-center items-center rounded-t-md"
                            style={{ backgroundImage: logo }}
                        >
                            <img
                                src={logo}
                                className="h-full w-full"
                            />
                        </div>
                        <Link
                            href="/organization"
                            className="text-2xl font-semibold mb-2 mt-4 px-4"
                            style={{ color: "black" }}
                        >
                            Organization
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
