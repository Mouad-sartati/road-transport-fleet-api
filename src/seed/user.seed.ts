import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { Role, UserStatus } from "../types/enums.js";


const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const users = [
      ["Adam", "Smith", "adam.smith"],
      ["John", "Doe", "john.doe"],
      ["Mohamed", "Ali", "mohamed.ali"],
      ["Youssef", "Amrani", "youssef.amrani"],
      ["Omar", "Hassan", "omar.hassan"],
      ["Karim", "Bennani", "karim.bennani"],
      ["Ahmed", "Tazi", "ahmed.tazi"],
      ["Hamza", "Idrissi", "hamza.idrissi"],
      ["Mehdi", "Alaoui", "mehdi.alaoui"],
      ["Anas", "Fassi", "anas.fassi"],
      ["Said", "Mansouri", "said.mansouri"],
      ["Rachid", "Naciri", "rachid.naciri"],
      ["Bilal", "Khalid", "bilal.khalid"],
      ["Amine", "Ziani", "amine.ziani"],
      ["Zakaria", "Berrada", "zakaria.berrada"],
      ["Ibrahim", "Salim", "ibrahim.salim"],
      ["Hamid", "Farah", "hamid.farah"],
      ["Ayoub", "Mouline", "ayoub.mouline"],
      ["Ismail", "Chraibi", "ismail.chraibi"],
      ["Nabil", "Tahiri", "nabil.tahiri"],
    ];

    const hashedPassword = await bcrypt.hash("Password123!", 10);

    const usersToInsert = users.map(([firstname, lastname, username]) => ({
      firstname,
      lastname,
      email: `${username}@example.com`,
      password: hashedPassword,
      role: Role.CHAUFFEUR,
      status: UserStatus.ACTIVE,
    }));

    const result = await User.insertMany(usersToInsert);

    console.log(`Successfully created ${result.length} users`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding users:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedUsers();
