"use client";

import { useRouter } from "next/navigation";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import React, { createContext, useContext, useState } from "react";
import { BaseAccount } from "../../lib/Account_types";
import axios from "axios";
import { ContactForm } from "@/src/design-components/forms/contact-form";
const { Option } = Select;

const AccountContext = createContext();
export const useAccount = () => useContext(AccountContext);

export default function AccountOnboarding() {
    // todo set as global var
    const [account, setAccount] = useState<BaseAccount>({});
    const handleFormChange = (form: BaseAccount) => {
        setAccount(form);
    };
    const router = useRouter();
    const handleClick = async (e) => {
        try {
            const createdAccount = await axios.post("/api/account", {
                ...account,
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
                <div className="px-4">
                    <ContactForm formSubmit={handleFormChange} />
                </div>
                <div className="flex flex-row justify-between w-100 mt-8">
                    <div></div>
                    <div className="">
                        <Button
                            type="text"
                            className=" text-sm"
                            onClick={handleClick}
                            disabled={
                                !account.email ||
                                !account.phone ||
                                !account.first_name ||
                                !account.last_name ||
                                !account.address
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
