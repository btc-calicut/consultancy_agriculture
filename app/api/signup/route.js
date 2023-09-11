import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { dbConnect } from "@lib/dbConfig";
import AdminModel from "@models/AdminModel";

export async function POST(request) {
  try {
    // start database
    await dbConnect();

    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // find the admin object from databse using the email
    const admin = await AdminModel.findOne({ email });

    // is the admin email is already existing, return error
    if (admin) {
      return NextResponse.json(
        { message: "Admin already exists" },
        { status: 400 }
      );
    }

    // start a new session for atomicity property
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // hash the password
      const hashedpassword = await bcrypt.hash(password, 10);

      // create the admin in database
      await AdminModel.create({
        username: username,
        email: email,
        password: hashedpassword,
      });

      await session.commitTransaction();
      return NextResponse.json(
        { message: "Admin created successfully" },
        { status: 201 }
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
