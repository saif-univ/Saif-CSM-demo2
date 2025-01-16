import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import config from "@/app/config";

// POST request handler
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Retrieve and await `params`
  const param = await params;
  const sessionId = param.id;
  console.log(`Session ID: ${sessionId}`);

  // Validate session ID
  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  const uploadDir = path.join(config.uploadDirectory, sessionId, "images");
  console.log(
    `Upload directory: ${uploadDir}` + " " + fs.existsSync(uploadDir)
  );

  // Ensure the directory exists
  if (!fs.existsSync(uploadDir)) {
    console.log(`Creating directory: ${uploadDir}`);
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
    } catch (error) {
      console.error(`Error creating directory: ${error.message}`);
      return NextResponse.json(
        { error: "Failed to create directory" },
        { status: 500 }
      );
    }
  }

  // Parse request body
  const { imageData, metadata } = await request.json();

  // Generate a unique filename based on timestamp
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const filename = `surgery_${timestamp}.jpg`;

  // Save the image to the server
  const imageBuffer = Buffer.from(imageData.split(",")[1], "base64");
  console.log(`Saving image to: ${path.join(uploadDir, filename)}`);
  try {
    fs.writeFileSync(path.join(uploadDir, filename), imageBuffer);
  } catch (error) {
    console.error(`Error saving image: ${error.message}`);
    return NextResponse.json(
      { error: "Failed to save image" },
      { status: 500 }
    );
  }

  // Save metadata to a JSON file
  const metadataFile = path.join(uploadDir, "metadata.json");
  let metadataList = [];
  if (fs.existsSync(metadataFile)) {
    metadataList = JSON.parse(fs.readFileSync(metadataFile, "utf8"));
  }
  metadataList.push({ filename, ...metadata, timestamp });
  fs.writeFileSync(metadataFile, JSON.stringify(metadataList, null, 2));

  return NextResponse.json({ success: true, filename, metadata });
}

// GET request handler
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const param = await params;
  const sessionId = param.id;
  const metadataFile = path.join(
    config.uploadDirectory,
    sessionId,
    "images",
    "metadata.json"
  );

  if (fs.existsSync(metadataFile)) {
    const metadata = JSON.parse(fs.readFileSync(metadataFile, "utf8"));
    return NextResponse.json({ metadata });
  }

  return NextResponse.json({ metadata: [] });
}
