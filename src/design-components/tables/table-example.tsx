import { useMemo, useState } from "react";
import {
    Edit01,
    FilterLines,
    Plus,
    SearchLg,
    Trash01,
} from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationButtonGroup } from "@/src/components/application/pagination/pagination";
import { Table, TableCard } from "@/src/components/application/table/table";
import { Badge } from "@/src/components/base/badges/badges";
import { ButtonUtility } from "@/src/components/base/buttons/button-utility";
import { Button } from "@/src/components/base/buttons/button";
import { Input } from "@/src/components/base/input/input";
import { EmptyState } from "@/src/components/application/empty-state/empty-state";

const applications = [
    {
        _id: "1",
        name: "Application 1",
        status: "active",
        type: "credit",
        created_by: "Cache",
        created_at: new Date(),
    },
    {
        _id: "2",
        name: "Application 2",
        status: "draft",
        type: "credit",
        created_by: "Cache",
        created_at: new Date(),
    },
    {
        _id: "3",
        name: "Application 3",
        status: "complete",
        type: "credit",
        created_by: "Cache",
        created_at: new Date(),
    },
];

export const ApplicationTable = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });
    const [visibleApplications, setVisibleApplications] =
        useState<any[]>(applications);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState("");

    const sortedItems = useMemo(() => {
        return applications.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];
            if (
                (typeof first === "number" && typeof second === "number") ||
                (typeof first === "boolean" && typeof second === "boolean")
            ) {
                return sortDescriptor.direction === "descending"
                    ? second - first
                    : first - second;
            }
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [sortDescriptor]);
    const searchTable = (searchKeyword: string) => {
        setKeyword(searchKeyword);
        const filteredApplications = applications.filter(
            (application) =>
                application.name.includes(keyword) ||
                application.created_by.includes(keyword)
        );
        setVisibleApplications(filteredApplications);
    };
    return (
        <TableCard.Root>
            <TableCard.Header
                title="Applications"
                badge={visibleApplications.length}
                contentTrailing={
                    <div className="absolute top-5 right-4 md:right-6">
                        <Button>+ New application</Button>
                    </div>
                }
                description="Manage all applications"
            />
            <div className="flex justify-between gap-4 border-b border-secondary px-4 py-3 md:px-6">
                <div className="hidden gap-3 md:flex">
                    <Input
                        icon={SearchLg}
                        aria-label="Search"
                        placeholder="Search"
                        className="w-70"
                        value={keyword}
                        onChange={searchTable}
                    />
                    <Button
                        size="md"
                        color="secondary"
                        iconLeading={FilterLines}
                    >
                        Filters
                    </Button>
                </div>
            </div>
            {visibleApplications.length ? (
                <>
                    {" "}
                    <Table
                        aria-label="Team members"
                        selectionMode="multiple"
                        sortDescriptor={sortDescriptor}
                        onSortChange={setSortDescriptor}
                    >
                        <Table.Header className="bg-primary">
                            <Table.Head
                                id="name"
                                label="Name"
                                isRowHeader
                                allowsSorting
                                className="w-full max-w-1/4"
                            />
                            <Table.Head
                                id="status"
                                label="Status"
                                allowsSorting
                            />
                            <Table.Head
                                id="type"
                                label="Type"
                                allowsSorting
                            />
                            <Table.Head
                                id="created_at"
                                label="Created at"
                                allowsSorting
                            />
                            <Table.Head
                                id="created_by"
                                label="Created by"
                                allowsSorting
                            />
                            <Table.Head id="actions" />
                        </Table.Header>
                        <Table.Body items={sortedItems}>
                            {(item) => (
                                <Table.Row
                                    id={item._id}
                                    className="odd:bg-secondary_subtle"
                                >
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <div className="whitespace-nowrap">
                                                <p className="text-sm font-medium text-primary">
                                                    {item.name}
                                                </p>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            key="item.status"
                                            color={
                                                item.status === "active"
                                                    ? "success"
                                                    : "draft" === item.status
                                                    ? "blue"
                                                    : "gray"
                                            }
                                            size="sm"
                                        >
                                            {item.status === "active"
                                                ? "Active"
                                                : item.status === "draft"
                                                ? "Draft"
                                                : "Complete"}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">
                                        {item.type}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">
                                        {item.created_at.toISOString}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">
                                        {item.created_by}
                                    </Table.Cell>
                                    <Table.Cell className="px-4">
                                        <div className="flex justify-end gap-0.5">
                                            <ButtonUtility
                                                size="xs"
                                                color="tertiary"
                                                tooltip="Delete"
                                                icon={Trash01}
                                            />
                                            <ButtonUtility
                                                size="xs"
                                                color="tertiary"
                                                tooltip="Edit"
                                                icon={Edit01}
                                            />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                    <PaginationButtonGroup
                        align="right"
                        page={currentPage}
                        onPageChange={setCurrentPage}
                        total={10}
                        className="px-4 py-3 md:px-6 md:pt-3 md:pb-4"
                    />
                </>
            ) : (
                <>
                    <div className="flex items-center justify-center overflow-hidden px-8 pt-10 pb-12">
                        <EmptyState size="sm">
                            <EmptyState.Header pattern="circle">
                                <EmptyState.FeaturedIcon
                                    color="gray"
                                    theme="modern-neue"
                                />
                            </EmptyState.Header>

                            <EmptyState.Content>
                                <EmptyState.Title>
                                    No applications
                                </EmptyState.Title>
                                <EmptyState.Description>
                                    There are no applications available. Please
                                    try a new keyword or add a new application.
                                </EmptyState.Description>
                            </EmptyState.Content>

                            <EmptyState.Footer>
                                <Button
                                    size="md"
                                    iconLeading={Plus}
                                >
                                    New application
                                </Button>
                            </EmptyState.Footer>
                        </EmptyState>
                    </div>
                </>
            )}
        </TableCard.Root>
    );
};
