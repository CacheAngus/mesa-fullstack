"use client";

import { Signatory } from "@/src/app/lib/Types";
import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { Button } from "@/src/components/base/buttons/button";
import { Plus } from "@untitledui/icons";

export default function SignatoriesForm({
    existingSignatories,
    handleSettleSignatories,
    color,
}: {
    existingSignatories: Signatory[];
    handleSettleSignatories;
    color: string;
}) {
    const [signatoryItems, setSignatoryItems] = useState<(Signatory | {})[]>([
        {},
    ]);
    const handleSignatoryItemsChange = (
        key: string,
        value: string | number | null,
        index: number
    ) => {
        const newSignatories = signatoryItems.slice();
        newSignatories[index] = { ...signatoryItems[index], [key]: value };
        setSignatoryItems(newSignatories);
        handleSettleSignatories(signatoryItems);
    };
    const handleAddAnotherSignatory = () => {
        setSignatoryItems((signatories) => {
            return [...signatories, {}];
        });
    };
    const handleDeleteSignatories = (index: number) => {
        const remainingSignatories = signatoryItems.filter(
            (_item, filterIndex) => index !== filterIndex
        );
        setSignatoryItems(remainingSignatories);
    };
    const options = existingSignatories.map((signatory) => ({
        value: signatory.email,
        label: signatory.first_name,
    }));
    const handleSelectingSignatory = (signatoryId: string, index: number) => {
        const newSignatories = signatoryItems.slice();
        const existingSignatory = existingSignatories.find(
            (signatory) => signatoryId === signatory._id
        );
        if (existingSignatory) {
            newSignatories[index] = existingSignatory;
        }
        setSignatoryItems(newSignatories);
    };
    return (
        <>
            <div className="mt-4">
                Add authorized signers for your franchise operations
            </div>
            {signatoryItems.map((signatory, index) => (
                <>
                    <div className="bg-gray-200 rounded-md border border-gray-300 p-2 mb-4">
                        <div
                            className="text-xl mb-2"
                            style={{ color: color }}
                        >
                            Signatory #{index + 1}
                        </div>
                        <div className="flex flex-row gap-4 my-4">
                            <p> Set existing authorized signer?</p>
                            <Select
                                placeholder="Select existing signatory"
                                options={options}
                                style={{ width: "17%" }}
                                onChange={(e) =>
                                    handleSelectingSignatory(e, index)
                                }
                            ></Select>
                        </div>
                        <Form layout="vertical">
                            <div className="flex flex-row gap-8">
                                <FormItem
                                    label="First name"
                                    required
                                >
                                    <Input
                                        value={signatory.first_name}
                                        onChange={(e) =>
                                            handleSignatoryItemsChange(
                                                "first_name",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                                <FormItem label="Last name">
                                    <Input
                                        value={signatory.last_name}
                                        onChange={(e) =>
                                            handleSignatoryItemsChange(
                                                "last_name",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                            </div>
                            <div className="flex flex-row gap-8">
                                <FormItem
                                    label="Title"
                                    required
                                >
                                    <Input
                                        value={signatory.title}
                                        onChange={(e) =>
                                            handleSignatoryItemsChange(
                                                "title",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                                <FormItem
                                    label="Email"
                                    required
                                >
                                    <Input
                                        value={signatory.email}
                                        onChange={(e) =>
                                            handleSignatoryItemsChange(
                                                "email",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                            </div>
                        </Form>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => handleDeleteSignatories(index)}
                            >
                                <DeleteOutlined />
                            </Button>
                        </div>
                    </div>
                </>
            ))}
            <div className="my-4">
                <Button
                    style={{ background: color, color: "white" }}
                    onClick={handleAddAnotherSignatory}
                    iconLeading={Plus}
                >
                    Add authorized signer
                </Button>
            </div>
        </>
    );
}
