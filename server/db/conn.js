// const mongoose = require('mongoose');

// const DB = "mongodb+srv://ravishekharvfirst:Anaconda@mailspace.odp28.mongodb.net/"; // 

// mongoose.connect(DB)
//     .then(() => console.log("Connected to MongoDB Atlas"))
//     .catch(err => console.error("MongoDB Connection Error:", err));



    const mongoose = require('mongoose');
    const DB ="mongodb+srv://rajputrashmi321:AETaXiLuLI2UoNjk@clustertest.cwyrb.mongodb.net/spaceDB?retryWrites=true&w=majority&appName=ClusterTest"

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("Database Connected")).catch((errr)=>{
    console.log(errr);
})