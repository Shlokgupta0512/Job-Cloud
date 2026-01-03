import mongoose from "mongoose";
import { Job } from "./models/jobSchema.js";
import { User } from "./models/userSchema.js";
import { config } from "dotenv";

config({ path: "./config/config.env" });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "JobCloud",
        });
        console.log("Connected to database for seeding.");

        // 1. Create a dummy Employer
        let employer = await User.findOne({ role: "Employer" });
        if (!employer) {
            employer = await User.create({
                name: "Dummy Employer",
                email: "employer@example.com",
                phone: 9876543210,
                password: "password123",
                role: "Employer",
            });
            console.log("Created dummy employer.");
        } else {
            console.log("Found existing employer:", employer.email);
        }

        // 2. Create dummy Jobs
        const dummyJobs = [
            {
                title: "Software Engineer",
                description: "Innovative software engineer needed for building high-performance applications using modern technologies and best practices. Minimum 2 years of experience.",
                category: "Graphics & Design",
                country: "India",
                city: "Pune",
                location: "Kharadi, EON IT Park, Phase 2, Office 405",
                fixedSalary: 65000,
                postedBy: employer._id,
            },
            {
                title: "React Developer",
                description: "Join our team to build amazing user interfaces. Expertise in React hooks, state management (Redux/Zustand), and responsive design is required.",
                category: "Mobile App Development",
                country: "India",
                city: "Bangalore",
                location: "HSR Layout, Sector 6, Main Road, Above HDFC Bank",
                salaryFrom: 70000,
                salaryTo: 100000,
                postedBy: employer._id,
            },
            {
                title: "Node.js Developer",
                description: "We are looking for a Node.js developer to manage the interchange of data between the server and the users. Focus on performance and scalability.",
                category: "Frontend Web Development",
                country: "India",
                city: "Delhi",
                location: "Connaught Place, Inner Circle, Block G, Unit 12",
                fixedSalary: 85000,
                postedBy: employer._id,
            },
            {
                title: "UI/UX Designer",
                description: "Creative designer wanted to craft beautiful user experiences. Proficiency in Figma, Adobe XD, and user research is a must for this role.",
                category: "Graphics & Design",
                country: "India",
                city: "Hyderabad",
                location: "Gachibowli, Financial District, Cyber Towers",
                fixedSalary: 45000,
                postedBy: employer._id,
            },
            {
                title: "Mobile App Developer",
                description: "Build cutting-edge mobile applications for iOS and Android platforms. Strong experience with Flutter or React Native is preferred for this position.",
                category: "Mobile App Development",
                country: "USA",
                city: "San Francisco",
                location: "Market Street, SoMa District, Suite 500",
                salaryFrom: 110000,
                salaryTo: 150000,
                postedBy: employer._id,
            }
        ];

        await Job.deleteMany({});
        console.log("Cleared existing jobs.");
        const insertedJobs = await Job.insertMany(dummyJobs);
        console.log(`Successfully inserted ${insertedJobs.length} dummy jobs.`);

        const count = await Job.countDocuments();
        console.log(`Total jobs in database: ${count}`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
