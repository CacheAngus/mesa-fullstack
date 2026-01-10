"use client";

import React, { useState } from "react";
import { Input, InputBase } from "@/src/components/base/input/input";
import { InputGroup } from "@/src/components/base/input/input-group";
import { NativeSelect } from "@/src/components/base/select/select-native";
import { BaseAccount } from "@/src/app/lib/Account_types";

export function ContactForm({
    formSubmit,
    title,
    values,
}: {
    formSubmit;
    title?: boolean;
    values?: BaseAccount;
}) {
    const baseForm = values ?? {
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        title: "",
        phone: "",
    };
    const [form, setForm] = useState<BaseAccount>(baseForm);
    const handleFormChange = (key: string, value: string | number) => {
        let formValue = value;
        if ("phone" === key) {
            // todo handle phone number
        }
        const previousForm = form;
        const values = { ...previousForm, [key]: formValue };
        setForm(values);
        if (isFormValid(form, previousForm)) {
            formSubmit(form);
        }
    };
    const [isInvalid, setInvalid] = useState({
        first_name: false,
        last_name: false,
        email: false,
        address: false,
        title: false,
        phone: false,
    });
    function isFormValid(form: BaseAccount, previousForm: BaseAccount) {
        let isFormValid = true;
        for (const label of Object.keys(isInvalid)) {
            if (!form[label] && previousForm[label]) {
                const invalid = { ...isInvalid, [label]: true };
                setInvalid(invalid);
                isFormValid = false;
            } else {
                const invalid = { ...isInvalid, [label]: false };
                setInvalid(invalid);
                isFormValid = isFormValid && true;
            }
        }
        return isFormValid;
    }
    return (
        <>
            <div className="flex flex-row gap-2 mb-2">
                <Input
                    isRequired
                    label="First name"
                    isInvalid={isInvalid["first_name"]}
                    placeholder="Cache"
                    value={form["first_name"]}
                    onChange={(e) => handleFormChange("first_name", e)}
                ></Input>
                <Input
                    isRequired
                    label="Last name"
                    isInvalid={isInvalid["last_name"]}
                    placeholder="Angus"
                    value={form["last_name"]}
                    onChange={(e) => handleFormChange("last_name", e)}
                ></Input>
            </div>
            <div className="flex flex-row gap-2 mb-2">
                <Input
                    isRequired
                    label="Business email"
                    isInvalid={isInvalid["email"]}
                    placeholder="cache@mesa.com"
                    value={form["email"]}
                    onChange={(e) => handleFormChange("email", e)}
                ></Input>
                <InputGroup
                    isRequired
                    label="Business phone"
                    isInvalid={isInvalid["phone"]}
                    leadingAddon={
                        <NativeSelect
                            aria-label="Country"
                            options={[
                                { value: "US", label: "US" },
                                { value: "CA", label: "CA" },
                                { value: "EU", label: "EU" },
                            ]}
                        />
                    }
                    value={form["phone"]}
                    onChange={(e) => handleFormChange("phone", e)}
                >
                    <InputBase type="tel" />
                </InputGroup>
            </div>
            {title && (
                <div className="flex flex-row gap-2 mb-2">
                    <Input
                        isRequired
                        label="Title"
                        isInvalid={isInvalid["title"]}
                        value={form["title"]}
                        onChange={(e) => handleFormChange("title", e)}
                    ></Input>
                    <div></div>
                </div>
            )}

            <Input
                isRequired
                label="Address"
                isInvalid={isInvalid["address"]}
                value={form["address"]}
                onChange={(e) => handleFormChange("address", e)}
            ></Input>
        </>
    );
}
