import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { verifyJwtAccessToken } from "@lib/jwtaccesstoken";
import { dbConnect } from "@lib/dbConfig";
import AdminModel from "@models/AdminModel";

export async function POST(request) {
  try {
    // validate accessToken from the headers
    const accessToken = request.headers.get("authorization");
    if (!accessToken || !verifyJwtAccessToken(accessToken)) {
      return NextResponse.json(
        { message: "Unauthorized user with no token" },
        { status: 401 }
      );
    }

    // start database
    await dbConnect();

    const reqBody = await request.json();
    const { username, oldpassword, newpassword } = reqBody;

    // Finds the admin details object from database
    const adminToUpdate = await AdminModel.findOne({ username: username });

    // Check if the admin exists
    if (!adminToUpdate) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // compare with  hashed password
    const isValidPassword = await bcrypt.compare(
      oldpassword,
      adminToUpdate.password
    );

    if (!isValidPassword || oldpassword === newpassword) {
      return NextResponse.json(
        {
          message: "Invalid old password. Make sure not to reuse old password.",
        },
        { status: 400 }
      );
    }

    // start a new session for atomicity property
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // hash the password
      const hashedpassword = await bcrypt.hash(newpassword, 10);

      await AdminModel.findOneAndUpdate(
        { username: username }, // id to update
        { password: hashedpassword } // fields to update
      ).session(session);

      await session.commitTransaction();
      return NextResponse.json(
        {
          message:
            "Successfully updated password. You will be logged out within 5 seconds.",
        },
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
