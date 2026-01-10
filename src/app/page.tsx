"use client";

import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { HeaderNavigationBase } from "@/src/components/application/app-navigation/header-navigation";

export default function Home() {
    // todo get the view for the specific sub-domain
    const backgroundColor = "#582F2B";
    return (
        <>
            <Layout>
                <HeaderNavigationBase
                    items={[]}
                    color={"#"}
                    hideBorder={true}
                    logo={""}
                />
                <Content></Content>
            </Layout>
        </>
    );
}
