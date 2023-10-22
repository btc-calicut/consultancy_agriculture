import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { verifyJwtAccessToken } from "@lib/jwtaccesstoken";
import { dbConnect } from "@config/dbConfig";
import { v2 as cloudinary } from "cloudinary";
import ProductModel from "@models/ProductModel";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function GET() {
  try {
    await dbConnect();
    const data = await ProductModel.find();

    return NextResponse.json(
      {
        message: "Successfully fetched products",
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

    const reqBody = await request.json();
    const { name, description, benefits, nutritional_facts, image } = reqBody;

    if (!image) {
      return NextResponse.json(
        { message: "Image not provided" },
        { status: 400 }
      );
    }
    // upload to cloudinary
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      // transformation: [{ width: 1000, height: 760, crop: "scale" }],
    };

    const uploadedPhoto = await cloudinary.uploader.upload(image, options);
    const photoUrl = uploadedPhoto.secure_url;
    const photoId = uploadedPhoto.public_id;

    // start a new session for atomicity property
    const session = await mongoose.startSession();
    session.startTransaction();

    let data = null;
    try {
      data = await ProductModel.create({
        name: name,
        description: description,
        benefits: benefits,
        nutritional_facts: nutritional_facts,
        imageUrl: photoUrl,
        imagePublicId: photoId,
      });
      await session.commitTransaction();
      return NextResponse.json(
        {
          message: "Product created",
          data: data,
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

export async function DELETE(request) {
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

    // Extract the imagePublicId id from the productlist array
    // Filter out undefined values because they can have undefined values instead of null which cause errors
    const imagePublicIds = productlist
      .map((product) => product.imagePublicId)
      .filter((publicId) => publicId !== null && publicId !== undefined);

    if (imagePublicIds.length > 0) {
      try {
        await Promise.all(
          imagePublicIds.map((id) => {
            return cloudinary.uploader.destroy(id, (error, result) => {
              if (error) {
                console.log("Error deleting file:", error);
              }
            });
          })
        );
        console.log("All files deleted successfully");
      } catch (error) {
        console.log("Error occurred during file deletion:", error);
      }
    }

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
