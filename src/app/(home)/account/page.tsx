"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOrganization } from "../page";
import { Button, Form, Input, Table } from "antd";
import { Billing } from "@/src/app/lib/Types";
import { Account } from "@/src/app/lib/Account_types";
import BillingForm from "../applications/(applications)/(form components)/Billing";

export default function AccountPage() {
    const { primary_color, secondary_color, name, logo } = useOrganization();
    const [accountForm, setAccountForm] = useState<Account>();
    const [account, setAccount] = useState<Account>();
    useEffect(() => {
        const fetchAccount = async () => {
            const fetchedAccount = await axios.get("/api/account");
            console.log(fetchedAccount);
            setAccount(fetchedAccount.data);
            setAccountForm(fetchedAccount.data);
        };
        fetchAccount();
    }, []);
    const handleUpdateAccount = async () => {
        try {
            const updatedAccount = await axios.patch(
                "/api/account",
                accountForm
            );
            setAccount(updatedAccount.data);
        } catch (err) {}
    };
    const handleAccountChange = (
        key: string,
        value: string | number | null
    ) => {
        setAccount((accountValue: Account) => ({
            ...accountValue,
            [key]: value,
        }));
    };
    const [billingForm, setBillingForm] = useState<Billing[]>([]);
    const handleBillingChange = (billings: Billing[]) => {
        setBillingForm(billings);
    };
    const handleAddNewBilling = async () => {
        const billingList = [...(account?.billings || []), ...billingForm];
        try {
            const updatedAccount = await axios.patch("/api/account", {
                billings: billingList,
            });
            setAccount(updatedAccount.data);
        } catch (err) {}
    };
    const [billingDataSource, setBillingDataSource] = useState(
        account?.billings || []
    );
    const [billingSearchValue, setBillingSearchValue] = useState("");
    const handleSearch = (value: string) => {
        setBillingSearchValue(value);
        if (!value.length) {
            return setBillingDataSource(account?.billings || []);
        }
        setBillingDataSource(
            billingDataSource.filter(
                (billing) =>
                    billing.first_name.includes(value) ||
                    billing.last_name.includes(value) ||
                    billing.email.includes(value)
            )
        );
    };
    const billingColumns = [
        { title: "First name", dataIndex: "first_name", key: "first_name" },
        { title: "Last name", dataIndex: "last_name", key: "last_name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        { title: "Address", dataIndex: "address", key: "address" },
    ];
    return (
        <>
            {account ? (
                <div className="flex flex-col gap-8 py-9 mx-8">
                    <div className="text-5xl text-black font-semibold ">
                        Account
                    </div>
                    <div className="bg-white rounded-md shadow w-300">
                        <div className="text-2xl ml-4 mt-2">
                            Account information
                        </div>
                        <div className="text-md text-gray-500 ml-4 mt-2 ">
                            Update account information, changes will be
                            reflected across the platform.
                        </div>
                        <div className="flex flex-col m-4">
                            <Form layout="horizontal">
                                <div className="flex flex-row gap-8">
                                    <Form.Item
                                        label="First name"
                                        className="w-150"
                                    >
                                        <Input
                                            required
                                            placeholder="John"
                                            variant="underlined"
                                            value={accountForm?.first_name}
                                            onChange={(e) =>
                                                handleAccountChange(
                                                    "first_name",
                                                    e.target.value
                                                )
                                            }
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item
                                        label="Last name"
                                        className="w-150"
                                    >
                                        <Input
                                            required
                                            placeholder="Smith"
                                            variant="underlined"
                                            value={accountForm?.last_name}
                                            onChange={(e) =>
                                                handleAccountChange(
                                                    "last_name",
                                                    e.target.value
                                                )
                                            }
                                        ></Input>
                                    </Form.Item>
                                </div>
                                <div className="flex flex-row gap-8">
                                    <Form.Item
                                        label="Email"
                                        className="w-150"
                                    >
                                        <Input
                                            required
                                            placeholder="johnsmith@email.com"
                                            variant="underlined"
                                            type="email"
                                            value={accountForm?.email}
                                            onChange={(e) =>
                                                handleAccountChange(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone"
                                        className="w-150"
                                    >
                                        <Input
                                            required
                                            variant="underlined"
                                            type="phone"
                                            value={accountForm?.phone}
                                            onChange={(e) =>
                                                handleAccountChange(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                        ></Input>
                                    </Form.Item>
                                </div>
                                <Form.Item label="Address">
                                    <Input
                                        required
                                        variant="underlined"
                                        type="phone"
                                        value={accountForm?.address}
                                        onChange={(e) =>
                                            handleAccountChange(
                                                "address",
                                                e.target.value
                                            )
                                        }
                                    ></Input>
                                </Form.Item>
                            </Form>
                            <div className="flex flex-row justify-end mx-4">
                                <Button
                                    size="large"
                                    disabled={
                                        !accountForm?.email ||
                                        !accountForm?.first_name ||
                                        !accountForm?.last_name ||
                                        !accountForm?.phone
                                    }
                                    style={{
                                        background: primary_color,
                                        color: "white",
                                    }}
                                    onClick={handleUpdateAccount}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-md shadow w-300">
                        <div className="text-2xl ml-4 mt-2">
                            Billing contacts
                        </div>
                        <div className="text-md text-gray-500 ml-4 mt-2 ">
                            View all billing contacts or add a new contact to
                            the platform.
                        </div>
                        <div className="text-lg m-4">Add new contacts</div>
                        <div className="p-4">
                            <BillingForm
                                isAccount={true}
                                account={account}
                                existingBillings={account.billings ?? []}
                                handleSettingBilling={handleAddNewBilling}
                                color={secondary_color}
                            ></BillingForm>
                        </div>
                        <div className="flex flex-row justify-end mx-4">
                            <Button
                                size="large"
                                disabled={!billingForm.length}
                                style={{
                                    background: primary_color,
                                    color: "white",
                                }}
                                onClick={handleAddNewBilling}
                            >
                                Save contact(s)
                            </Button>
                        </div>
                        <div className="border-b-2 border-b-gray-200 mx-2 mt-4"></div>
                        <div className="text-lg m-4">
                            Current billing contacts
                        </div>
                        <div className="m-4">
                            {" "}
                            <Input
                                placeholder="Search contacts"
                                value={billingSearchValue}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                        <div className="m-4">
                            <Table
                                columns={billingColumns}
                                dataSource={billingDataSource}
                                pagination={{
                                    pageSize: 5,
                                    hideOnSinglePage: true,
                                }}
                            ></Table>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
