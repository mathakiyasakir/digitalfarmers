import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, phone, password, role } = await req.json();

    if (!name || !phone || !password) {
      return NextResponse.json(
        { message: "सभी फ़ील्ड भरना अनिवार्य है" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("digitalfarmers");

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ phone });

    if (existingUser) {
      return NextResponse.json(
        { message: "यह मोबाइल नंबर पहले से रजिस्टर है" },
        { status: 400 }
      );
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User
    const result = await db.collection("users").insertOne({
      name,
      phone,
      password: hashedPassword,
      role: role || "khedut",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "अकाउंट सफलतापूर्वक बन गया!", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "सर्वर एरर: " + (error?.message || "डेटाबेस से कनेक्ट नहीं हो सका") },
      { status: 500 }
    );
  }
}
