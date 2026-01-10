"use client";

import { Account } from "@/src/app/lib/Account_types";
import { Billing } from "@/src/app/lib/Types";
import { DeleteOutlined } from "@ant-design/icons";
import { Plus } from "@untitledui/icons";
import {
    Form,
    Input,
    InputNumber,
    Radio,
    RadioChangeEvent,
    Select,
} from "antd";
import { Button } from "@/src/components/base/buttons/button";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";

const { Option } = Select;

export default function BillingForm({
    account,
    existingBillings,
    isAccount = false,
    handleSettingBilling,
    color,
}: {
    account: Account;
    existingBillings: Billing[];
    handleSettingBilling;
    isAccount: boolean;
    color: string;
}) {
    const [extension, setExtension] = useState("can");
    const [billingItems, setBillingItems] = useState<(Billing | {})[]>([{}]);
    const handleBillingItemsChange = (
        key: string,
        value: string | number | null,
        index: number
    ) => {
        const newBillings = billingItems.slice();
        newBillings[index] = { ...billingItems[index], [key]: value };
        setBillingItems(newBillings);
        handleSettingBilling(billingItems);
    };
    const handleAddAnotherBillingContact = () => {
        setBillingItems((billingitems) => {
            return [...billingItems, {}];
        });
    };
    const handleDeleteBilling = (index: number) => {
        const remainingBillings = billingItems.filter(
            (_item, filterIndex) => index !== filterIndex
        );
        setBillingItems(remainingBillings);
    };
    const handleSetSelf = (checked: RadioChangeEvent) => {
        if (checked.target.checked) {
            if (1 === billingItems.length)
                setBillingItems([
                    {
                        first_name: account.first_name,
                        last_name: account.last_name,
                        email: account.email,
                        phone: account.phone,
                        address: account.address,
                    },
                ]);
        } else {
            setBillingItems((billingitems) =>
                billingitems.filter((item) => item._id !== account._id)
            );
        }
    };
    return (
        <>
            {isAccount ? (
                <></>
            ) : (
                <>
                    <div className="my-4">
                        Add billing contacts for your financing agreements
                    </div>
                    <div className="flex flex-row gap-4 mb-4">
                        <p> Use yourself as a billing contact?</p>
                        <Radio onChange={handleSetSelf}></Radio>
                    </div>
                </>
            )}

            {billingItems.map((billingItem, index) => (
                <>
                    <div className="bg-gray-200 rounded-md border border-gray-300 p-2 mb-4">
                        <div
                            className="text-xl mb-2"
                            style={{ color: color }}
                        >
                            Contact #{index + 1}
                        </div>
                        <Form layout="vertical">
                            <div className="flex flex-row gap-8">
                                <FormItem
                                    label="First name"
                                    required
                                >
                                    <Input
                                        value={billingItem.first_name}
                                        onChange={(e) =>
                                            handleBillingItemsChange(
                                                "first_name",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                                <FormItem
                                    label="Last name"
                                    required
                                >
                                    <Input
                                        value={billingItem.last_name}
                                        onChange={(e) =>
                                            handleBillingItemsChange(
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
                                    label="Email"
                                    required
                                >
                                    <Input
                                        value={billingItem.email}
                                        onChange={(e) =>
                                            handleBillingItemsChange(
                                                "email",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                                <FormItem
                                    label="Phone"
                                    required
                                >
                                    <InputNumber
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
                                        value={billingItem.phone}
                                        onChange={(e) =>
                                            handleBillingItemsChange(
                                                "phone",
                                                e,
                                                index
                                            )
                                        }
                                    ></InputNumber>
                                </FormItem>
                            </div>
                            <FormItem
                                label="Address"
                                required
                            >
                                <Input
                                    style={{ width: "70%" }}
                                    value={billingItem.address}
                                    onChange={(e) =>
                                        handleBillingItemsChange(
                                            "address",
                                            e.target.value,
                                            index
                                        )
                                    }
                                ></Input>
                            </FormItem>
                        </Form>
                        <div className="flex justify-end">
                            <Button onClick={() => handleDeleteBilling(index)}>
                                <DeleteOutlined />
                            </Button>
                        </div>
                    </div>
                </>
            ))}
            <div className="my-4">
                <Button
                    style={{ background: color, color: "white" }}
                    onClick={handleAddAnotherBillingContact}
                    iconLeading={Plus}
                >
                    Add billing contact
                </Button>
            </div>
        </>
    );
}
