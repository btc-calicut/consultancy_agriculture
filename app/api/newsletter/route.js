import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@lib/dbConfig";
import ejs from "ejs";
import { readFileSync } from "fs";
import path from "path";
import { transporter, clientMailMessage } from "@lib/nodemailer";
import NewsLetterModel from "@models/NewsLetterModel";
import { verifyJwtAccessToken } from "@lib/jwtaccesstoken";

export async function POST(request) {
  try {
    // start database
    await dbConnect();

    const reqBody = await request.json();
    const { email } = reqBody;

    // start a new session for atomicity property
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await NewsLetterModel.create({
        email: email,
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

      // send mail to client
      const clientPath = path.join(
        process.cwd(),
        "lib",
        "EmailTemplateClientSubscribe.ejs"
      );

      const emailWithoutDomain = email.replace(/@.+$/, "");
      const name =
        emailWithoutDomain.charAt(0).toUpperCase() +
        emailWithoutDomain.slice(1);
      const emailTemplateClient = readFileSync(clientPath, "utf8");
      const renderedTemplateClient = ejs.render(emailTemplateClient, {
        name: name,
        email: process.env.EMAIL,
      });

      await transporter.sendMail({
        ...clientMailMessage,
        to: email,
        subject: "BTC Newsletter",
        html: renderedTemplateClient,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    // validate accessToken from the headers
    const accessToken = request.headers.get("authorization");
    if (!accessToken || !verifyJwtAccessToken(accessToken)) {
      return NextResponse.json(
        { message: "Unauthorized user with no access token" },
        { status: 401 }
      );
    }

    // start database
    await dbConnect();
    const data = await NewsLetterModel.find();

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
