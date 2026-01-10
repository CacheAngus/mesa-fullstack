"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { SidebarNavigationSimple } from "@/src/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import {
    BarChartSquare02,
    CheckDone01,
    Folder,
    HomeLine,
    Settings01,
} from "@untitledui/icons";
import { NavItemType } from "@/src/components/application/app-navigation/config";
import { HeaderNavigationBase } from "@/src/components/application/app-navigation/header-navigation";
import { BaseAccount } from "../lib/Account_types";

const OrganizationContext = createContext();
export const useOrganization = () => useContext(OrganizationContext);

export default function HomeNavPage({ children }) {
    const [organization, setOrganization] = useState<{
        primary_color: string;
        secondary_color: string;
        name: string;
        logo: string;
    }>({
        primary_color: "#75732C",
        secondary_color: "#582F2B",
        name: "Mesa Solutions",
        logo: "https://mesaplatform.sharepoint.com/:i:/s/MesaCorporateDocuments/IQDefSxGPTVuQoyajO28HwgTAYvunJlpokaPkyGtcAVqsEY?e=8CEkNY",
    });
    // useEffect(() => {
    //     const fetchOrganization = async () => {
    //         const fetchedOrganization = await axios.get("/api/organization");
    //         setOrganization(fetchedOrganization.data);
    //     };
    //     fetchOrganization();
    // }, []);
    // todo get user
    const [user, setUser] = useState<BaseAccount>({
        first_name: "Cache",
        last_name: "Angus",
        email: "cache@mesa.com",
        phone: 1,
        address: "Montreal",
        type: "admin",
        title: "Ms.",
        created_at: new Date().toISOString(),
    });
    const backgroundColor = organization.primary_color;
    const textColor = shouldTextBeBlack(backgroundColor)
        ? "#000000"
        : "#FFFFFF";
    const isAdmin = false;
    const navItems: NavItemType[] = [
        {
            label: "Welcome",
            href: "/welcome",
            icon: CheckDone01,
        },
        {
            label: "Home",
            href: "/home",
            icon: HomeLine,
        },
        {
            label: "Applications",
            href: "/applications",
            icon: BarChartSquare02,
        },
        {
            label: "Catalogs",
            href: "/catalogs",
            icon: Folder,
        },
    ];
    const [activeUrl, setActiveUrl] = useState(usePathname());
    const pathname = usePathname();
    useEffect(() => {
        setActiveUrl(pathname);
    }, [pathname]);
    return (
        <>
            <HeaderNavigationBase
                items={[]}
                name={organization.name}
                color={textColor}
                hideBorder={true}
                logo={""}
            />

            <SidebarNavigationSimple
                items={navItems}
                footerItems={[
                    {
                        label: "Organization",
                        href: "/organization",
                        icon: Settings01,
                    },
                ]}
                activeUrl={activeUrl}
                user={user}
                className="mt-16 pb-16"
            />
            <OrganizationContext.Provider
                value={{
                    primary_color: organization.primary_color,
                    secondary_color: organization.secondary_color,
                    name: organization.name,
                    logo: organization.logo,
                }}
            >
                <Content className="ml-72 pt-16">{children}</Content>
            </OrganizationContext.Provider>
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
