import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { VideoMetadata } from "@/app/types/videoTypes";
import config from "@/app/config";

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Retrieve and await `params`
    const param = await context.params;
    const sessionId = param.id;
    console.log(`Session ID: ${sessionId}`);

    // Validate session ID
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const uploadDirectory = path.join(
      config.uploadDirectory,
      sessionId,
      "videos"
    );
    console.log(
      `Upload directory: ${uploadDirectory}` +
        " " +
        fs.existsSync(uploadDirectory)
    );

    // Parse request body
    const body = await request.json();
    const metadata: VideoMetadata = body.metadata;

    // Ensure the upload directory exists
    const sessionDir = path.join(uploadDirectory, sessionId);
    if (!fs.existsSync(sessionDir)) {
      fs.mkdirSync(sessionDir, { recursive: true });
    }

    // Save metadata to a JSON file
    const metadataFilePath = path.join(sessionDir, "metadata.json");
    let metadataList: VideoMetadata[] = [];

    // Load existing metadata if it exists
    if (fs.existsSync(metadataFilePath)) {
      const existingMetadata = fs.readFileSync(metadataFilePath, "utf-8");
      metadataList = JSON.parse(existingMetadata);
    }

    // Add new metadata
    metadataList.push(metadata);

    // Save updated metadata back to the file
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadataList, null, 2));

    return NextResponse.json(
      { message: "Video metadata saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving video metadata:", error);
    return NextResponse.json(
      { error: "Failed to save video metadata" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;
    const sessionId = param.id;

    const uploadDirectory = path.join(
      config.uploadDirectory,
      sessionId,
      "videos"
    );
    // Path to the metadata file
    const metadataFilePath = path.join(
      uploadDirectory,
      sessionId,
      "metadata.json"
    );

    // Check if metadata exists
    if (fs.existsSync(metadataFilePath)) {
      const metadata = fs.readFileSync(metadataFilePath, "utf-8");
      return NextResponse.json(
        { metadata: JSON.parse(metadata) },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ metadata: [] }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching video metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch video metadata" },
      { status: 500 }
    );
  }
}
