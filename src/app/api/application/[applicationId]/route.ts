import dbConnect from "@/src/app/lib/dbConnect";
import { NextResponse } from "next/server";
import { getApplication, updateApplication } from "../application.service";

export async function GET(params) {
    try {
        const { db } = await dbConnect();
        const applicationId = params;
        const application = await getApplication(db, applicationId);
        return NextResponse.json(application, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}

export async function PATCH(request) {
    try {
        const { db } = await dbConnect();
        const applicationUpdate = await request.json();
        const updatedAccount = await updateApplication(
            db,
            applicationUpdate._id,
            applicationUpdate
        );
        return NextResponse.json(updatedAccount, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
