import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import OMEManager from "@/app/lib/ome/OMEManager";

const omeManager = new OMEManager(
  process.env.OME_BASE_URL,
  process.env.OME_API_SECRET
);

// Exporting an explicitly defined POST method
export async function POST(
  req: NextApiRequest,
  { params }: { params: { id: string } },
  res: NextApiResponse
) {
  // Retrieve and await `params`
  const param = await params;
  const sessionId = param.id;
  //console.log("Request Body: ", req.body);
  //  const streamName = req.body.streamName; // Fix this later
  const streamName = "device123";

  console.log(
    "Starting recording for session: ",
    sessionId,
    "with stream:",
    streamName
  );

  // Validate inputs
  if (!sessionId || !streamName) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    const response = await omeManager.startRecording(
      String(sessionId),
      streamName
    ); // Call OMEManager
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error starting recording:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle unsupported methods
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return res.status(405).json({ message: "Method Not Allowed" });
}
