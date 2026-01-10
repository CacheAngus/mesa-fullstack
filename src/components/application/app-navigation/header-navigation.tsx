"use client";

import type { FC, ReactNode } from "react";
import { SearchLg } from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { Avatar } from "@/src/components/base/avatar/avatar";
import { Input } from "@/src/components/base/input/input";
import { cx } from "@/src/utils/cx";
import { MobileNavigationHeader } from "./base-components/mobile-header";

import { NavItemBase } from "./base-components/nav-item";
import { NavItemButton } from "./base-components/nav-item-button";
import { NavList } from "./base-components/nav-list";
import { useRouter } from "next/navigation";

type NavItem = {
    /** Label text for the nav item. */
    label: string;
    /** URL to navigate to when the nav item is clicked. */
    href: string;
    /** Whether the nav item is currently active. */
    current?: boolean;
    /** Icon component to display. */
    icon?: FC<{ className?: string }>;
    /** Badge to display. */
    badge?: ReactNode;
    /** List of sub-items to display. */
    items?: NavItem[];
};

interface HeaderNavigationBaseProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items: NavItem[];
    /** List of sub-items to display. */
    subItems?: NavItem[];
    /** Content to display in the trailing position. */
    trailingContent?: ReactNode;
    /** Whether to show the avatar dropdown. */
    showAvatarDropdown?: boolean;
    /** Whether to hide the bottom border. */
    hideBorder?: boolean;
    name?: string;
    color: string;
    logo: string;
}

export const HeaderNavigationBase = ({
    activeUrl,
    items,
    subItems,
    trailingContent,
    name,
    color,
    logo,
    hideBorder = false,
}: HeaderNavigationBaseProps) => {
    const activeSubNavItems =
        subItems ||
        items.find(
            (item) => item.current && item.items && item.items.length > 0
        )?.items;

    const showSecondaryNav = activeSubNavItems && activeSubNavItems.length > 0;
    const router = useRouter();
    const goToOrganization = () => {
        router.push(`/organization`);
    };

    return (
        <>
            <MobileNavigationHeader>
                <aside className="flex h-full max-w-full flex-col justify-between overflow-auto border-r border-secondary bg-brand-primary pt-4 lg:pt-6">
                    <div className="flex flex-col gap-5 px-4 lg:px-5">
                        <p
                            className="text-2xl"
                            style={{ color }}
                        >
                            MESA SOLUTIONS
                        </p>{" "}
                    </div>

                    <NavList items={items} />

                    <div className="mt-auto flex flex-col gap-4 px-2 py-4 lg:px-4 lg:py-6">
                        {" "}
                        <AriaButton
                            className={({ isPressed, isFocused }) =>
                                cx(
                                    "group relative inline-flex cursor-pointer",
                                    (isPressed || isFocused) && "rounded-full "
                                )
                            }
                            onClick={goToOrganization}
                        >
                            <Avatar
                                alt={name || "Mesa Solutions"}
                                src=""
                                size="xxs"
                            />
                        </AriaButton>
                    </div>
                </aside>
            </MobileNavigationHeader>

            <header className="max-lg:hidden lg:fixed w-full z-10 font-display-bold">
                <section
                    className={cx(
                        "flex h-16 w-full items-center justify-center bg-brand-primary md:h-16",
                        (!hideBorder || showSecondaryNav) &&
                            "border-b border-secondary"
                    )}
                >
                    <div className="flex w-full  justify-between px-8">
                        <div className="flex flex-1 items-center gap-4">
                            <a
                                aria-label="Go to homepage"
                                href="/home"
                                className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <p className="text-brand-200 text-2xl font-display-bold">
                                    MESA SOLUTIONS
                                </p>
                            </a>

                            <nav>
                                <ul className="flex items-center gap-0.5">
                                    {items.map((item) => (
                                        <li
                                            key={item.label}
                                            className="py-0.5"
                                        >
                                            <NavItemBase
                                                icon={item.icon}
                                                href={item.href}
                                                current={item.current}
                                                badge={item.badge}
                                                type="link"
                                            >
                                                {item.label}
                                            </NavItemBase>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                            {trailingContent}

                            <div className="flex gap-0.5">
                                <p
                                    className="text-xl font-display-semibold"
                                    style={{ color }}
                                >
                                    {" "}
                                    {name || "Mesa Solutions"}
                                </p>
                            </div>
                            <AriaButton
                                className={({ isPressed, isFocused }) =>
                                    cx(
                                        "group relative inline-flex cursor-pointer",
                                        (isPressed || isFocused) &&
                                            "rounded-full "
                                    )
                                }
                                onClick={goToOrganization}
                            >
                                <Avatar
                                    alt={name || "Mesa Solutions"}
                                    src={logo}
                                    size="md"
                                />
                            </AriaButton>
                        </div>
                    </div>
                </section>

                {showSecondaryNav && (
                    <section
                        className={cx(
                            "flex h-16 w-full items-center justify-center bg-primary",
                            !hideBorder && "border-b border-secondary"
                        )}
                    >
                        <div className="flex w-full max-w-container items-center justify-between gap-8 px-8">
                            <nav>
                                <ul className="flex items-center gap-0.5">
                                    {activeSubNavItems.map((item) => (
                                        <li
                                            key={item.label}
                                            className="py-0.5"
                                        >
                                            <NavItemBase
                                                icon={item.icon}
                                                href={item.href}
                                                current={item.current}
                                                badge={item.badge}
                                                type="link"
                                            >
                                                {item.label}
                                            </NavItemBase>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <Input
                                shortcut
                                aria-label="Search"
                                placeholder="Search"
                                icon={SearchLg}
                                size="sm"
                                className="max-w-xs"
                            />
                        </div>
                    </section>
                )}
            </header>
        </>
    );
};
