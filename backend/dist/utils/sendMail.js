"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailForForgotPassword = exports.sendEmailWithVerification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const OtpRepository_1 = __importDefault(require("../repositories/OtpRepository"));
// create instance of otpReppository
const otpReppository = new OtpRepository_1.default();
const sendEmailWithVerification = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
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
        const hashedOtp = yield bcrypt_1.default.hash(otp, 10);
        const otpData = yield otpReppository.createNewUser(hashedOtp, email);
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
        yield transporter.sendMail(mailOptions);
        console.log("Email sent: " + otp);
    }
    catch (error) {
        console.log(`Error from sendMail ${error}`);
    }
});
exports.sendEmailWithVerification = sendEmailWithVerification;
const sendEmailForForgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
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
        // Generate OTP for password reset
        const otp = Math.floor(1000 + Math.random() * 9000) + "";
        const hashedOtp = yield bcrypt_1.default.hash(otp, 10);
        // Save the OTP for later verification
        yield otpReppository.createNewUser(hashedOtp, email);
        // Set up email data
        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset Code",
            html: `
            <div style="font-family: Arial, sans-serif;">
                <h2 style="color: #333333;">Reset Your Password</h2>
                <p style="color: #333333;">You have requested to reset your password. Please use the following code to proceed:</p>
                <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <h1 style="font-size: 32px; color: #FF0000; margin: 0;">${otp}</h1>
                </div>
                <p style="color: #333333; margin-top: 20px;">Please note that this reset code expires after 5 minutes. If you don't reset your password within this time frame, you'll need to request a new code.</p>
                <p style="color: #333333; margin-top: 20px;">If you didn't request a password reset, please disregard this email.</p>
                <p style="color: #333333; margin-top: 20px;">Best regards,<br/>Your Application Team</p>
            </div>
        `,
        };
        // Send the email
        yield transporter.sendMail(mailOptions);
        console.log("Email sent for password reset: " + otp);
    }
    catch (error) {
        console.log(`Error from sendMail ${error}`);
    }
});
exports.sendEmailForForgotPassword = sendEmailForForgotPassword;
