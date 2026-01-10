"use client";

import React from "react";
import { SlideoutMenu } from "@/src/components/application/slideout-menus/slideout-menu";
import { Button } from "@/src/components/base/buttons/button";
import { Plus } from "@untitledui/icons";

export const ItemDrawer = ({ sendResponse }) => {
    const setResponse = (response: boolean) => {
        sendResponse(response);
    };

    return (
        <SlideoutMenu.Trigger isOpen={true}>
            <SlideoutMenu
                isDismissable
                dialogClassName="gap-0"
            >
                <SlideoutMenu.Header
                    onClose={() => setResponse(false)}
                    className="relative flex w-full flex-col gap-5 p-4 pt-6 shadow-[0px_1px_0px_0px] shadow-border-secondary_alt md:pr-3 md:pl-6"
                >
                    <section className="flex flex-col gap-0.5">
                        <h1 className="text-md font-semibold text-primary md:text-lg">
                            Item name
                        </h1>
                    </section>
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <div className="relative flex min-h-53 w-full items-center justify-center overflow-hidden rounded-xl py-6 md:min-h-59.5">
                        <img
                            src="https://www.untitledui.com/application/card-mockup.webp"
                            alt="Card Mockup"
                            aria-hidden="true"
                            className="absolute inset-0 size-full object-cover"
                        />
                    </div>
                    <div>
                        <p>Description</p>
                    </div>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex w-full items-center justify-end gap-3">
                    <Button
                        size="md"
                        color="secondary"
                        onClick={() => setResponse(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        form="user-settings-form"
                        size="md"
                        iconLeading={Plus}
                        onClick={() => setResponse(true)}
                    >
                        Add
                    </Button>
                </SlideoutMenu.Footer>
            </SlideoutMenu>
        </SlideoutMenu.Trigger>
    );
};
