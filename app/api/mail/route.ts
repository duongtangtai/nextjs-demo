import { sendMail } from "@/lib/mailService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const mailInfo: MailInfo = await request.json();

  let mailResult: MailResult;
  try {
    await sendMail(mailInfo);
    mailResult = {
      isSuccessful: true,
      errMsg: "",
    }
  } catch (err: any) {
    mailResult = {
      isSuccessful: true,
      errMsg: err.message,
    }
  }
  return NextResponse.json(mailResult)
}