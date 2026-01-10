import { useState } from "react";
import type { Key } from "react-aria-components";
import { Tabs } from "@/src/components/application/tabs/tabs";
import { NativeSelect } from "@/src/components/base/select/select-native";
const tabs: { id: string; label: string; badge: number }[] = [
    { id: "active", label: "Active", badge: 1 },
    { id: "draft", label: "Draft", badge: 2 },
    { id: "completed", label: "Completed", badge: 0 },
];

export const UnderlineDemo = () => {
    const [selectedTab, setSelectedTab] = useState<Key>("active");
    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTab as string}
                onChange={(event) => setSelectedTab(event.target.value)}
                options={tabs.map((tab) => ({
                    label: tab.label,
                    value: tab.id,
                }))}
                className="w-80 md:hidden"
            />
            <Tabs
                selectedKey={selectedTab}
                onSelectionChange={setSelectedTab}
                className="w-max max-md:hidden"
            >
                <Tabs.List
                    type="underline"
                    items={tabs}
                >
                    {(tab) => (
                        <Tabs.Item
                            isDisabled={0 >= tab.badge}
                            {...tab}
                        />
                    )}
                </Tabs.List>
                <Tabs.Panel id="active">
                    <p>Active</p>
                </Tabs.Panel>
                <Tabs.Panel id="draft">
                    <p>Draft</p>
                </Tabs.Panel>
                <Tabs.Panel id="completed">
                    <p>Complete</p>
                </Tabs.Panel>
            </Tabs>
        </>
    );
};
