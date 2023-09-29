import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { verifyJwtAccessToken } from "@lib/jwtaccesstoken";
import { dbConnect } from "@lib/dbConfig";
import ProductModel from "@models/ProductModel";

export async function POST(request) {
  try {
    // validate accessToken from the headers
    const accessToken = request.headers.get("authorization");
    if (!accessToken || !verifyJwtAccessToken(accessToken)) {
      return NextResponse.json(
        { message: "unauthorized user" },
        { status: 401 }
      );
    }
    // start database
    await dbConnect();

    const productlist = await request.json();

    // start a new session for atomicity property
    const session = await mongoose.startSession();
    session.startTransaction();

    let data = null;
    try {
      data = await ProductModel.deleteMany({
        _id: { $in: productlist.map((item) => item._id) },
      });
      await session.commitTransaction();
      console.log(data);
      return NextResponse.json(
        {
          message: "Product created",
          info: data,
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
