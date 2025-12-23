"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";
import axios from "axios";

export default function CreditInfoOnboarding() {
    const account = useSearchParams().get("account");
    const [creditInfo, setCreditInfo] = useState<{
        name?: string;
        type?: string;
        tax_id?: number;
        sof?: string;
    }>({});
    const handleFormChange = (key: string, value: string | number) => {
        setCreditInfo((values) => {
            return { ...values, [key]: value };
        });
    };
    const router = useRouter();
    const handleClick = async () => {
        await axios.patch(`/api/account/${account}`, {
            entities: [creditInfo],
        });
        router.push(`/onboarding/documents?account=${account}`);
    };
    const entityOptions = [{ value: "value1", label: "Type 1" }];
    const handleSelectingEntityType = (type: string) => {
        setCreditInfo((entities) => {
            return { ...entities, type };
        });
    };
    return (
        <>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="text-black font-inter text-2xl font-bold my-4">
                    Credit information
                </div>
                <div className="w-sm text-center text-sm mb-8">
                    Now we'll request your legal entity details.You have have
                    the ability to add more later.
                </div>
                <div className="px-8">
                    <Form layout="vertical">
                        <div className="flex flex-row gap-8 mt-4">
                            <Form.Item
                                required
                                label="Entity name"
                            >
                                <Input
                                    style={{ width: "80%" }}
                                    placeholder="Name"
                                    variant="underlined"
                                    value={creditInfo.name}
                                    onChange={(e) =>
                                        handleFormChange("name", e.target.value)
                                    }
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                required
                                label="Entity type"
                            >
                                <Select
                                    placeholder="Select type"
                                    style={{ width: "120%" }}
                                    options={entityOptions}
                                    value={creditInfo.type}
                                    onChange={(e) =>
                                        handleSelectingEntityType(e)
                                    }
                                ></Select>
                            </Form.Item>
                        </div>
                        <div className="flex flex-row gap-8 mt-4">
                            <Form.Item
                                required
                                label="EIN/Tax ID"
                            >
                                <InputNumber
                                    style={{ width: "80%" }}
                                    placeholder="EIN"
                                    variant="underlined"
                                    value={creditInfo.tax_id}
                                    onChange={(e) => {
                                        if (e) {
                                            handleFormChange("tax_id", e);
                                        }
                                    }}
                                ></InputNumber>
                            </Form.Item>
                            <Form.Item
                                required
                                label="State of Formation"
                            >
                                <Input
                                    style={{ width: "80%" }}
                                    placeholder="SOF"
                                    variant="underlined"
                                    value={creditInfo.sof}
                                    onChange={(e) =>
                                        handleFormChange(
                                            "account_number",
                                            e.target.value
                                        )
                                    }
                                ></Input>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className="flex flex-row justify-between w-100 mt-8">
                    <div></div>
                    <div className="">
                        <Button
                            type="text"
                            className=" text-sm"
                            onClick={handleClick}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
