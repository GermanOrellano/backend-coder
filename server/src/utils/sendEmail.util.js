import { createTransport } from "nodemailer";
import env from "../utils/env.util.js";

async function sendEmail(data) {
  try {
    const transport = createTransport({
      service: "gmail",
      port: env.PORT,
      auth: { user: env.GOOGLE_EMAIL, pass: env.GOOGLE_PASSWORD },
    });
    await transport.sendMail({
      from: `CODER <${env.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `USER ${data.name.toUpperCase()} REGISTERED`,
      html: `<h1>USER REGISTERED</h1>
      <body>
        <p>Verify Code: ${data.verifiedCode}</p>
      </body>`,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;
