/**
 * Email service for sending quote requests
 */

export interface QuoteRequest {
  need: string;
  address: string;
  timing: string;
  name: string;
  contact: string;
}

const OWNER_EMAIL = "jhovanyhernandez52@gmail.com";

export async function sendQuoteRequest(data: QuoteRequest): Promise<boolean> {
  try {
    const response = await fetch("/api/send-quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Email send failed: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to send quote request:", error);
    return false;
  }
}

export function formatQuoteEmail(data: QuoteRequest): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1a1a1a; color: #fef5e7; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f5f5f5; padding: 20px; border-radius: 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1a1a1a; }
    .value { color: #555; margin-top: 5px; }
    .footer { margin-top: 20px; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 New Quote Request</h1>
      <p style="margin: 5px 0 0 0;">From JD Tree Service Website</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">Service Needed:</div>
        <div class="value">${data.need}</div>
      </div>
      
      <div class="field">
        <div class="label">Property Location:</div>
        <div class="value">${data.address}</div>
      </div>
      
      <div class="field">
        <div class="label">Timeline:</div>
        <div class="value">${data.timing}</div>
      </div>
      
      <div class="field">
        <div class="label">Customer Name:</div>
        <div class="value">${data.name}</div>
      </div>
      
      <div class="field">
        <div class="label">Contact (Phone/Email):</div>
        <div class="value">${data.contact}</div>
      </div>
    </div>
    
    <div class="footer">
      <p>Request submitted on ${new Date().toLocaleString()}</p>
      <p>Reply to: <strong>${data.contact}</strong></p>
    </div>
  </div>
</body>
</html>
  `;
}
