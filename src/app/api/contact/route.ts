import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile, email, location, message } = body;

    if (!name || !mobile || !message) {
      return NextResponse.json(
        { error: "Name, mobile, and message are required" },
        { status: 400 }
      );
    }

    // Forward to Zoho CRM Web-to-Lead
    // TODO: Replace ZOHO_FORM_URL with your actual Zoho CRM web-to-lead URL
    const ZOHO_FORM_URL = process.env.ZOHO_CONTACT_FORM_URL;

    if (ZOHO_FORM_URL) {
      const formData = new URLSearchParams();
      formData.append("Last Name", name);
      formData.append("Mobile", mobile);
      formData.append("Email", email || "");
      formData.append("City", location || "");
      formData.append("Description", message);
      formData.append("Lead Source", "Indicus Website");

      await fetch(ZOHO_FORM_URL, {
        method: "POST",
        body: formData,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
