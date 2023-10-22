import { NextResponse } from "next/server";
import { verifyJwtAccessToken } from "@lib/jwtaccesstoken";
import { dbConnect } from "@config/dbConfig";

export async function GET(request) {
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

    // find the admin object from databse using the email
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
