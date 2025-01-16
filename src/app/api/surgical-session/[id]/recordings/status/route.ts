import { NextRequest, NextResponse } from "next/server";
import OMEManager from "@/app/lib/ome/OMEManager";

const omeManager = new OMEManager(
  process.env.OME_BASE_URL,
  process.env.OME_API_SECRET
);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("Getting Record Status....");
  // Retrieve and await `params`
  const param = await params;
  const sessionId = param.id;

  if (!sessionId) {
    return NextResponse.json(
      { message: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const response = await omeManager.getRecordingStatus(sessionId);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
