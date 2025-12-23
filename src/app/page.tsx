"use client";

import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";

export default function Home() {
    // todo get the view for the specific sub-domain
    const backgroundColor = "#E31635";
    return (
        <>
            <Layout>
                <Header
                    className="shadow"
                    style={{
                        position: "fixed",
                        top: 0,
                        zIndex: 3,
                        width: "100%",
                        background: backgroundColor,
                        fontFamily: "cousine",
                    }}
                >
                    <div
                        className=" text-2xl font-semibold pt-4"
                        style={{ color: "white" }}
                    >
                        MESA
                    </div>
                </Header>
                <Content></Content>
            </Layout>
        </>
    );
}
