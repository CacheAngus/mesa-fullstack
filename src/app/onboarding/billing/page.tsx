"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { ContactForm } from "@/src/design-components/forms/contact-form";
import { Billing } from "../../lib/Types";

export default function BillingOnboarding() {
    const account = useSearchParams().get("account");
    const [billing, setBilling] = useState<{
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: number;
        title?: string;
        address?: string;
    }>({});
    const handleFormChange = (form: Billing) => {
        setBilling(form);
    };
    const router = useRouter();
    const handleClick = async () => {
        await axios.patch(`/api/account/${account}`, { billings: [billing] });
        router.push(`/onboarding/franchise?account=${account}`);
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
                <div className="px-4">
                    <ContactForm
                        formSubmit={handleFormChange}
                        title={true}
                    />
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
