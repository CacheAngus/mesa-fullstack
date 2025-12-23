import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";

export async function POST(request) {
    try {
        const { db } = await dbConnect();
        const application = await request.json();
        const newApplication = await createApplication(db, application);
        return NextResponse.json(newApplication, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
