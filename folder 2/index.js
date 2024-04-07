const express = require("express");
const multer = require("multer");
const app = express();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'users',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }                                                              
}); 

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Upload the image to Cloudinary
    // const uploadResult = await cloudinary.uploader.upload(req.file.path);
    // Access uploaded image details (URL, public ID, etc.)
    const imageUrl = req.file.path;
    // const publicId = uploadResult.public_id;

    // Send a success response with the image URL
    res.json({ message: "Image uploaded successfully!!!!", imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
