// ====================================== generate html (code templet) ================================

const templet = ({ userName, otp }) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f4f6f8;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      background: #2563eb;
      color: #fff;
      text-align: center;
      padding: 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
    }
    .content {
      padding: 30px;
      text-align: center;
      color: #333;
    }
    .otp {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #2563eb;
      margin: 20px 0;
    }
    .footer {
      background: #f9fafb;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${userName}</strong>,</p>
      <p>Use the following One-Time Password (OTP) to verify your email:</p>
      <div class="otp">${otp}</div>
      <p>This code will expire in <strong>10 minutes</strong>.</p>
    </div>
    <div class="footer">
      <p>If you didn’t request this, you can safely ignore this email.</p>
    </div>
  </div>
</body>
</html>`;
};

// =============================== default export templet ================================
export default templet;
