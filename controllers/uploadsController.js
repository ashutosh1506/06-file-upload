const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//This is for uploading images locally
const uploadProductImageLocal = async (req, res) => {
  //check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }

  const productImage = req.files.image;

  //check format
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Provide Image");
  }

  //check size
  const maxSize = 1024 * 1024; //1mb
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please Upload image with size less than 1kb"
    );
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

//This is for uploading images on cloudinary

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};
module.exports = {
  uploadProductImage,
};
