"use client";

import { FileUpload } from "@/src/components/application/file-upload/file-upload-base";
import { SectionFooter } from "@/src/components/application/section-footers/section-footer";
import { SectionLabel } from "@/src/components/application/section-headers/section-label";
import { Avatar } from "@/src/components/base/avatar/avatar";
import { Button } from "@/src/components/base/buttons/button";
import { Checkbox } from "@/src/components/base/checkbox/checkbox";
import { Form } from "@/src/components/base/form/form";
import { InputBase, TextField } from "@/src/components/base/input/input";
import { Label } from "@/src/components/base/input/label";
import { TextEditor } from "@/src/components/base/text-editor/text-editor";
import React, { useState } from "react";
import { ColorPicker } from "react-aria-components";

export default function SettingForm({ settings, handleSettings }) {
    const handleSubmit = (e) => {
        const data = Object.fromEntries(new FormData(e.currentTarget));
        handleSettings(data);
    };
    const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
    const handleAvatarUpload = (file: File) => {
        console.log("File uploaded:", file);
        setUploadedAvatar(URL.createObjectURL(file));
    };
    const [color, setColor] = useState<string>("");
    const handleColor = (e, settingName) => {
        setColor(e);
        const settingIndex = settings.find(
            (setting) => (settingName = setting.name)
        );
        const udpatedSettings = settings;
        udpatedSettings[settingIndex] = {
            ...udpatedSettings[settingIndex],
            value: e,
        };
    };
    const [files, setFiles] = useState([]);
    function getSettingTypeSection(setting) {
        let settingSection = <></>;
        switch (setting.type) {
            case "color": {
                setColor(setting.value);
                settingSection = (
                    <div className="flex flex-row gap-2">
                        <ColorPicker
                            value={color}
                            onChange={(e) => handleColor(e, setting.name)}
                        />
                    </div>
                );
                break;
            }
            case "input": {
                settingSection = (
                    <TextField
                        isRequired
                        name={setting.name}
                        value={setting.value}
                    >
                        <Label className="lg:hidden">{setting.title}</Label>
                        <InputBase size="md" />
                    </TextField>
                );
                break;
            }
            case "text": {
                settingSection = (
                    <TextEditor.Root
                        limit={400}
                        className="gap-2"
                        inputClassName="min-h-70 p-4 resize-y"
                    >
                        <TextEditor.Toolbar
                            floating
                            type="simple"
                        />

                        <div className="flex flex-col gap-1.5">
                            <TextEditor.Content />
                            <TextEditor.HintText />
                        </div>
                    </TextEditor.Root>
                );
                break;
            }
            case "checkbox": {
                settingSection = (
                    <div className="flex flex-col">
                        {setting.values.map((settingvalue) => (
                            <Checkbox
                                name={setting.name}
                                label={settingvalue.name}
                                hint={settingvalue.description}
                                value={settingvalue.value}
                            ></Checkbox>
                        ))}
                    </div>
                );
                break;
            }
            case "file": {
                settingSection = (
                    <FileUpload.Root>
                        <FileUpload.DropZone />
                        <FileUpload.List>
                            {files.map((file) => (
                                <FileUpload.ListItemProgressBar
                                    key={file.name}
                                    {...file}
                                    size={file.size}
                                />
                            ))}
                        </FileUpload.List>
                    </FileUpload.Root>
                );
                break;
            }
            case "picture": {
                setUploadedAvatar(setting.value);
                settingSection = (
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <Avatar
                            size="2xl"
                            src={
                                uploadedAvatar ||
                                "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                            }
                        />
                        <FileUpload.DropZone
                            className="w-full"
                            onDropFiles={(files) =>
                                handleAvatarUpload(files[0])
                            }
                        />
                    </div>
                );
                break;
            }
        }
        return settingSection;
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    {settings.map((setting) => {
                        const settingType = getSettingTypeSection(setting);
                        return (
                            <>
                                {" "}
                                <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root
                                        isRequired
                                        size="sm"
                                        title={setting.title}
                                        description={setting.description}
                                        className="max-lg:hidden"
                                    />
                                    {settingType}
                                </div>
                                <hr className="h-px w-full border-none bg-border-secondary" />
                            </>
                        );
                    })}
                </div>
            </Form>
            <SectionFooter.Root>
                <SectionFooter.Actions>
                    <Button type="tertiary">Cancel</Button>
                    <Button type="submit">Save</Button>
                </SectionFooter.Actions>
            </SectionFooter.Root>
        </>
    );
}
