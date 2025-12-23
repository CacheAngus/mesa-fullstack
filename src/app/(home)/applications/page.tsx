"use client";

import React, { useEffect, useState } from "react";
import { useOrganization } from "../page";
import { Dropdown, Button, Input, Table, Tabs, Modal, Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Application } from "@/src/app/lib/Application_types";
import axios from "axios";

type DisplayApplications = Application & { menu };

export default function Applications() {
    const { primary_color, secondary_color, name, logo } = useOrganization();
    const router = useRouter();
    const handleMenuClick = (applicationId: string) => {
        console.log(applicationId);
    };
    const dropdownMenu = (applicationId: string) => (
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
            title: "Name",
            dataIndex: "name",
            key: "name",
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
            render: (status: string) => {
                if ("active" === status) {
                    return <div>Active</div>;
                }
                if ("draft" === status) {
                    return <div>Draft</div>;
                }
                if ("complete" === status) {
                    return <div>Completed</div>;
                }
            },
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Created by",
            dataIndex: "created_by",
            key: "created_by",
        },
        {
            title: "Date added",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "",
            dataIndex: "menu",
            key: "menu",
        },
    ];
    const [applications, setApplications] = useState<DisplayApplications[]>();
    useEffect(() => {
        const fetchApplications = async () => {
            const fetchedApplications = await axios.get("/api/applications");
            setApplications(
                fetchedApplications.data.map((application: Application) => ({
                    ...application,
                    menu: dropdownMenu(application._id),
                }))
            );
        };
        fetchApplications();
    }, []);
    const [activeApplications, setActiveApplications] =
        useState<DisplayApplications[]>();
    useEffect(() => {
        setActiveApplications(
            applications?.filter(
                (application) => "active" === application.status
            )
        );
    }, applications);
    const [draftApplications, setDraftApplications] =
        useState<DisplayApplications[]>();
    useEffect(() => {
        setDraftApplications(
            applications?.filter(
                (application) => "draft" === application.status
            )
        );
    }, applications);
    const [completedApplications, setCompletedApplications] =
        useState<DisplayApplications[]>();
    useEffect(() => {
        setCompletedApplications(
            applications?.filter(
                (application) => "complete" === application.status
            )
        );
    }, applications);
    const [activeApplicationsDataSource, setActiveApplicationsDataSource] =
        useState(activeApplications);
    useEffect(() => {
        setActiveApplicationsDataSource(activeApplications);
    }, activeApplications);
    const [draftApplicationsDataSource, setDraftApplicationsDataSource] =
        useState(draftApplications);
    useEffect(() => {
        setDraftApplicationsDataSource(draftApplications);
    }, draftApplications);
    const [
        completedApplicationsDataSource,
        setCompletedApplicationsDataSource,
    ] = useState(completedApplications);
    useEffect(() => {
        setCompletedApplicationsDataSource(completedApplications);
    }, completedApplications);
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
    const [showModal, setShowModal] = useState(false);
    const [applicationInfo, setApplicationInfo] = useState<{
        id?: string;
        name?: string;
        type?: string;
    }>({});
    const handleAddNew = () => {
        setShowModal(true);
    };
    const handleCancel = () => {
        setShowModal(false);
        setApplicationInfo({});
    };
    const handleOk = async () => {
        setApplicationInfo({ ...applicationInfo });
        const newApplication = await axios.post(
            "api/applications",
            applicationInfo
        );
        router.push(
            `/applications/${newApplication.data._id}?isEdit=true&type=${applicationInfo.type}`
        );
    };
    return (
        <>
            <div className="flex flex-col gap-8 py-9 mx-8">
                <div className="text-5xl text-black font-semibold ">
                    Applications
                </div>
                <div className="bg-white rounded-md shadow w-300">
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-lg m-4">All applications</div>
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
                    <Modal
                        title="New credit application"
                        open={showModal}
                        onCancel={handleCancel}
                        footer={[
                            <Button
                                type="text"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>,
                            <Button
                                style={{
                                    background: primary_color,
                                    color: "white",
                                }}
                                onClick={handleOk}
                            >
                                Start
                            </Button>,
                        ]}
                    >
                        <div className="mb-2">Select the application type</div>
                        <Select
                            placeholder="Application type"
                            onChange={(e) =>
                                setApplicationInfo({
                                    ...applicationInfo,
                                    type: e,
                                })
                            }
                            options={[
                                {
                                    value: "credit",
                                    label: "Credit application",
                                },
                            ]}
                        ></Select>
                        <div className="my-2">Add new application name</div>
                        <Input
                            style={{ width: "70%" }}
                            variant="underlined"
                            placeholder="New application name"
                            value={applicationInfo.name}
                            onChange={(e) =>
                                setApplicationInfo({
                                    ...applicationInfo,
                                    name: e.target.value,
                                })
                            }
                        ></Input>
                    </Modal>
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
