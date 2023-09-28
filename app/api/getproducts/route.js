import { NextResponse } from "next/server";
import { dbConnect } from "@lib/dbConfig";
import ProductModel from "@models/ProductModel";

export async function GET() {
  try {
    // start database
    await dbConnect();
    const data = await ProductModel.find();

    return NextResponse.json(
      {
        message: "Success",
        info: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // start database
    await dbConnect();

    const name = await request.json();
    const data = await ProductModel.find({ name: name });
    return NextResponse.json(
      {
        message: "Success",
        info: data[0],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
