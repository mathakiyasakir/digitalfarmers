import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, phone, password, role } = await req.json();

    if (!name || !phone || !password || !role) {
      return NextResponse.json({ message: "सभी फ़ील्ड भरें" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check existing user
    const existingUser = await db.collection("users").findOne({ phone });
    if (existingUser) {
      return NextResponse.json({ message: "यह नंबर पहले से रजिस्टर है" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.collection("users").insertOne({
      name,
      phone,
      password: hashedPassword,
      role, // 'khedut' or 'vyapari'
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "अकाउंट सफलतापूर्वक बन गया!", userId: newUser.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "सर्वर एरर, दोबारा प्रयास करें" }, { status: 500 });
  }
}
