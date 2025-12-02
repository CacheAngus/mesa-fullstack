"use client";

import React, { useState, use } from "react";
import { useOrganization } from "../../page";
import { Button, Dropdown, Input, Table } from "antd";
import ItemDrawer from "../(drawers)/(items-drawer)/ItemsDrawer";

export default function Catalog({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { primary_color, secondary_color, name, logo } = useOrganization();

    const [catalog, setCatalog] = useState({ name: "Catalog 1" });
    const [isVisible, setIsVisible] = useState(false);
    const [item, setItem] = useState({});
    const handleDeleteCatalog = () => {};
    const handleMenuClick = (event) => {
        console.log(event);
    };
    const handleOpenItemDescriptionDrawer = (item) => {
        setItem(item);
        setIsVisible(true);
    };
    const handleOnClose = () => {
        setIsVisible(false);
    };
    const dropdownMenu = (itemId) => (
        <Dropdown
            placement="bottomLeft"
            menu={{
                items: [
                    {
                        label: "Edit item",
                        key: "1",
                        onClick: () => itemId,
                    },
                    {
                        label: "Delete item",
                        key: "1",
                        onClick: () => handleMenuClick(itemId),
                    },
                ],
            }}
        >
            <Button type="text">...</Button>
        </Dropdown>
    );
    const catalogsColumns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name: string) => (
                <Button
                    style={{ color: primary_color }}
                    type="text"
                    onClick={() =>
                        handleOpenItemDescriptionDrawer({
                            name: "Item 1",
                            price: 1000,
                            unit: "Kg",
                            type: "Equipment",
                            description:
                                "This is the description of the item for further information",
                        })
                    }
                >
                    {name}
                </Button>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
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
            name: "Item 1",
            price: 1000,
            type: "Equipment",
            unit: "kg",
            menu: dropdownMenu("1"),
        },
        {
            key: "2",
            id: "3",
            name: "Item 2",
            price: 0.1,
            type: "Equipment",
            unit: "single unit",
            menu: dropdownMenu("1"),
        },
        {
            key: "3",
            id: "3",
            name: "Item 3",
            price: 10,
            type: "Supplies",
            unit: "lbs",
            menu: dropdownMenu("1"),
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
    return (
        <>
            <div className="flex flex-col gap-8 py-9 mx-8">
                <div className="text-5xl text-black font-semibold ">
                    {catalog.name}
                </div>
                {isVisible && (
                    <ItemDrawer
                        backgroundColor={primary_color}
                        handleOnClose={handleOnClose}
                        item={item}
                    />
                )}
                <div className="bg-white rounded-md shadow w-300">
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-lg m-4">
                            Click on an item to see more information
                        </div>
                        <Button
                            className="mr-4"
                            style={{
                                background: primary_color,
                                color: "white",
                            }}
                            onClick={handleDeleteCatalog}
                        >
                            Delete catalog
                        </Button>
                    </div>

                    <div className="m-4 flex flex-row justify-between items-center gap-4">
                        <Input
                            placeholder="Search items"
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
