const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT || 5000
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.DATABASE_URL;

app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({ extended: true }));

const {linkRouter} = require("./routes/link")
const {linkTreeRouter} = require("./routes/linkTree")

app.use("/api/v1/link", linkRouter)
app.use("/api/v1/linkTree", linkTreeRouter)

async function main() {
    try {
      await mongoose.connect(dbUrl);
      console.log('Connected to MongoDB');
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error('Error connecting to the database', error);
      process.exit(1); 
    }
  }
  
  main()    