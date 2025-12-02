"use client";

import React, { useState } from "react";
import { useOrganization } from "../page";
import {
    Button,
    Dropdown,
    Form,
    Input,
    Space,
    Table,
    TreeSelect,
    Upload,
} from "antd";
import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        // message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        // message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}

export default function Organization() {
    const { primary_color, secondary_color, name, logo } = useOrganization();
    const [formValues, setFormValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        permissions: [],
    });
    const [organizationName, setName] = useState(name);
    const [organizationPrimaryColor, setPrimaryColor] = useState(primary_color);
    const [organizationSecondaryColor, setSecondaryColor] =
        useState(secondary_color);
    const [organizationLogo, setLogo] = useState(logo);
    const handleChange = (info) => {
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => setLogo(imageUrl));
        }
    };
    const userColumns = [
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            sorter: (a, b) => a.user.localeCompare(b.user),
        },
        {
            title: "Permissions",
            dataIndex: "permissions",
            key: "permissions",
            render: (permission) => (
                <div className="flex flex-col gap-4">
                    {permission.map((perm) => (
                        <div>{perm.toUpperCase()}</div>
                    ))}
                </div>
            ),
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
    const handleMenuClick = (event) => {
        console.log(event);
    };
    const dropdownMenu = (user) => (
        <Dropdown
            placement="bottomLeft"
            menu={{
                items: [
                    {
                        label: "Delete user",
                        key: "1",
                        onClick: () => handleMenuClick(user),
                    },
                ],
            }}
        >
            <Button type="text">...</Button>
        </Dropdown>
    );
    let userData = [
        {
            key: "1",
            user: "johnbrown@email.com",
            permissions: ["Admin"],
            date: "September 12, 2025",
            menu: dropdownMenu("johnbrown@email.com"),
        },
        {
            key: "2",
            user: "whitney@email.com",
            permissions: ["Catalogs", "Applications"],
            date: "September 12, 2025",
            menu: dropdownMenu("whitney@email.com"),
        },
        {
            key: "3",
            user: "cache@email.com",
            permissions: ["Applications"],
            date: "September 12, 2025",
            menu: dropdownMenu("cache@email.com"),
        },
        {
            key: "4",
            user: "felix@email.com",
            permissions: ["Catalogs"],
            date: "September 12, 2025",
            menu: dropdownMenu("felix@email.com"),
        },
    ];
    const handleFormChange = (key, value) => {
        setFormValues((values) => {
            return { ...values, [key]: value };
        });
    };
    const handlePermissionsChange = (value) => {
        setFormValues((values) => {
            return { ...values, permissions: value };
        });
    };
    const permissionsTreeData = [
        { title: "Admin", value: "admin", key: "admin" },
        { title: "Catalogs", value: "catalogs", key: "catalogs" },
        { title: "Applications", value: "applications", key: "applications" },
    ];
    const [userDataSource, setDataSource] = useState(userData);
    const [searchValue, setSearchValue] = useState("");
    const handleSearch = (value) => {
        setSearchValue(value);
        if (!value.length) {
            return setDataSource(userData);
        }
        setDataSource(userData.filter((user) => user.user.includes(value)));
    };
    const catalogsColumns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Vendor",
            dataIndex: "vendor",
            key: "vendor",
        },
        {
            title: "Items",
            dataIndex: "items",
            key: "items",
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
    ];
    const catalogs = [
        {
            key: "1",
            title: "Catalog 1",
            vendor: "Company",
            items: 4,
            author: "John Brown",
            date: "September 4th, 2025",
        },
        {
            key: "2",
            title: "Catalog 2",
            vendor: "Company Teo",
            items: 100,
            author: "John Brown",
            date: "September 4th, 2025",
        },
    ];
    const [catalogsDataSource, setCatalogsDataSource] = useState(catalogs);
    const [searchCatalogs, setSearchCatalogsValue] = useState("");
    const handleCatalogSearch = (value) => {
        setSearchCatalogsValue(value);
        if (!value.length) {
            return setCatalogsDataSource(catalogs);
        }
        setCatalogsDataSource(
            catalogs.filter(
                (catalog) =>
                    catalog.title.includes(value) ||
                    catalog.vendor.includes(value)
            )
        );
    };
    const handleAddNewUser = () => {
        userData = [
            ...userData,
            {
                key: (userData.length + 1).toString(),
                user: formValues.email,
                permissions: formValues.permissions,
                // date: new Date().toString(),
                date: "Sept 4, 2025",
                menu: dropdownMenu(formValues.email),
            },
        ];
        setDataSource(userData);
    };
    return (
        <>
            <div className="flex flex-col gap-8 py-9 mx-8">
                <div className="text-5xl text-black font-semibold ">{name}</div>
                <div className="bg-white rounded-md shadow w-300">
                    <div className="text-2xl ml-4 mt-2">
                        Company information
                    </div>
                    <div className="text-md text-gray-500 ml-4 mt-2 ">
                        Update company information, changes will be reflected
                        across the platform.
                    </div>
                    <div className="flex flex-row  items-center mx-4 mt-4">
                        <div
                            className="flex flex-col w-75 gap-2"
                            style={{ width: 400 }}
                        >
                            <div className="text-lg">Company name</div>
                            <div className="text-sm text-gray-500 mb-4">
                                Update the name of the company
                            </div>
                            <Input
                                className="shadow-sm"
                                placeholder="Organization name"
                                variant="underlined"
                                style={{ width: 400 }}
                                value={organizationName}
                                onChange={(e) => setName(e.target.value)}
                            ></Input>
                        </div>
                    </div>
                    <div className="border-b-2 border-b-gray-200 mx-2 mt-4"></div>
                    <div className="flex flex-row  items-center mx-4 mt-4 ">
                        <div className="flex flex-col gap-2 ">
                            <div className="text-lg">Company color</div>
                            <div className="text-sm text-gray-500 mb-4">
                                Update the brand color of the company
                            </div>
                            <div className="flex flex-row items-center justify-center gap-16 mt-4">
                                <Space.Compact style={{ width: 400 }}>
                                    <Space.Addon>HEX</Space.Addon>
                                    <Input
                                        className="shadow-sm"
                                        placeholder="#986935"
                                        defaultValue={organizationPrimaryColor}
                                        variant="underlined"
                                        onChange={(e) =>
                                            setPrimaryColor(e.target.value)
                                        }
                                    ></Input>
                                </Space.Compact>
                                <div
                                    style={{
                                        background: organizationPrimaryColor,
                                        height: 48,
                                        width: 96,
                                    }}
                                ></div>
                            </div>
                            <div className="flex flex-row items-center justify-center gap-16 mt-8">
                                <Space.Compact style={{ width: 400 }}>
                                    <Space.Addon>HEX</Space.Addon>
                                    <Input
                                        className="shadow-sm"
                                        placeholder="#986935"
                                        defaultValue={
                                            organizationSecondaryColor
                                        }
                                        variant="underlined"
                                        onChange={(e) =>
                                            setSecondaryColor(e.target.value)
                                        }
                                    ></Input>
                                </Space.Compact>
                                <div
                                    style={{
                                        background: organizationSecondaryColor,
                                        height: 48,
                                        width: 96,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b-2 border-b-gray-200 mx-2 mt-4"></div>
                    <div className="flex flex-row  items-center mx-4 my-4 ">
                        <div
                            className="flex flex-col w-75 gap-2"
                            style={{ width: 400 }}
                        >
                            <div className="text-lg">Company logo</div>
                            <div className="text-sm text-gray-500 mb-4">
                                Update the brand logo of the company
                            </div>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                <div>
                                    <PlusOutlined type="plus" />
                                    <div className="ant-upload-text">
                                        Upload
                                    </div>
                                </div>
                            </Upload>
                        </div>
                        <div className="flex flex-row justify-between px-16 gap-4 mt-8">
                            <img
                                src={organizationLogo}
                                style={{ width: 250, height: 150 }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-end my-2 mx-4">
                        <Button
                            size="large"
                            disabled={
                                primary_color === organizationPrimaryColor &&
                                secondary_color ===
                                    organizationSecondaryColor &&
                                name === organizationName &&
                                organizationLogo === logo
                            }
                            style={{
                                background: organizationPrimaryColor,
                                color: "white",
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow w-300">
                    <div className="text-2xl ml-4 mt-2">Users</div>
                    <div className="text-md text-gray-500 ml-4 mt-2 ">
                        View all users and their permissions or add a new user
                        to the platform.
                    </div>
                    <div className="text-lg m-4">Add new users</div>
                    <div className="flex flex-col m-4">
                        <Form layout="horizontal">
                            <div className="flex flex-row gap-8">
                                <Form.Item
                                    label="First name"
                                    className="w-150"
                                >
                                    <Input
                                        required
                                        placeholder="John"
                                        variant="underlined"
                                        value={formValues.first_name}
                                        onChange={(e) =>
                                            handleFormChange(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                    ></Input>
                                </Form.Item>
                                <Form.Item
                                    label="Last name"
                                    className="w-150"
                                >
                                    <Input
                                        required
                                        placeholder="Smith"
                                        variant="underlined"
                                        value={formValues.last_name}
                                        onChange={(e) =>
                                            handleFormChange(
                                                "last_name",
                                                e.target.value
                                            )
                                        }
                                    ></Input>
                                </Form.Item>
                            </div>
                            <div className="flex flex-row gap-8">
                                <Form.Item
                                    label="Email"
                                    className="w-150"
                                >
                                    <Input
                                        required
                                        placeholder="johnsmith@email.com"
                                        variant="underlined"
                                        type="email"
                                        value={formValues.email}
                                        onChange={(e) =>
                                            handleFormChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                    ></Input>
                                </Form.Item>
                                <Form.Item
                                    label="Permissions"
                                    className="w-150"
                                >
                                    <TreeSelect
                                        treeData={permissionsTreeData}
                                        value={formValues.permissions}
                                        onChange={handlePermissionsChange}
                                        treeCheckable="true"
                                        placeholder="Select permissions"
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                    <div className="flex flex-row justify-end mx-4">
                        <Button
                            size="large"
                            disabled={
                                !formValues.email ||
                                !formValues.first_name ||
                                !formValues.last_name ||
                                !formValues.permissions.length
                            }
                            style={{
                                background: organizationPrimaryColor,
                                color: "white",
                            }}
                            onClick={handleAddNewUser}
                        >
                            Add user
                        </Button>
                    </div>
                    <div className="border-b-2 border-b-gray-200 mx-2 mt-4"></div>
                    <div className="text-lg m-4">Current users</div>
                    <div className="m-4">
                        {" "}
                        <Input
                            placeholder="Search users"
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <div className="m-4">
                        <Table
                            columns={userColumns}
                            dataSource={userDataSource}
                            pagination={{
                                pageSize: 5,
                                hideOnSinglePage: true,
                            }}
                        ></Table>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow w-300">
                    <div className="text-2xl ml-4 mt-2">Catalogs</div>
                    <div className="text-md text-gray-500 ml-4 mt-2 ">
                        View and filter all catalogs.
                    </div>
                    <div className="text-lg m-4">All catalogs</div>
                    <div className="m-4 flex flex-row justify-between items-center gap-4">
                        <Input
                            placeholder="Search catalogs"
                            value={searchCatalogs}
                            onChange={(e) =>
                                handleCatalogSearch(e.target.value)
                            }
                        />
                        <Link
                            href="/catalogs"
                            style={{ color: "black" }}
                            className="w-45"
                        >
                            Manage catalogs <ArrowRightOutlined />
                        </Link>
                    </div>
                    <div className="m-4">
                        <Table
                            columns={catalogsColumns}
                            dataSource={catalogsDataSource}
                            pagination={{
                                pageSize: 5,
                                hideOnSinglePage: true,
                            }}
                        ></Table>
                    </div>
                </div>
            </div>
        </>
    );
}
