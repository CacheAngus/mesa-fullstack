import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useRouter } from "next/router";

export function FormsList({
    color,
    items,
}: {
    color: string;
    items: {
        key: string;
        title: string;
        completed: boolean;
        description?: string;
        formType?: string;
        url?: string;
    }[];
}) {
    const handleAddForms = () => {};
    // const router = useRouter();
    const handleUpdate = (item: any) => {
        // router.push(item.url);
    };
    return (
        <>
            {items.map((item, index) => {
                return (
                    <>
                        <div
                            key={item.key}
                            className={
                                index !== items.length - 1
                                    ? "border-b-2 border-b-gray-200 flex flex-row items-start mb-4 px-4"
                                    : "flex flex-row items-start mb-4 px-4"
                            }
                        >
                            {item.completed ? (
                                <CheckCircleFilled
                                    className="pt-1.5 ml-2"
                                    style={{
                                        fontSize: "24px",
                                        color,
                                    }}
                                />
                            ) : (
                                <CheckCircleOutlined
                                    className="pt-1.5 ml-2"
                                    style={{
                                        fontSize: "24px",
                                        color,
                                    }}
                                />
                            )}
                            <div className="flex flex-row ml-4">
                                <div className="flex flex-col items-start w-75">
                                    <div className="text-lg">{item.title}</div>
                                    {item.description ? (
                                        <div className="text-md text-gray-300 mb-2">
                                            {item.description}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="flex flex-col w-200 items-end">
                                    {item.formType ? (
                                        <Button
                                            type="text"
                                            onClick={handleAddForms}
                                            style={{ color }}
                                        >
                                            Add form
                                        </Button>
                                    ) : (
                                        <Button
                                            type="text"
                                            onClick={() => handleUpdate(item)}
                                            style={{ color }}
                                        >
                                            Update
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                );
            })}
        </>
    );
}
