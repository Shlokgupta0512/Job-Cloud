import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(user, 201, res, "User Registered!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});


export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  console.log(`Backend getUser: Fetching data for ${user?.email}, Role: ${user?.role}`);
  res.status(200).json({
    success: true,
    user,
  });
});

export const clerkSync = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, role } = req.body;

  if (!email || !role) {
    return next(new ErrorHandler("Email and Role are required for sync.", 400));
  }

  // Determine role based on admin email (server-side authority)
  const adminEmailFromEnv = process.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
  const hardcodedAdmin = "shlokg166@gmail.com";
  let finalRole = role;

  // Force Employer role if email matches admin email
  if (email && (
    email.toLowerCase().trim() === hardcodedAdmin.toLowerCase() ||
    (adminEmailFromEnv && email.toLowerCase().trim() === adminEmailFromEnv.toLowerCase().trim())
  )) {
    finalRole = "Employer";
    console.log(`Backend: Recognized admin email ${email}. FORCING Employer role.`);
  }

  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        name: name || "Clerk User",
        role: finalRole,
      },
      $setOnInsert: {
        phone: phone || 0,
        password: "CLERK_USER_PASSWORD_BYPASS",
      }
    },
    { new: true, upsert: true, runValidators: false }
  );

  console.log(`User synced: ${user.email}, Final Role: ${user.role}`);

  sendToken(user, 200, res, "Clerk Synced Successfully!");
});