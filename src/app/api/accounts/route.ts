import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import { getAccounts } from "./accounts.service";

export async function GET() {
    try {
        const { db } = await dbConnect();
        const accounts = await getAccounts(db);
        return NextResponse.json(accounts);
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}
