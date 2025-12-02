"use client";

import { Button, Drawer, Form, Input, Space, Upload } from "antd";
import React, { useState } from "react";

const badgeColors = {
    Equipment: "#507C62",
};

export default function ItemDrawer({
    backgroundColor,
    item,
    handleOnClose,
}: {
    backgroundColor: string;
    item;
    handleOnClose;
}) {
    const typeBadgeColor = badgeColors[item.type];
    return (
        <>
            <Drawer
                title={item.name}
                width={720}
                onClose={handleOnClose}
                open={true}
            >
                <div
                    className="flex flex-col justify-between"
                    style={{ height: "98%" }}
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-8">
                            <div className="text-xl font-semibold">
                                {item.name}
                            </div>
                            <div
                                className="px-2 flex items-center rounded"
                                style={{
                                    background: typeBadgeColor,
                                    color: "white",
                                }}
                            >
                                {item.type}
                            </div>
                        </div>
                        <div className="text-md">
                            {item.price}/{item.unit}
                        </div>
                        <div className="text-md">{item.description}</div>
                    </div>
                    <Space className="flex flex-row justify-between">
                        <Button
                            type="text"
                            onClick={handleOnClose}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={handleOnClose}
                            type="primary"
                            style={{ background: backgroundColor }}
                        >
                            Add to application
                        </Button>
                    </Space>
                </div>
            </Drawer>
        </>
    );
}
