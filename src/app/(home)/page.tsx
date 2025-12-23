"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";

const OrganizationContext = createContext();
export const useOrganization = () => useContext(OrganizationContext);

export default function HomeNavPage({ children }) {
    const [organization, setOrganization] = useState<{
        primary_color: string;
        secondary_color: string;
        name: string;
        logo: string;
    }>({
        primary_color: "#E31635",
        secondary_color: "#B71A2E",
        name: "Jack In The Box",
        logo: "https://logos-world.net/wp-content/uploads/2022/08/Jack-in-the-Box-Logo.png",
    });
    useEffect(() => {
        const fetchOrganization = async () => {
            const fetchedOrganization = await axios.get("/api/organization");
            setOrganization(fetchedOrganization.data);
        };
        fetchOrganization();
    }, []);
    const backgroundColor = organization.primary_color;
    const textColor = shouldTextBeBlack(backgroundColor)
        ? "#000000"
        : "#FFFFFF";
    const pathName = usePathname();
    const isAdmin = false;
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
                        className="flex flex-row justify-between items-center pt-4"
                        style={{ background: backgroundColor }}
                    >
                        <div
                            className=" text-2xl font-semibold"
                            style={{ color: textColor }}
                        >
                            MESA
                        </div>
                        <div className=" flex flex-row gap-4 items-center">
                            <div
                                className="text-xl"
                                style={{ color: textColor }}
                            >
                                {organization.name}
                            </div>
                            <img
                                style={{ height: 24, width: 36 }}
                                src={
                                    organization.logo ||
                                    "https://th.bing.com/th/id/R.f826b7a42b598f66524973365869439c?rik=%2fXV55qy%2fU7EmNw&riu=http%3a%2f%2fwww.digital-images.net%2fImages%2fSW_Indian_Sites%2fMonumentValley%2fMesas_Buttes%2fMonument_Valley_Sentinel_Mesa_Sunrise_X9921.jpg&ehk=n1xd3UEr0UKKfItFgKtTLjlQzQM3SBuRgixQ3%2fT9tVA%3d&risl=&pid=ImgRaw&r=0"
                                }
                            />
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Sider
                        className="h-screen"
                        style={{
                            background: "white",
                            position: "fixed",
                            top: 64,
                            bottom: 0,
                            width: "300px",
                        }}
                    >
                        <div className="flex flex-col h-full justify-between text-xl ">
                            <div className="my-8">
                                {isAdmin ? (
                                    <>
                                        {" "}
                                        <div
                                            className={
                                                pathName === "/welcome"
                                                    ? "bg-gray-100 mb-2 py-2"
                                                    : "mb-2"
                                            }
                                        >
                                            <Link
                                                className="pl-4 "
                                                href="/welcome"
                                            >
                                                <span
                                                    style={{
                                                        color:
                                                            pathName ===
                                                            "/welcome"
                                                                ? backgroundColor
                                                                : "black",
                                                    }}
                                                >
                                                    Welcome
                                                </span>
                                            </Link>
                                        </div>
                                        <div
                                            className={
                                                pathName.includes("/home")
                                                    ? "bg-gray-100 mb-2 py-2"
                                                    : "mb-2"
                                            }
                                        >
                                            <Link
                                                className="pl-4"
                                                href="/home"
                                            >
                                                <span
                                                    style={{
                                                        color: pathName.includes(
                                                            "/home"
                                                        )
                                                            ? backgroundColor
                                                            : "black",
                                                    }}
                                                >
                                                    Home{" "}
                                                </span>
                                            </Link>
                                        </div>
                                        <div
                                            className={
                                                pathName.includes("/catalogs")
                                                    ? "bg-gray-100 mb-2 py-2"
                                                    : "mb-2"
                                            }
                                        >
                                            <Link
                                                className="pl-4"
                                                href="/catalogs"
                                            >
                                                <span
                                                    style={{
                                                        color: pathName.includes(
                                                            "/catalogs"
                                                        )
                                                            ? backgroundColor
                                                            : "black",
                                                    }}
                                                >
                                                    Catalogs
                                                </span>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}

                                <div
                                    className={
                                        pathName.includes("/applications")
                                            ? "bg-gray-100 mb-2 py-2"
                                            : "mb-2"
                                    }
                                >
                                    <Link
                                        className="pl-4"
                                        href="/applications"
                                    >
                                        <span
                                            style={{
                                                color: pathName.includes(
                                                    "/applications"
                                                )
                                                    ? backgroundColor
                                                    : "black",
                                            }}
                                        >
                                            {" "}
                                            Applications{" "}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="mb-24">
                                <div
                                    className={
                                        pathName === "/organization"
                                            ? "bg-gray-100 mb-2 py-2"
                                            : "mb-2"
                                    }
                                >
                                    <Link
                                        className="pl-4"
                                        href="/organization"
                                    >
                                        <span
                                            style={{
                                                color:
                                                    pathName === "/organization"
                                                        ? backgroundColor
                                                        : "black",
                                            }}
                                        >
                                            {" "}
                                            Organization{" "}
                                        </span>
                                    </Link>
                                </div>
                                <div
                                    className={
                                        pathName === "/account"
                                            ? "bg-gray-100 mb-2 py-2"
                                            : "mb-2"
                                    }
                                >
                                    <Link
                                        className="pl-4"
                                        href="/account"
                                    >
                                        <span
                                            style={{
                                                color:
                                                    pathName === "/account"
                                                        ? backgroundColor
                                                        : "black",
                                            }}
                                        >
                                            {" "}
                                            Account
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Sider>
                    <OrganizationContext.Provider
                        value={{
                            primary_color: organization.primary_color,
                            secondary_color: organization.secondary_color,
                            name: organization.name,
                            logo: organization.logo,
                        }}
                    >
                        <Content className="pl-8 mt-16 ml-47">
                            {children}
                        </Content>
                    </OrganizationContext.Provider>
                </Layout>
            </Layout>
        </>
    );
}

function shouldTextBeBlack(backgroundcolor: string) {
    return computeLuminence(backgroundcolor) > 0.179;
}
function computeLuminence(backgroundcolor: string) {
    var colors = hexToRgb(backgroundcolor);

    if (!colors) {
        throw new Error("Invalid color");
    }

    var components = ["r", "g", "b"];
    for (var i in components) {
        var c = components[i];

        colors[c] = colors[c] / 255.0;

        if (colors[c] <= 0.03928) {
            colors[c] = colors[c] / 12.92;
        } else {
            colors[c] = Math.pow((colors[c] + 0.055) / 1.055, 2.4);
        }
    }

    var luminence = 0.2126 * colors.r + 0.7152 * colors.g + 0.0722 * colors.b;

    return luminence;
}

function hexToRgb(hex: string): Record<string, number> | null {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}
