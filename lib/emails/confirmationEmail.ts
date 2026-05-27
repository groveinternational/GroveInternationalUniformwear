export const confirmationEmail = (data: {
  name: string;
  email: string;
  schoolName?: string;
  message: string;
}) => {
  const shortMessage = data.message.length > 100 
    ? data.message.substring(0, 100) + '...' 
    : data.message;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Inquiry Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f5; color: #1e1e1e;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background-color: #0B1F3A; padding: 32px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">Grove International</h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5;">Thank you for your inquiry, ${data.name}.</p>
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.5;">We have received your inquiry and will get back to you within 24 hours.</p>

                    <!-- Summary Box -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; border-radius: 6px; padding: 24px;">
                      <tr>
                        <td>
                          <h3 style="margin: 0 0 16px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Inquiry Summary</h3>
                          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Name:</strong> ${data.name}</p>
                          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Email:</strong> ${data.email}</p>
                          ${data.schoolName ? `<p style="margin: 0 0 8px 0; font-size: 14px;"><strong>School:</strong> ${data.schoolName}</p>` : ''}
                          <p style="margin: 0; font-size: 14px; color: #4b5563;"><strong>Message Preview:</strong><br/>${shortMessage}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 12px; color: #9ca3af;">&copy; 2026 Grove International. All rights reserved.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
