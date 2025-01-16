import fs from "fs";
import path from "path";
import { parseStringPromise } from "xml2js";
import { NextRequest, NextResponse } from "next/server";
import { RecordedFile } from "@/app/types";

const RECORDING_METADATA_FILE_PATH =
  process.env.RECORDING_METADATA_FILE_PATH || "";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Retrieve and await `params`
  const param = await params;
  const sessionId = param.id;

  if (!sessionId) {
    return NextResponse.json(
      { message: "Missing required parameter: id" },
      { status: 400 }
    );
  }

  const metadataFilePath = path.join(
    RECORDING_METADATA_FILE_PATH,
    `${sessionId}.xml`
  );

  try {
    // Check if the file exists
    if (!fs.existsSync(metadataFilePath)) {
      return NextResponse.json(
        { message: `Metadata file for session ID "${sessionId}" not found` },
        { status: 404 }
      );
    }

    // Read the XML file
    const xmlData = fs.readFileSync(metadataFilePath, "utf-8");

    // Parse the XML data into a JSON object
    const parsedData = await parseStringPromise(xmlData);

    // Extract relevant file information from the XML structure
    const files: RecordedFile[] = parsedData.files.file.map((file: any) => ({
      transactionId: file.transactionId[0],
      id: file.id[0],
      vhost: file.vhost[0],
      app: file.app[0],
      stream: file.stream[0],
      filePath: file.filePath[0]._,
      recordBytes: parseInt(file.recordBytes[0], 10),
      recordTime: parseInt(file.recordTime[0], 10),
      sequence: parseInt(file.sequence[0], 10),
      lastSequence: file.lastSequence[0] === "true",
      createdTime: file.createdTime[0],
      startTime: file.startTime[0],
      finishTime: file.finishTime[0],
    }));

    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    console.error("Error reading or parsing metadata file:", error.message);
    return NextResponse.json(
      { message: "Failed to process metadata file", error: error.message },
      { status: 500 }
    );
  }
}
