"use client";

import React, { useState } from "react";
import { useOrganization } from "../page";
import { Dropdown, Button, Input, Table, Tabs } from "antd";
import Link from "next/link";

export default function Applications() {
    const { primary_color, secondary_color, name, logo } = useOrganization();
    const handleMenuClick = (event) => {
        console.log(event);
    };
    const dropdownMenu = (applicationId) => (
        <Dropdown
            placement="bottomLeft"
            menu={{
                items: [
                    {
                        label: "Edit application",
                        key: "1",
                        onClick: () => handleMenuClick(applicationId),
                    },
                    {
                        label: "Delete application",
                        key: "2",
                        onClick: () => handleMenuClick(applicationId),
                    },
                ],
            }}
        >
            <Button type="text">...</Button>
        </Dropdown>
    );
    const applicationColumns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (title: string) => (
                <Link
                    style={{ color: primary_color }}
                    href={`/applications/1`}
                >
                    {title}
                </Link>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                if ("active" === status) {
                    return <div>Active</div>;
                }
                if ("draft" === status) {
                    return <div>Draft</div>;
                }
                if ("completed" === status) {
                    return <div>Completed</div>;
                }
            },
        },
        {
            title: "Vendor",
            dataIndex: "vendor",
            key: "vendor",
        },
        {
            title: "Created by",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Date added",
            dataIndex: "date",
            key: "date",
        },

        {
            title: "",
            dataIndex: "menu",
            key: "menu",
        },
    ];
    const activeApplications = [
        {
            key: "1",
            id: "3",
            title: "Application 1",
            vendor: "Company",
            status: "active",
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("1"),
        },
        {
            key: "2",
            id: "4",
            title: "Application 2",
            vendor: "Company Teo",
            status: "active",
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("2"),
        },

        {
            key: "3",
            id: "5",
            title: "Application 3",
            vendor: "Company Teo",
            status: "active",
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("2"),
        },
    ];
    const draftApplications = [
        {
            key: "1",
            id: "3",
            title: "Application 1",
            vendor: "Company",
            status: "draft",
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("1"),
        },
        {
            key: "2",
            id: "4",
            title: "Application 2",
            vendor: "Company Teo",
            status: "draft",
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("2"),
        },

        {
            key: "3",
            id: "5",
            title: "Application 3",
            vendor: "Company Teo",
            status: "draft",
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("2"),
        },
    ];
    const completedApplications = [
        {
            key: "1",
            id: "3",
            title: "Application 1",
            vendor: "Company",
            status: "completed",
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("1"),
        },
        {
            key: "2",
            id: "4",
            title: "Application 2",
            vendor: "Company Teo",
            status: "completed",
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("2"),
        },

        {
            key: "3",
            id: "5",
            title: "Application 3",
            vendor: "Company Teo",
            status: "completed",
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("2"),
        },
    ];
    const [activeApplicationsDataSource, setActiveApplicationsDataSource] =
        useState(activeApplications);
    const [draftApplicationsDataSource, setDraftApplicationsDataSource] =
        useState(draftApplications);
    const [
        completedApplicationsDataSource,
        setCompletedApplicationsDataSource,
    ] = useState(completedApplications);
    // const [searchApplications, setSearchApplicationsValue] = useState("");
    // const handleApplicationSearch = (value) => {
    //     setSearchApplicationsValue(value);
    //     if (!value.length) {
    //         return setApplicationsDataSource(applications);
    //     }
    //     setApplicationsDataSource(
    //         applications.filter(
    //             (application) =>
    //                 application.title.includes(value) ||
    //                 application.vendor.includes(value)
    //         )
    //     );
    // };
    const table = (dataSource) => (
        <Table
            columns={applicationColumns}
            dataSource={dataSource}
            pagination={{
                pageSize: 5,
                hideOnSinglePage: true,
            }}
        ></Table>
    );
    const tabItems = [
        {
            key: "1",
            label: "Active",
            children: table(activeApplicationsDataSource),
        },
        {
            key: "2",
            label: "Draft",
            children: table(draftApplicationsDataSource),
        },
        {
            key: "3",
            label: "Completed",
            children: table(completedApplicationsDataSource),
        },
    ];
    const handleAddNew = () => {};
    return (
        <>
            <div className="flex flex-col gap-8 py-9 mx-8">
                <div className="text-5xl text-black font-semibold ">
                    Applications
                </div>
                <div className="bg-white rounded-md shadow w-300">
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-lg m-4">All catalogs</div>
                        <Button
                            className="mr-4"
                            style={{
                                background: primary_color,
                                color: "white",
                            }}
                            onClick={handleAddNew}
                        >
                            Add new application
                        </Button>
                    </div>
                    {/* <div className="m-4 flex flex-row justify-between items-center gap-4">
                        <Input
                            placeholder="Search applications"
                            value={searchApplications}
                            onChange={(e) =>
                                handleApplicationSearch(e.target.value)
                            }
                        />
                    </div> */}
                    <div className="m-4">
                        <Tabs
                            defaultActiveKey="1"
                            items={tabItems}
                        ></Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}
