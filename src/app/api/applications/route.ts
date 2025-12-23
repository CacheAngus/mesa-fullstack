import { NextResponse } from "next/server";
import dbConnect from "@/src/app/lib/dbConnect";
import { getApplications } from "./applications.service";

export async function GET() {
    try {
        const { db } = await dbConnect();
        const accounts = await getApplications(db);
        return NextResponse.json(accounts);
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}
