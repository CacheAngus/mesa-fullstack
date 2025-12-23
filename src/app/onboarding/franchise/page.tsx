"use client";

import { useRouter } from "next/navigation";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import React, { createContext, useContext, useState } from "react";
const { Option } = Select;

const AccountContext = createContext();
export const useAccount = () => useContext(AccountContext);

export default function AccountOnboarding() {
    // todo set as global var
    const [franchises, setFranchise] = useState<
        {
            name?: string;
            number?: number;
            address?: string;
        }[]
    >([{ address: "" }]);
    const handleFormChange = (
        key: string,
        value: string | number,
        index: number
    ) => {
        setFranchise(() => {
            franchises[index] = { ...franchises[index], [key]: value };
            return franchises;
        });
    };
    const router = useRouter();

    // set state variable for account
    const handleClick = () => {
        // TODO save any updated organization name
        // then navigate to the next
        router.push("/onboarding/credit-info");
    };
    return (
        <>
            <div className="flex flex-col items-center h-150 overflow-auto">
                <div className="text-black font-inter text-2xl font-bold my-4">
                    Franchise information
                </div>
                <div className="w-sm text-center text-sm mb-4">
                    Let's start with adding restaurants to your account.
                </div>
                <div className="w-sm text-center text-sm mb-8">
                    You'll be able to add and assign the legal entities for each
                    store in a later step
                </div>
                <div className="px-8">
                    {1 < franchises.length ? (
                        <>
                            {franchises.map((franchise, index) => (
                                <>
                                    <div
                                        className="mb-4"
                                        style={{
                                            borderBottom:
                                                index + 1 !== franchises.length
                                                    ? "1px dotted grey"
                                                    : "none",
                                        }}
                                    >
                                        <Form layout="vertical">
                                            <div className="flex flex-row gap-8">
                                                <Form.Item
                                                    required
                                                    label="Store name"
                                                >
                                                    <Input
                                                        placeholder="Name"
                                                        variant="underlined"
                                                        value={franchise.name}
                                                        onChange={(e) =>
                                                            handleFormChange(
                                                                "name",
                                                                e.target.value,
                                                                index
                                                            )
                                                        }
                                                    ></Input>
                                                </Form.Item>
                                                <Form.Item
                                                    required
                                                    label="Store number"
                                                >
                                                    <Input
                                                        placeholder="Number"
                                                        variant="underlined"
                                                        value={franchise.number}
                                                        onChange={(e) =>
                                                            handleFormChange(
                                                                "number",
                                                                e.target.value,
                                                                index
                                                            )
                                                        }
                                                    ></Input>
                                                </Form.Item>
                                            </div>
                                            <Form.Item
                                                required
                                                label="Address"
                                            >
                                                <Input
                                                    placeholder="Address"
                                                    variant="underlined"
                                                    value={franchise.address}
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            "address",
                                                            e.target.value,
                                                            index
                                                        )
                                                    }
                                                ></Input>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </>
                            ))}
                        </>
                    ) : (
                        <>
                            <Form layout="vertical">
                                <div className="flex flex-row gap-8">
                                    <Form.Item
                                        required
                                        label="Store name"
                                    >
                                        <Input
                                            placeholder="Name"
                                            variant="underlined"
                                            value={franchises[0].name}
                                            onChange={(e) =>
                                                handleFormChange(
                                                    "name",
                                                    e.target.value,
                                                    0
                                                )
                                            }
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item
                                        required
                                        label="Store number"
                                    >
                                        <Input
                                            placeholder="Number"
                                            variant="underlined"
                                            value={franchises[0].number}
                                            onChange={(e) =>
                                                handleFormChange(
                                                    "number",
                                                    e.target.value,
                                                    0
                                                )
                                            }
                                        ></Input>
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    required
                                    label="Address"
                                >
                                    <Input
                                        placeholder="Address"
                                        variant="underlined"
                                        value={franchises[0].address}
                                        onChange={(e) =>
                                            handleFormChange(
                                                "address",
                                                e.target.value,
                                                0
                                            )
                                        }
                                    ></Input>
                                </Form.Item>
                            </Form>
                        </>
                    )}
                    <div>
                        <Button
                            style={{
                                background: "#B71A2E",
                                color: "white",
                            }}
                            onClick={() =>
                                setFranchise((value) => {
                                    return [
                                        ...value,
                                        { number: 0, address: "" },
                                    ];
                                })
                            }
                        >
                            + Add store
                        </Button>
                    </div>
                </div>
                <div className="flex flex-row justify-between w-100 mt-8">
                    <div></div>
                    <div className="mb-4">
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
