import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@lib/dbConfig";
import EnquiryModel from "@models/EnquiryModel";
import { verifyJwtAccessToken } from "@lib/jwtaccesstoken";
import {
  transporter,
  clientMailMessage,
  companyMailMessage,
} from "@config/nodemailer";

export async function POST(request) {
  try {
    // start database
    await dbConnect();

    const reqBody = await request.json();
    const { name, email, number, message } = reqBody;

    // send mail to client
    await transporter.sendMail({
      ...clientMailMessage,
      subject: "Enquiry Send Successfully",
      text: "message recieved",
      html: `
      <h3>Hello ${name}</h3>
      <p>Thank you for messaging</p>
      `,
    });

    // send mail to BTC
    await transporter.sendMail({
      ...companyMailMessage,
      subject: `Enquiry from ${name}`,
      text: message,
      html: `
      <h3>Name: ${name}</h3>
      <h4>Email: ${email}</h4>
      <h4>Contact: ${number}</h4>
      <h4>Message:</h4>
      <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: "Response recieved" }, { status: 200 });
    /* 
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
    } */
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
