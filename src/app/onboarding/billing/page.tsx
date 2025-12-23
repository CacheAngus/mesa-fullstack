"use client";

import { useRouter } from "next/navigation";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import React, { createContext, useContext, useState } from "react";
const { Option } = Select;

export default function BillingOnboarding() {
    // todo set as global var
    const [billing, setBilling] = useState<{
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: number;
        title?: string;
        address?: string;
    }>({});
    const handleFormChange = (key: string, value: string | number) => {
        setBilling((values) => {
            return { ...values, [key]: value };
        });
    };
    const [extension, setExtension] = useState("can");
    const router = useRouter();

    // set state variable for account
    const handleClick = () => {
        // TODO save any updated organization name
        // then navigate to the next
        router.push("/onboarding/franchise");
    };
    return (
        <>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="text-black font-inter text-2xl font-bold my-4">
                    Billing information
                </div>
                <div className="w-sm text-center text-sm mb-4">
                    Add billing contacts for your financing agreements
                </div>
                <div className="w-sm text-center text-sm mb-8">
                    You'll have the opportunity to add more billing contacts
                    later
                </div>
                <div className="px-8">
                    <Form layout="vertical">
                        <div className="flex flex-row gap-8">
                            <Form.Item
                                required
                                label="First name"
                            >
                                <Input
                                    placeholder="First name"
                                    variant="underlined"
                                    value={billing.first_name}
                                    onChange={(e) =>
                                        handleFormChange(
                                            "first_name",
                                            e.target.value
                                        )
                                    }
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                required
                                label="Last name"
                            >
                                <Input
                                    placeholder="Last name"
                                    variant="underlined"
                                    value={billing.last_name}
                                    onChange={(e) =>
                                        handleFormChange(
                                            "last_name",
                                            e.target.value
                                        )
                                    }
                                ></Input>
                            </Form.Item>
                        </div>
                        <div className="flex flex-row gap-8 mt-4">
                            <Form.Item
                                required
                                label="Title"
                            >
                                <Input
                                    placeholder="Title"
                                    variant="underlined"
                                    value={billing.title}
                                    onChange={(e) => {
                                        if (e) {
                                            handleFormChange(
                                                "title",
                                                e.target.value
                                            );
                                        }
                                    }}
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                required
                                label="Business email"
                            >
                                <Input
                                    placeholder="cache@mesa.com"
                                    variant="underlined"
                                    value={billing.email}
                                    onChange={(e) =>
                                        handleFormChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                ></Input>
                            </Form.Item>
                        </div>
                        <Form.Item
                            required
                            label="Business phone"
                        >
                            <Space direction="vertical">
                                <Input
                                    addonBefore={
                                        <Select
                                            style={{ width: 100 }}
                                            value={extension}
                                            onSelect={(e) => setExtension(e)}
                                        >
                                            <Option value="us">US +1</Option>
                                            <Option value="can">CAN +1</Option>
                                            <Option value="uk">UK +44</Option>
                                        </Select>
                                    }
                                    placeholder="Phone"
                                    variant="underlined"
                                    value={billing.phone}
                                    onChange={(e) => {
                                        if (e) {
                                            handleFormChange(
                                                "phone",
                                                e.target.value
                                            );
                                        }
                                    }}
                                ></Input>
                            </Space>
                        </Form.Item>
                        <Form.Item
                            required
                            label="Address"
                        >
                            <Input
                                variant="underlined"
                                value={billing.address}
                                onChange={(e) =>
                                    handleFormChange("address", e.target.value)
                                }
                            ></Input>
                        </Form.Item>
                    </Form>
                </div>
                <div className="flex flex-row justify-between w-100 mt-8">
                    <div></div>
                    <div className="">
                        <Button
                            type="text"
                            className=" text-sm"
                            onClick={handleClick}
                            disabled={!billing.email || !billing.phone}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
