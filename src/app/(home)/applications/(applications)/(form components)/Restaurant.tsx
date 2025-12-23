"use client";

import { Store } from "@/src/app/lib/Types";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";

export default function RestaurantForm({
    existingRestaurants,
    handleSettleRestaurant,
    color,
}: {
    existingRestaurants: Store[];
    handleSettleRestaurant;
    color: string;
}) {
    const [restaurantItems, setRestaurantItems] = useState<(Store | {})[]>([
        {
            franchise_name: "",
            franchise_number: undefined,
            address: "",
        },
    ]);
    const handleRestaurantItemsChange = (
        key: string,
        value: string | number,
        index: number
    ) => {
        const newRestaurants = restaurantItems.slice();
        newRestaurants[index] = { ...restaurantItems[index], [key]: value };
        setRestaurantItems(newRestaurants);
        handleSettleRestaurant(restaurantItems);
    };
    const handleAddAnotherRestaurant = () => {
        setRestaurantItems((restaurants) => {
            return [...restaurants, {}];
        });
    };
    const handleDeleteRestaurant = (index: number) => {
        const remainingRestaurants = restaurantItems.filter(
            (_item, filterIndex) => index !== filterIndex
        );
        setRestaurantItems(remainingRestaurants);
    };
    const options = existingRestaurants.map((restaurant) => ({
        value: restaurant.franchise_number,
        label: restaurant.franchise_name,
    }));
    const handleSelectingRestaurant = (restaurantId: string, index: number) => {
        const newrestaurants = restaurantItems.slice();
        const existingStore = existingRestaurants.find(
            (restaurant) => restaurantId === restaurant._id
        );
        if (existingStore) {
            newrestaurants[index] = existingStore;
        }
        setRestaurantItems(newrestaurants);
    };
    return (
        <>
            <div className="my-4">
                Add information for each of your locations
            </div>
            {restaurantItems.map((restaurant, index) => (
                <>
                    <div className="bg-gray-200 rounded-md border border-gray-300 p-2 mb-4">
                        <div
                            className="text-xl mb-2"
                            style={{ color: color }}
                        >
                            Store #{index + 1}
                        </div>
                        <div className="flex flex-row gap-4 my-4">
                            <p> Set existing store?</p>
                            <Select
                                placeholder="Select existing store"
                                style={{ width: "25%" }}
                                options={options}
                                onChange={(e) =>
                                    handleSelectingRestaurant(e, index)
                                }
                            ></Select>
                        </div>
                        <Form layout="vertical">
                            <div className="flex flex-row gap-8">
                                <FormItem
                                    label="Store name"
                                    required
                                >
                                    <Input
                                        placeholder="Name"
                                        value={restaurant.franchise_name}
                                        onChange={(e) =>
                                            handleRestaurantItemsChange(
                                                "franchise_name",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                                <FormItem label="Store number">
                                    <Input
                                        placeholder="Number"
                                        value={restaurant.franchise_number}
                                        onChange={(e) =>
                                            handleRestaurantItemsChange(
                                                "franchise_number",
                                                e.target.value,
                                                index
                                            )
                                        }
                                    ></Input>
                                </FormItem>
                            </div>
                            <FormItem
                                label="Address"
                                required
                            >
                                <Input
                                    placeholder="Address"
                                    style={{ width: "70%" }}
                                    value={restaurant.address}
                                    onChange={(e) =>
                                        handleRestaurantItemsChange(
                                            "address",
                                            e.target.value,
                                            index
                                        )
                                    }
                                ></Input>
                            </FormItem>
                        </Form>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => handleDeleteRestaurant(index)}
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
                    onClick={handleAddAnotherRestaurant}
                >
                    + Add store
                </Button>
            </div>
        </>
    );
}
