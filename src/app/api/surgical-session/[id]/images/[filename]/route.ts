import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import config from "@/app/config";

interface RouteParams {
  params: { id: string; filename: string };
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id: sessionId, filename } = params;

  if (!sessionId || !filename) {
    return NextResponse.json(
      { error: "Invalid session ID or filename" },
      { status: 400 }
    );
  }

  const imagePath = path.join(
    config.uploadDirectory,
    sessionId,
    "images",
    filename
  );
  const metadataFilePath = path.join(
    config.uploadDirectory,
    sessionId,
    "images",
    "metadata.json"
  );

  try {
    // Delete the associated metadata entry
    if (fs.existsSync(metadataFilePath)) {
      const metadataContent = JSON.parse(
        fs.readFileSync(metadataFilePath, "utf8")
      );

      // Filter out the deleted image entry
      const updatedMetadata = metadataContent.filter(
        (item: { filename: string }) => item.filename !== filename
      );

      // Write the updated metadata back to the file
      fs.writeFileSync(
        metadataFilePath,
        JSON.stringify(updatedMetadata, null, 2)
      );
    }

    // Delete the image file
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    } else {
      return NextResponse.json(
        { error: "Image file not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image or metadata:", error);
    return NextResponse.json(
      { error: "Failed to delete image or metadata" },
      { status: 500 }
    );
  }
}
