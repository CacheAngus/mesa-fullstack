import { NextResponse } from "next/server";
import dbConnect from "@/src/app/lib/dbConnect";
import { createAccount } from "./account.service";

export async function POST(request) {
    try {
        const { db } = await dbConnect();
        const account = await request.json();
        const newAccount = await createAccount(db, account);
        return NextResponse.json(newAccount, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
