// ============================================================
// Google Apps Script for Arpan Bhuva Portfolio
// ============================================================
// This script handles two things:
//   1. Saves contact form submissions to a Google Sheet
//   2. Sends an email notification to trialemaila1@gmail.com
//
// HOW TO SET UP:
// 
// Step 1: Create a new Google Sheet
//   - Go to https://sheets.google.com
//   - Create a new spreadsheet
//   - Name it "Portfolio Contact Submissions"
//   - In Row 1, add these headers:
//     A1: Timestamp | B1: Name | C1: Email | D1: Subject | E1: Message
//
// Step 2: Open Apps Script Editor
//   - In the Google Sheet, go to Extensions > Apps Script
//   - Delete any existing code and paste this entire script
//   - Click the floppy disk icon to save
//
// Step 3: Deploy as Web App
//   - Click "Deploy" > "New deployment"
//   - Click the gear icon next to "Select type" and choose "Web app"
//   - Set "Execute as" to "Me"
//   - Set "Who has access" to "Anyone"
//   - Click "Deploy"
//   - Authorize the app when prompted (click through the "unsafe" warning)
//   - COPY the Web app URL that appears
//
// Step 4: Add the URL to your .env.local
//   - In your portfolio project, open .env.local
//   - Add: GOOGLE_SHEET_HOOK_URL=<paste_the_web_app_url_here>
//
// That's it! Every contact form submission will now be saved 
// to your Google Sheet AND emailed to you.
// ============================================================

const NOTIFICATION_EMAIL = "trialemaila1@gmail.com";
const SHEET_NAME = "Sheet1"; // Change if your sheet tab has a different name

function doPost(e) {
    try {
        var data = JSON.parse(e.postData.contents);

        // 1. Save to Google Sheet
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

        if (!sheet) {
            sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        }

        sheet.appendRow([
            new Date(),                   // Timestamp
            data.name || "N/A",           // Name
            data.email || "N/A",          // Email
            data.subject || "N/A",        // Subject
            data.message || "N/A"         // Message
        ]);

        // 2. Send Email Notification
        var subject = "🚀 New Portfolio Contact: " + (data.subject || "No Subject");
        var htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #f8fafc; border-radius: 20px;">
        <div style="background: white; border-radius: 16px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="color: #0B5394; margin-bottom: 20px; font-size: 22px;">📨 New Contact Form Submission</h2>
          <hr style="border: none; border-top: 2px solid #e2e8f0; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; width: 100px;">Name</td>
              <td style="padding: 12px 0; color: #1f2937; font-size: 15px; font-weight: 600;">${data.name || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 12px 0; color: #1f2937; font-size: 15px;"><a href="mailto:${data.email}" style="color: #0B5394; text-decoration: none;">${data.email || "N/A"}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Subject</td>
              <td style="padding: 12px 0; color: #1f2937; font-size: 15px; font-weight: 600;">${data.subject || "N/A"}</td>
            </tr>
          </table>
          
          <hr style="border: none; border-top: 2px solid #e2e8f0; margin: 20px 0;" />
          
          <div>
            <p style="color: #64748b; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; color: #334155; font-size: 14px; line-height: 1.7;">
              ${(data.message || "N/A").replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
        
        <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
          Sent from your Portfolio Contact Form • ${new Date().toLocaleDateString()}
        </p>
      </div>
    `;

        MailApp.sendEmail({
            to: NOTIFICATION_EMAIL,
            subject: subject,
            htmlBody: htmlBody,
            replyTo: data.email || NOTIFICATION_EMAIL
        });

        // Return success
        return ContentService
            .createTextOutput(JSON.stringify({ success: true, message: "Data saved and email sent!" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Optional: Handle GET requests (for testing)
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({ status: "ok", message: "Portfolio webhook is active!" }))
        .setMimeType(ContentService.MimeType.JSON);
}
