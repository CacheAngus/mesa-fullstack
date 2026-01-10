"use client";

import { Entity } from "@/src/app/lib/Types";
import { DeleteOutlined } from "@ant-design/icons";
import { Plus } from "@untitledui/icons";
import { Form, Input, Select } from "antd";
import { Button } from "@/src/components/base/buttons/button";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";

export default function LegalForm({
    existingLegalEntities,
    handleSettleEntities,
    color,
}: {
    existingLegalEntities: Entity[];
    handleSettleEntities;
    color: string;
}) {
    const [entitiyItems, setEntityItems] = useState<(Entity | {})[]>([{}]);
    const handleEntityItemsChange = (
        key: string,
        value: string | number | null,
        index: number
    ) => {
        const newEntities = entitiyItems.slice();
        newEntities[index] = { ...entitiyItems[index], [key]: value };
        setEntityItems(newEntities);
        handleSettleEntities(entitiyItems);
    };
    const handleAddAnotherEntity = () => {
        setEntityItems((entities) => {
            return [...entities, {}];
        });
    };
    const handleDeleteEntity = (index: number) => {
        const remainingEntities = entitiyItems.filter(
            (_item, filterIndex) => index !== filterIndex
        );
        setEntityItems(remainingEntities);
    };
    const options = existingLegalEntities.map((entity) => ({
        value: entity.name,
        label: entity.name,
    }));
    const handleSelectingEntity = (entityId: string, index: number) => {
        const newEntities = entitiyItems.slice();
        const existingEntity = existingLegalEntities.find(
            (entity) => entityId === entity._id
        );
        if (existingEntity) {
            newEntities[index] = existingEntity;
        }
        setEntityItems(newEntities);
    };
    const entityOptions = [{ value: "value1", label: "Type 1" }];
    const handleSelectingEntityType = (type: string, index: number) => {
        setEntityItems((entities) => {
            entities[index] = { ...entities[index], type };
            return entities;
        });
    };
    return (
        <>
            <div className="mt-4">
                Add authorized signers for your franchise operations
            </div>
            {entitiyItems.map((entity, index) => (
                <>
                    <div className="bg-gray-200 rounded-md border border-gray-300 p-2 mb-4">
                        <div
                            className="text-xl mb-2"
                            style={{ color: color }}
                        >
                            Legal Entity #{index + 1}
                        </div>
                        <div className="flex flex-row gap-4 my-4">
                            <p> Set existing legal entity?</p>
                            <Select
                                placeholder="Select existing entity"
                                options={options}
                                style={{ width: "20%" }}
                                onChange={(e) =>
                                    handleSelectingEntity(e, index)
                                }
                            ></Select>
                        </div>
                        <Form layout="vertical">
                            <div className="flex flex-row gap-8">
                                <FormItem
                                    label="Entity name"
                                    required
                                >
                                    <Input
                                        value={entity.name}
                                        onChange={(e) =>
                                            handleEntityItemsChange(
                                                "name",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                                <FormItem label="Entity type">
                                    <Select
                                        placeholder="Select type"
                                        style={{ width: "170%" }}
                                        options={entityOptions}
                                        value={entity.type}
                                        onChange={(e) =>
                                            handleSelectingEntityType(e, index)
                                        }
                                    ></Select>
                                </FormItem>
                            </div>
                            <div className="flex flex-row gap-8">
                                <FormItem
                                    label="EIN/Tax ID"
                                    required
                                >
                                    <Input
                                        value={entity.tax_id}
                                        onChange={(e) =>
                                            handleEntityItemsChange(
                                                "tax_id",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                                <FormItem
                                    label="State of Formation"
                                    required
                                >
                                    <Input
                                        value={entity.sof}
                                        onChange={(e) =>
                                            handleEntityItemsChange(
                                                "sof",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                            </div>
                        </Form>
                        <div className="flex justify-end">
                            <Button onClick={() => handleDeleteEntity(index)}>
                                <DeleteOutlined />
                            </Button>
                        </div>
                    </div>
                </>
            ))}
            <div className="my-4">
                <Button
                    style={{ background: color, color: "white" }}
                    onClick={handleAddAnotherEntity}
                    iconLeading={Plus}
                >
                    Add legal entity
                </Button>
            </div>
        </>
    );
}
