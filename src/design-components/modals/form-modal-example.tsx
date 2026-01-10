"use client";

import {
    Dialog,
    Modal,
    ModalOverlay,
} from "@/src/components/application/modals/modal";
import { Button } from "@/src/components/base/buttons/button";
import { CloseButton } from "@/src/components/base/buttons/close-button";
import { Input } from "@/src/components/base/input/input";
import { Select } from "@/src/components/base/select/select";
import React, { useState } from "react";

export default function FormModalExample({ sendResponse }) {
    const [applicationForm, setApplicationForm] = useState({
        type: "",
        title: "",
    });
    const setResponse = (response) => {
        sendResponse(response);
    };
    return (
        <>
            <Modal>
                <ModalOverlay isDismissable>
                    <Dialog>
                        <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                            <CloseButton
                                onClick={() => setResponse({})}
                                theme="light"
                                size="lg"
                                className="absolute top-3 right-3"
                            />
                            <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                <div className="z-10 flex flex-col gap-0.5">
                                    <AriaHeading
                                        slot="title"
                                        className="text-md font-semibold text-primary"
                                    >
                                        New application
                                    </AriaHeading>
                                    <p className="text-sm text-tertiary">
                                        Add a type and title to your application
                                        to begin.
                                    </p>
                                </div>
                                <div className="h-5 w-full" />
                                <div className="w-full border-t border-secondary" />
                                <div className="flex flex-row gap-4">
                                    <Select
                                        label="Application type"
                                        placeholder="Select type"
                                        value={applicationForm.type}
                                        onChange={(e) =>
                                            setApplicationForm({
                                                ...applicationForm,
                                                type: e?.toString,
                                            })
                                        }
                                    >
                                        <Select.Item id="1">
                                            CreditApplication
                                        </Select.Item>
                                    </Select>
                                    <Input
                                        label="Application title"
                                        placeholder="Mesa Credit Application Jan 2026"
                                        value={applicationForm.title}
                                        onChange={(e) =>
                                            setApplicationForm({
                                                ...applicationForm,
                                                title: e,
                                            })
                                        }
                                    ></Input>
                                </div>
                            </div>
                            <div className="relative flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:px-6 sm:pt-8 sm:pb-6">
                                <></>
                                <Button
                                    color="secondary"
                                    size="lg"
                                    onClick={() => setResponse({})}
                                    className="sm:ml-auto"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    size="lg"
                                    onClick={() => setResponse(applicationForm)}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                </ModalOverlay>
            </Modal>
        </>
    );
}
