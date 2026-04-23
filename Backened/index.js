import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js';
import applicantionRoute from './routes/application.route.js';
dotenv.config({});

 connectDB();
const app = express();

//middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}
app.use(cors(corsOptions));

// //api's
app.use("/api/user",userRoute);
app.use("/api/company",companyRoute);
app.use("/api/job",jobRoute);
app.use("/api/application",applicantionRoute);


const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})
