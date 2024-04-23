import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import OtpRepository from "../repositories/OtpRepository";


// create instance of otpReppository
const otpReppository = new OtpRepository();

export const sendEmailWithVerification = async (
  email: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000) + "";
    const hashedOtp = await bcrypt.hash(otp, 10);

    const otpData = await otpReppository.createNewUser(hashedOtp, email);

    // Set up email data
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification Code",
      html: `
            <div style="font-family: Arial, sans-serif;">
                <h2 style="color: #333333;">Welcome to yoYO!</h2>
                <p style="color: #333333;">Thank you for signing up. To complete your registration, please use the following verification code:</p>
                <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <h1 style="font-size: 32px; color: #FF0000; margin: 0;">${otp}</h1>
                </div>
                <p style="color: #333333; margin-top: 20px;">Please note that this verification code expires after 5 minutes. If you don't verify your email within this time frame, you'll need to request a new code.</p>
                <p style="color: #333333; margin-top: 20px;">If you didn't sign up for yoYO, please disregard this email.</p>
                <p style="color: #333333; margin-top: 20px;">Best regards,<br/>The yoYO Team</p>
            </div>
        `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent: " + otp);
  } catch (error) {
    console.log(`Error from sendMail ${error}`);
  }
};
