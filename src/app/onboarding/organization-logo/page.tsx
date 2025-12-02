"use client";

import { useRouter } from "next/navigation";
import { Button, Input, Space, Upload } from "antd";
import { ChangeEvent, SetStateAction, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        // message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        // message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}

export default function OrganizationLogo() {
    const [logo, setLogo] = useState<Blob>();
    const router = useRouter();
    const handleClick = () => {
        // TODO convert file uploaded and save in cloud bucket, then save to the organization
        // then navigate to the next
        router.push("/welcome");
    };
    const handleBackClick = () => {
        router.push("/onboarding/organization-color");
    };
    const handleLogoChange = (info) => {
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => setLogo(imageUrl));
        }
    };
    return (
        <>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="w-sm text-center text-sm mb-4">
                    Upload the brand logo visible across the site
                </div>
                <div className="">
                    {logo ? (
                        <div className="flex flex-row justify-center items-center gap-4">
                            <img
                                src={URL.createObjectURL(logo)}
                                alt=""
                                style={{ height: 96, width: 96 }}
                            ></img>
                            <Button onClick={() => setLogo(undefined)}>
                                Remove
                            </Button>
                        </div>
                    ) : (
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleLogoChange}
                        >
                            <div>
                                <PlusOutlined type="plus" />
                                <div className="ant-upload-text">Upload</div>
                            </div>
                        </Upload>
                    )}
                </div>
                <div
                    className="flex flex-row justify-between w-100"
                    style={{ marginTop: !logo ? 36 : 0 }}
                >
                    <Button
                        type="text"
                        className=" text-sm"
                        onClick={handleBackClick}
                    >
                        Back
                    </Button>
                    <Button
                        type="text"
                        className=" text-sm"
                        onClick={handleClick}
                        disabled={!logo}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}
