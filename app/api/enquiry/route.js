import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@lib/dbConfig";
import EnquiryModel from "@models/EnquiryModel";

export async function POST(request) {
  try {
    // start database
    await dbConnect();

    const reqBody = await request.json();
    const { name, email, number, message } = reqBody;

    // start a new session for atomicity property
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await EnquiryModel.create({
        name: name,
        email: email,
        number: number,
        message: message,
      });

      await session.commitTransaction();
      return NextResponse.json(
        { message: "Response recieved" },
        { status: 200 }
      );
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
