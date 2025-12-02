"use client";

import { Button, Drawer, Dropdown, Input, Table } from "antd";
import React, { useState } from "react";
import { useOrganization } from "../page";
import Link from "next/link";
import CatalogDrawer from "./(drawers)/(catalog-drawer)/page";

export default function Catalogs() {
    const { primary_color, secondary_color, name, logo } = useOrganization();
    const [isVisible, setIsVisible] = useState(false);
    const [drawerId, setDrawerId] = useState(undefined);
    const handleMenuClick = (event) => {
        console.log(event);
    };
    const handleOpenDrawer = (catalogId) => {
        if (catalogId) {
            setDrawerId(catalogId);
        }
        setIsVisible(true);
    };
    const dropdownMenu = (catalogId) => (
        <Dropdown
            placement="bottomLeft"
            menu={{
                items: [
                    {
                        label: "Edit catalog",
                        key: "1",
                        onClick: () => handleOpenDrawer(catalogId),
                    },
                    {
                        label: "Delete catalog",
                        key: "1",
                        onClick: () => handleMenuClick(catalogId),
                    },
                ],
            }}
        >
            <Button type="text">...</Button>
        </Dropdown>
    );
    const catalogsColumns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (title: string) => (
                <Link
                    style={{ color: primary_color }}
                    href={`/catalogs/1`}
                >
                    {title}
                </Link>
            ),
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

        {
            title: "",
            dataIndex: "menu",
            key: "menu",
        },
    ];
    const catalogs = [
        {
            key: "1",
            id: "3",
            title: "Catalog 1",
            vendor: "Company",
            items: 4,
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("1"),
        },
        {
            key: "2",
            id: "4",
            title: "Catalog 2",
            vendor: "Company Teo",
            items: 100,
            author: "John Brown",
            date: "September 4th, 2025",
            menu: dropdownMenu("2"),
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
    const handleAddNew = () => {
        setDrawerId(undefined);
        setIsVisible(true);
    };
    const handleOnClose = () => {
        setIsVisible(false);
    };
    return (
        <>
            <div className="flex flex-col gap-8 py-9 mx-8">
                <div className="text-5xl text-black font-semibold ">
                    Catalogs
                </div>
                {isVisible && (
                    <CatalogDrawer
                        backgroundColor={primary_color}
                        catalogId={drawerId}
                        handleOnClose={handleOnClose}
                    />
                )}
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
                            Add new catalog
                        </Button>
                    </div>
                    <div className="m-4 flex flex-row justify-between items-center gap-4">
                        <Input
                            placeholder="Search catalogs"
                            value={searchCatalogs}
                            onChange={(e) =>
                                handleCatalogSearch(e.target.value)
                            }
                        />
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
