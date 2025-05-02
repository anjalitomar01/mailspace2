// const mongoose = require('mongoose');

//const DB = "mongodb+srv://ravishekharvfirst:Anaconda@mailspace.odp28.mongodb.net/?retryWrites=true&w=majority&appName=mailspace"; // 

// mongoose.connect(DB)
//     .then(() => console.log("Connected to MongoDB Atlas"))
//     .catch(err => console.error("MongoDB Connection Error:", err));



    const mongoose = require('mongoose');
    const DB = "mongodb+srv://rajputrashmi321:987654321@clustermail.is4kznl.mongodb.net/MailspaceDB?retryWrites=true&w=majority&appName=Clustermail"
   
mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("Database Connected")).catch((errr)=>{
    console.log(errr);
})