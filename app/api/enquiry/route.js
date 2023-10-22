import { NextResponse } from "next/server";
import mongoose from "mongoose";
import ejs from "ejs";
import { promises as fs } from "fs";
import { dbConnect } from "@config/dbConfig";
import {
  transporter,
  clientMailMessage,
  companyMailMessage,
} from "@config/nodemailer";
import EnquiryModel from "@models/EnquiryModel";
import { verifyJwtAccessToken } from "@lib/jwtaccesstoken";

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

      // send mail to client
      const emailTemplateClient = await fs.readFile(
        process.cwd() + "/lib/EmailTemplateClient.ejs",
        "utf8"
      );

      const renderedTemplateClient = ejs.render(emailTemplateClient, {
        name: name,
        number: number,
        email: email,
        message: message,
      });

      await transporter.sendMail({
        ...clientMailMessage,
        to: email,
        subject: "Inquiry Response",
        html: renderedTemplateClient,
      });

      // send mail to BTC
      const emailTemplateCompany = await fs.readFile(
        process.cwd() + "/lib/EmailTemplateCompany.ejs",
        "utf8"
      );

      const renderedTemplateCompany = ejs.render(emailTemplateCompany, {
        name: name,
        number: number,
        email: email,
        message: message,
      });

      await transporter.sendMail({
        ...companyMailMessage,
        subject: `New nquiry from ${name}`,
        html: renderedTemplateCompany,
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
        { message: "unauthorized user" },
        { status: 401 }
      );
    }

    // start database
    await dbConnect();
    const data = await EnquiryModel.find();

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
