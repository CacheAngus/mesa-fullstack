"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button, Upload } from "antd";
import React, { useState } from "react";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

export default function DocumentsOnboarding() {
    const account = useSearchParams().get("account");
    const [documentList, setDocumentList] = useState<{
        franchise_info?: { name: string };
        account_info?: { name: string };
        finance_info?: { name: string };
    }>({});
    const router = useRouter();

    const handleChange = (info, type) => {
        if ("done" === info.file.status) {
            setDocumentList({ ...documentList, [type]: info.file });
        }
    };
    const handleDelete = (type) => {
        setDocumentList({ ...documentList, [type]: {} });
    };
    const handleClick = () => {
        // TODO save any updated organization name
        // then navigate to the next
        router.push("/applications");
    };
    const upload = (type: string) => {
        return (
            <Upload onChange={(e) => handleChange(e, type)}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        );
    };
    return (
        <>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="text-black font-inter text-2xl font-bold my-4">
                    Documents
                </div>
                <div className="w-sm text-center text-sm mb-8">
                    Upload additional relevant documents prior to creating
                    applications
                </div>
                <div className="flex flex-row gap-8 mb-8">
                    <div>Account info:</div>
                    <div>
                        {documentList.account_info?.name ??
                            upload("account_info")}
                    </div>
                    <div>
                        {documentList.account_info?.name ? (
                            <DeleteOutlined
                                onClick={() => handleDelete("account_info")}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="flex flex-row gap-8 mb-8">
                    <div>Finance info:</div>
                    <div>
                        {documentList.finance_info?.name ??
                            upload("finance_info")}
                    </div>
                    <div>
                        {documentList.finance_info?.name ? (
                            <DeleteOutlined
                                onClick={() => handleDelete("finance_info")}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="flex flex-row justify-between gap-8">
                    <div>Franchise info:</div>
                    <div>
                        {documentList.franchise_info?.name ??
                            upload("franchise_info")}
                    </div>
                    <div>
                        {documentList.franchise_info?.name ? (
                            <DeleteOutlined
                                onClick={() => handleDelete("franchise_info")}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="flex flex-row justify-end w-100 mt-8">
                    <Button
                        type="text"
                        className=" text-sm"
                        onClick={handleClick}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}
