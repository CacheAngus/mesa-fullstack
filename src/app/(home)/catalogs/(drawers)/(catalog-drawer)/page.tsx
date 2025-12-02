"use client";

import { Button, Drawer, Form, Input, Space, Upload } from "antd";
import React, { useState } from "react";

export default function CatalogDrawer({
    backgroundColor,
    catalogId,
    handleOnClose,
}: {
    backgroundColor: string;
    catalogId?: string;
    handleOnClose;
}) {
    const [catalogFormValues, setCatalog] = useState({});
    const [itemsFormValue, setItemsFormValue] = useState("");
    const handleCatalogUpdate = (update) => {};
    const handleFormChange = (key, value) => {
        setCatalog((values) => {
            return { ...values, [key]: value };
        });
    };
    const handleItemsFormChange = (value) => {
        // todo needs to be parsed
        setItemsFormValue(value);
    };
    const handleFileUpload = (value) => {
        // todo parse file
        setItemsFormValue(value);
    };
    return (
        <>
            <Drawer
                title={catalogFormValues.title ? "Edit catalog" : "New catalog"}
                width={720}
                onClose={handleOnClose}
                open={true}
            >
                <div
                    className="flex flex-col justify-between"
                    style={{ height: "98%" }}
                >
                    <Form layout="vertical">
                        <Form.Item label="Catalog title">
                            <Input
                                required
                                placeholder="Catalog title..."
                                variant="underlined"
                                value={catalogFormValues.title}
                                onChange={(e) =>
                                    handleFormChange("title", e.target.value)
                                }
                            ></Input>
                        </Form.Item>
                        <Form.Item label="Vendor">
                            <Input
                                required
                                placeholder="Vendor name..."
                                variant="underlined"
                                value={catalogFormValues.vendor}
                                onChange={(e) =>
                                    handleFormChange("vendor", e.target.value)
                                }
                            ></Input>
                        </Form.Item>
                        <Form.Item label="Catalog items">
                            <div className="text-sm my-2 text-gray-500">
                                Please copy and paste in your catalog items or
                                upload them below.
                            </div>
                            <Input.TextArea
                                required
                                placeholder="item,price,unit,type"
                                value={itemsFormValue}
                                onChange={(e) =>
                                    handleItemsFormChange(e.target.value)
                                }
                            ></Input.TextArea>
                            <div className="text-sm my-2 text-gray-500">Or</div>
                            <Upload onChange={handleFileUpload}>
                                <Button
                                    style={{
                                        background: "white",
                                        color: backgroundColor,
                                        outlineColor: backgroundColor,
                                        outlineStyle: "solid",
                                    }}
                                >
                                    Upload items csv
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                    <Space className="flex flex-row justify-between">
                        <Button
                            type="text"
                            onClick={handleOnClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleOnClose}
                            type="primary"
                            style={{ background: backgroundColor }}
                        >
                            Submit
                        </Button>
                    </Space>
                </div>
            </Drawer>
        </>
    );
}
