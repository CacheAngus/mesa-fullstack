"use client";

import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useOrganization } from "../../page";
import { useSearchParams, useParams } from "next/navigation";
import CreditApplication from "../(applications)/(credit)/CreditApplication";
import type { Application } from "@/src/app/lib/Application_types";
import axios from "axios";
import { Account } from "@/src/app/lib/Account_types";

export default function Application() {
    const { primary_color, secondary_color, name, logo } = useOrganization();
    const searchParams = useSearchParams();
    const applicationId = useParams().applicationId;
    const [application, setApplication] = useState<Application>();
    useEffect(() => {
        const fetchApplication = async () => {
            const fetchedApplication = await axios.get(
                `api/application/${applicationId}`
            );
            setApplication(fetchedApplication.data);
        };
        fetchApplication();
    }, []);
    const [userAccount, setUserAccount] = useState<Account>();
    useEffect(() => {
        const fetchAccount = async () => {
            const res = await fetch("http://localhost:3000/api/accounts");
            const fetchedAccount = await res.json();
            setUserAccount(fetchedAccount);
        };
        fetchAccount();
    }, []);
    const [isEdit, setIsEdit] = useState(Boolean(searchParams.get("isEdit")));
    const handleEdit = () => {
        setIsEdit(true);
    };
    let display;
    const type = searchParams.get("type");
    switch (type) {
        case "credit": {
            display = (
                <>
                    <CreditApplication
                        isEdit={isEdit}
                        application={application}
                        color={primary_color}
                        userAccount={userAccount}
                    />
                </>
            );
            break;
        }
        default: {
            display = (
                <>
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-md shadow w-300">
                            <div className="p-4 text-2xl"> Financial </div>
                            <div className="p-4">Information</div>
                        </div>
                        <div className="bg-white rounded-md shadow w-300">
                            <div className="p-4 text-2xl">
                                Contact information
                            </div>
                            <div className="p-4">Information</div>
                        </div>
                    </div>
                </>
            );
        }
    }
    return (
        <>
            <div className="flex flex-col gap-8 py-9 mx-8">
                <div className="text-5xl text-black font-semibold ">
                    {application?.name}
                </div>
                {isEdit ? (
                    <>
                        <div>{display}</div>
                    </>
                ) : (
                    <>
                        <div className="bg-white rounded-md shadow w-300">
                            <div className="flex flex-row justify-end items-end mt-2">
                                <Button
                                    className="mr-4"
                                    style={{
                                        background: primary_color,
                                        color: "white",
                                    }}
                                    onClick={handleEdit}
                                >
                                    Edit
                                </Button>
                            </div>
                            <div className="m-4">{display}</div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
