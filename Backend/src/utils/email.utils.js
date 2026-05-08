import crypto from 'crypto'

export const generateOTP = () => {
    return crypto.randomInt(100000, 999999);
}
export const generateHTML = (otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; color: #333;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <!-- Header -->
            <tr>
                <td style="padding: 40px 20px; text-align: center; background-color: #4f46e5;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Verify Your Account</h1>
                </td>
            </tr>
            
            <!-- Body -->
            <tr>
                <td style="padding: 40px 30px;">
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Hi there,</p>
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Thank you for joining our real-time collaborative platform. To complete your registration, please use the following One-Time Password (OTP):</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="display: inline-block; padding: 15px 30px; font-size: 32px; font-weight: bold; color: #4f46e5; background-color: #eef2ff; border: 2px dashed #4f46e5; letter-spacing: 5px; border-radius: 4px;">
                            ${otp}
                        </span>
                    </div>
                    
                    <p style="font-size: 14px; color: #666; line-height: 1.6;">This code is valid for <b>5 minutes</b>. If you did not request this email, you can safely ignore it.</p>
                </td>
            </tr>
            
            <!-- Footer -->
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #f9fafb; color: #9ca3af; font-size: 12px;">
                    <p style="margin: 0;">&copy; 2026 Real-Time Collab Inc. | Sahibzada Ajit Singh Nagar, Punjab</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

export const generateHTMLForPassUpdation = (otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; color: #333;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <!-- Header -->
            <tr>
                <td style="padding: 40px 20px; text-align: center; background-color: #4f46e5;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Password updation code</h1>
                </td>
            </tr>
            
            <!-- Body -->
            <tr>
                <td style="padding: 40px 30px;">
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Hi there,</p>
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">This is your verification code. To update your password, please use the following One-Time Password (OTP):</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="display: inline-block; padding: 15px 30px; font-size: 32px; font-weight: bold; color: #4f46e5; background-color: #eef2ff; border: 2px dashed #4f46e5; letter-spacing: 5px; border-radius: 4px;">
                            ${otp}
                        </span>
                    </div>
                    
                    <p style="font-size: 14px; color: #666; line-height: 1.6;">This code is valid for <b>5 minutes</b>. If you did not request this email, you can safely ignore it.</p>
                </td>
            </tr>
            
            <!-- Footer -->
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #f9fafb; color: #9ca3af; font-size: 12px;">
                    <p style="margin: 0;">&copy; 2026 Real-Time Collab Inc. | Sahibzada Ajit Singh Nagar, Punjab</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};
