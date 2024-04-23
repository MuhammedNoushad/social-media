import IOtp from "../interfaces/IOtp";
import Otp from "../models/otp.model";

class OtpRepository {
  // Create new user
  async createNewUser(otp: string, email: string): Promise<IOtp | null> {
    try {
      // Remove the existing otp
      await Otp.deleteMany({ email });

      // Crete a new otp
      const newOtp = new Otp({ otp, email });
      await newOtp.save();
      return newOtp.toObject();
    } catch (error) {
      console.error("Error from createOtp in OtpRepository", error);
      return null;
    }
  }

  // Find existing otp
  async findOtpByEmail(email: string): Promise<IOtp | null> {
    try {
      const existingOtp = await Otp.findOne({ email });
      return existingOtp ? existingOtp.toObject() : null;
    } catch (error) {
      console.error("Error from findOtpByEmail in OtpRepository", error);
      return null;
    }
  }
}

export default OtpRepository;
