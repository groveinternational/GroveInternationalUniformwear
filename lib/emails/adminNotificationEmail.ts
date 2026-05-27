export const adminNotificationEmail = (data: {
  name: string;
  email: string;
  phone?: string;
  schoolName?: string;
  message: string;
  productId?: string;
  quantity?: number;
}) => {
  const dateStr = new Date().toLocaleString('en-US', { timeZoneName: 'short' });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Inquiry Notification</title>
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
                    <h2 style="margin: 0 0 24px 0; font-size: 20px; color: #1e1e1e;">New Inquiry Received</h2>
                    
                    <table width="100%" border="0" cellspacing="0" cellpadding="12" style="border-collapse: collapse;">
                      <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td width="30%" style="font-weight: bold; color: #4b5563; font-size: 14px;">Submission Time</td>
                        <td style="font-size: 14px;">${dateStr}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="font-weight: bold; color: #4b5563; font-size: 14px;">Name</td>
                        <td style="font-size: 14px;">${data.name}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="font-weight: bold; color: #4b5563; font-size: 14px;">Email</td>
                        <td style="font-size: 14px;"><a href="mailto:${data.email}" style="color: #1D3D73;">${data.email}</a></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="font-weight: bold; color: #4b5563; font-size: 14px;">Phone</td>
                        <td style="font-size: 14px;">${data.phone || 'N/A'}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="font-weight: bold; color: #4b5563; font-size: 14px;">School / Org</td>
                        <td style="font-size: 14px;">${data.schoolName || 'General'}</td>
                      </tr>
                      ${data.productId ? `
                      <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="font-weight: bold; color: #4b5563; font-size: 14px;">Product ID</td>
                        <td style="font-size: 14px;">${data.productId}</td>
                      </tr>
                      ` : ''}
                      ${data.quantity ? `
                      <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="font-weight: bold; color: #4b5563; font-size: 14px;">Quantity</td>
                        <td style="font-size: 14px;">${data.quantity}</td>
                      </tr>
                      ` : ''}
                    </table>

                    <div style="margin-top: 24px; padding: 20px; background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
                      <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563;">Message Details</h3>
                      <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                    </div>
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
