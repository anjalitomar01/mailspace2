// const mongoose = require('mongoose');

const DB = "mongodb+srv://ravishekharvfirst:Anaconda@mailspace.odp28.mongodb.net/?retryWrites=true&w=majority&appName=mailspace"; // 

// mongoose.connect(DB)
//     .then(() => console.log("Connected to MongoDB Atlas"))
//     .catch(err => console.error("MongoDB Connection Error:", err));



    const mongoose = require('mongoose');
    // const DB ="mongodb+srv://rajputrashmi321:AETaXiLuLI2UoNjk@clustertest.cwyrb.mongodb.net/spaceDB?retryWrites=true&w=majority&appName=ClusterTest"
//const DB ="mongodb+srv://anjalithakur96505:vqrkxZHioMMtQoFk@cluster2.mqa6q.mongodb.net/authuser?retryWrites=true&w=majority&appName=Cluster2"
mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("Database Connected")).catch((errr)=>{
    console.log(errr);
})