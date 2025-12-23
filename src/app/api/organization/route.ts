import { NextResponse } from "next/server";
import dbConnect from "@/src/app/lib/dbConnect";
import { getOrganization, updateOrganization } from "./organization.service";

export async function GET(params) {
    try {
        const { db } = await dbConnect();
        const organization = await getOrganization(db);
        return NextResponse.json(organization, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}

export async function PATCH(request) {
    try {
        const { db } = await dbConnect();
        const organizationUpdate = await request.json();
        const updatedAccount = await updateOrganization(db, organizationUpdate);
        return NextResponse.json(updatedAccount, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
