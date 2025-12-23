"use client";

import { useRouter } from "next/navigation";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import React, { createContext, useContext, useState } from "react";
import { BaseAccount } from "../../lib/Account_types";
import axios from "axios";
const { Option } = Select;

const AccountContext = createContext();
export const useAccount = () => useContext(AccountContext);

export default function AccountOnboarding() {
    // todo set as global var
    const [account, setAccount] = useState<BaseAccount>({});
    const handleFormChange = (key: string, value: string | number) => {
        setAccount((values) => {
            return { ...values, [key]: value };
        });
    };
    const [extension, setExtension] = useState("can");
    const router = useRouter();

    // set state variable for account
    const handleClick = async () => {
        try {
            const createdAccount = await axios.post("/api/account", {
                ...account,
                franchise_name: "Jack-in-the-Box",
                extension: extension,
            });
            console.log(createdAccount);
            router.push("/onboarding/billing");
        } catch {}
    };
    return (
        <>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="text-black font-inter text-2xl font-bold my-4">
                    Account information
                </div>
                <div className="w-sm text-center text-sm mb-4">
                    Tell us a little about yourself
                </div>
                <div className="w-sm text-center text-sm mb-8">
                    You'll have the opportunity to add authorized signers and
                    billing contacts shortly
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
                                    value={account.first_name}
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
                                    value={account.last_name}
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
                                    value={account.title}
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
                                    value={account.email}
                                    onChange={(e) =>
                                        handleFormChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                ></Input>
                            </Form.Item>
                        </div>
                        <div className="flex flex-row gap-8 mt-4">
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
                                                onSelect={(e) =>
                                                    setExtension(e)
                                                }
                                            >
                                                <Option value="us">
                                                    US +1
                                                </Option>
                                                <Option value="can">
                                                    CAN +1
                                                </Option>
                                                <Option value="uk">
                                                    UK +44
                                                </Option>
                                            </Select>
                                        }
                                        placeholder="Phone"
                                        variant="underlined"
                                        value={account.phone}
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
                        </div>
                        <Form.Item
                            required
                            label="Address"
                        >
                            <Input
                                variant="underlined"
                                value={account.address}
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
                            disabled={!account.email || !account.phone}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
