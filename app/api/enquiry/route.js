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
      to: email,
      subject: "Inquiry Response",
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Inquiry Response</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #0073e6;
                color: #fff;
                text-align: center;
                padding: 10px;
            }
            .content {
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
            }
            .message {
                margin-top: 20px;
            }
            .signature {
            text-align: right;
            margin-top: 20px;
            font-style: italic;
            color: #666;
        }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Inquiry Response</h1>
            </div>
            <div class="content">
                <p>Hello ${name},</p>
                <p>Thank you for getting in touch with us. We have received your inquiry and will get back to you as soon as possible. Below is a summary of the information you provided:</p>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Phone No.:</strong> ${number}</li>
                    <li><strong>Email Address:</strong> ${email}</li>
                </ul>
                <p><strong>Message:</strong></p>
                <div class="message">
                    ${message}
                </div>
                <p>We appreciate your interest and look forward to assisting you. If you have any further questions or require additional information, please don't hesitate to reach out to us.</p>
                <p class="signature" style="font-size: 14px;">Best regards,<br>Blueway Trading Company</p>
        </div>
        </div>
    </body>
    </html>
  `,
    });

    // send mail to BTC
    await transporter.sendMail({
      ...companyMailMessage,
      subject: `New nquiry from ${name}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Inquiry Received</title>
          <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #0073e6;
                color: #fff;
                text-align: center;
                padding: 10px;
            }
            .content {
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
            }
            .message {
                margin-top: 20px;
            }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1">New Inquiry Received</h1>
              </div>
              <div class="content">
                  <h3><strong>Name:</strong> ${name}</h3>
                  <h4><strong>Email:</strong> ${email}</h4>
                  <h4><strong>Contact:</strong> ${number}</h4>
                  <h4><strong>Message:</strong></h4>
                  <p class="message">${message}</p>
              </div>
          </div>
      </body>
      </html>

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
