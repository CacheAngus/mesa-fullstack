import dbConnect from "@/src/app/lib/dbConnect";
import { NextResponse } from "next/server";
import { getAccount, updateAccount } from "../account.service";

export async function GET(params) {
    try {
        const { db } = await dbConnect();
        const accountId = params;
        const account = await getAccount(db, accountId);
        return NextResponse.json(account, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}

export async function PATCH(request) {
    try {
        const { db } = await dbConnect();
        const accountUpdate = await request.json();
        const updatedAccount = await updateAccount(
            db,
            accountUpdate._id,
            accountUpdate
        );
        return NextResponse.json(updatedAccount, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
