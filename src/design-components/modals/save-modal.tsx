"use client";

import {
    Dialog,
    Modal,
    ModalOverlay,
} from "@/src/components/application/modals/modal";
import { Button } from "@/src/components/base/buttons/button";
import { FeaturedIcon } from "@/src/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/src/components/shared-assets/background-patterns";
import React from "react";

export default function SaveModal({
    title,
    sendResponse,
    description,
    icon,
    cta,
    secondAction,
    iconColor,
}: {
    title: string;
    sendResponse;
    description: string;
    icon: string;
    cta: string;
    secondAction: string;
    iconColor: string;
}) {
    const setResponse = (response) => {
        sendResponse(response);
    };
    return (
        <>
            <Modal>
                <ModalOverlay isDismissable>
                    <Dialog>
                        {" "}
                        <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                            <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                {icon && (
                                    <div className="relative w-max">
                                        <FeaturedIcon
                                            color={iconColor}
                                            size="lg"
                                            theme="light"
                                            icon={icon}
                                        />

                                        <BackgroundPattern
                                            pattern="circle"
                                            size="sm"
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        />
                                    </div>
                                )}
                                <div className="z-10 flex flex-col gap-0.5">
                                    <AriaHeading
                                        slot="title"
                                        className="text-md font-semibold text-primary"
                                    >
                                        {title}
                                    </AriaHeading>
                                    {description && (
                                        <p className="text-sm text-tertiary max-sm:hidden">
                                            {description}
                                        </p>
                                    )}

                                    <p className="text-sm text-tertiary sm:hidden">
                                        This blog post has been published. Team
                                        members will be able to edit this post.
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:px-6 sm:pt-8 sm:pb-6">
                                <></>
                                {secondAction && (
                                    <Button
                                        color="secondary"
                                        size="lg"
                                        onClick={() => setResponse(false)}
                                        className="sm:ml-auto"
                                    >
                                        {secondAction}
                                    </Button>
                                )}
                                <Button
                                    color="primary"
                                    size="lg"
                                    onClick={() => setResponse(true)}
                                >
                                    {cta}
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                </ModalOverlay>
            </Modal>
        </>
    );
}
