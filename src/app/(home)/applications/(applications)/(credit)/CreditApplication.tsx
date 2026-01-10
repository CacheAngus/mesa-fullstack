"use client";

import { Button, Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import BillingForm from "../(form components)/Billing";
import RestaurantForm from "../(form components)/Restaurant";
import SignatoriesForm from "../(form components)/Signatories";
import LegalForm from "../(form components)/Legal";
import { Account, BaseAccount } from "@/src/app/lib/Account_types";
import axios from "axios";
import { Entity, Signatory, Store } from "@/src/app/lib/Types";
import { Application } from "@/src/app/lib/Application_types";
import { ContactForm } from "@/src/design-components/forms/contact-form";

export default function CreditApplication({
    application,
    isEdit,
    color,
    userAccount,
}: {
    isEdit: boolean;
    application: Application | undefined;
    userAccount: Account;
    color: string;
}) {
    const [account, setAccount] = useState<Account>({});
    const handleAccountChange = (form: BaseAccount) => {
        setAccount(form);
    };
    const handleUseAccount = (checked: RadioChangeEvent) => {
        if (checked.target.value) {
            setAccount(userAccount);
        } else {
            setAccount({});
        }
    };
    const [extension, setExtension] = useState("can");
    const existingBilling = userAccount?.billings ?? [];
    const [billing, setBilling] = useState<BaseAccount[]>([]);
    const handleSettleBilling = (billingItems: BaseAccount[]) => {
        setBilling(billingItems);
    };
    const existingRestaurants = userAccount?.stores ?? [];
    const [restaurants, setRestaurants] = useState<Store[]>([]);
    const handleSettleRestaurant = (restaurantItems: Store[]) => {
        setRestaurants(restaurantItems);
    };
    const existingSignatories = userAccount?.signatories ?? [];
    const [signatories, setSignatories] = useState<Signatory[]>([]);
    const handleSettleSignatories = (signatories: Signatory[]) => {
        setSignatories(signatories);
    };
    const existingEntities = userAccount?.entities ?? [];
    const [entities, setEntities] = useState<Entity[]>([]);
    const handleSettleEntities = (entities: Entity[]) => {
        setEntities(entities);
    };
    const handleUpdate = async (status: string) => {
        let form = {};
        form.status = status;
        try {
            const response = axios.patch(
                `/api/application/${application?._id}`,
                {
                    form,
                }
            );
        } catch {}
    };
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="bg-white rounded-md shadow w-300">
                    <div className="px-4">
                        <div className=" text-2xl"> Contact information </div>
                        <div className="my-4">
                            Provide your primary contact information. Select
                            existing information or add new.
                        </div>
                        <div className="bg-gray-200 rounded-md border border-gray-300 p-2 mb-4">
                            <div className="flex flex-row gap-4 my-4">
                                <p> Use your contact information?</p>
                                <Radio onChange={handleUseAccount}></Radio>
                            </div>
                            <div className="px-4">
                                <ContactForm
                                    formSubmit={handleAccountChange}
                                    values={account}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow w-300">
                    <div className="px-4">
                        <div className="text-2xl mt-4">Billing information</div>
                        {isEdit ? (
                            <BillingForm
                                account={userAccount}
                                existingBillings={existingBilling}
                                handleSettingBilling={handleSettleBilling}
                                color={color}
                                isAccount={true}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-md shadow w-300">
                    <div className="px-4">
                        <div className="text-2xl mt-4">
                            {" "}
                            Restaurant information{" "}
                        </div>
                        {isEdit ? (
                            <RestaurantForm
                                existingRestaurants={existingRestaurants}
                                handleSettleRestaurant={handleSettleRestaurant}
                                color={color}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-md shadow w-300">
                    <div className="px-4">
                        <div className="text-2xl mt-4">
                            {" "}
                            Authorized signatories{" "}
                        </div>
                        {isEdit ? (
                            <SignatoriesForm
                                existingSignatories={existingSignatories}
                                handleSettleSignatories={
                                    handleSettleSignatories
                                }
                                color={color}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-md shadow w-300">
                    <div className="px-4">
                        <div className=" text-2xl mt-4"> Legal entities </div>
                        {isEdit ? (
                            <LegalForm
                                existingLegalEntities={existingEntities}
                                handleSettleEntities={handleSettleEntities}
                                color={color}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-end gap-4 w-300 mt-8">
                <Button
                    type="text"
                    onClick={() => handleUpdate("draft")}
                >
                    Draft
                </Button>
                <Button
                    style={{ color: "white", background: color }}
                    onClick={() => handleUpdate("active")}
                >
                    Submit
                </Button>
            </div>
        </>
    );
}
