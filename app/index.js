
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const nodemailer = require('nodemailer');
const dbrl="mongodb+srv://admin:dipak123@cluster0.hefx5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const app=express();

app.use(
    bodyParser.urlencoded({
        extended:true
    })
)
app.use(bodyParser.json());
app.use(cors())
mongoose.connect(dbrl,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected")
}).catch(()=>{
    console.log("not connected")
})

const AdminSchema=mongoose.Schema({
    email:"",
    password:"",
},
{
    timestamps:true
})

const DoctorSchema=mongoose.Schema({
    name:"",
    specialization:"",
    regno:"",
    degree:"",
    mob:""
},
{
    timestamps:true
}
)
const PatientSchema=mongoose.Schema({
    name:"",
    dob:"",
    patientno:"",
    disease:"",
    detail:[],
    regno:"",
    gender:"",
    age:"",
},
{
    timestamps:true
})
const UserSchema=mongoose.Schema({
    regno:"",
    email:"",
    password:"",
},
{
    timestamps:true
})
const Admin=mongoose.model("admin",AdminSchema)
const User=mongoose.model("user",UserSchema);
const Doctor=mongoose.model("doctor",DoctorSchema);
const Patient=mongoose.model("patient",PatientSchema);


app.delete("/patient/:id",(req,res)=>{
    console.log("deleting",req.params.id)
    Patient.findByIdAndRemove(req.params.id).then(patient=>{
        patient.find().then(data=>{
            res.send(data)
        }).catch((err)=>{
            res.send({
                message:"unable to delete"
            })
        })
    }).catch((err)=>{
        res.send({
            message:"unable to delete"
        })
    })
})

app.post("/admin",(req,res)=>{
    const admin=new Admin({
        email:req.body.email,
        password:req.body.password
    })
    console.log(admin)
    admin.save().then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"error"
        })
    })
})
app.get("/admin",(req,res)=>{
    
    Admin.find().then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"error"
        })
    })
})

app.post("/user",(req,res)=>{
    const user=new User({
        regno:req.body.regno,
        email:req.body.email,
        password:req.body.password,
        
    })
    console.log(user)
    user.save().then(data=>{

      
            var smtpTransport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                secureConnection: false,
                port: 587,
                auth: {
                    user: "coolrazi1998@gmail.com",// your actual email
                    pass: "razi1998!"       // your actual password
                }
            });
            var mailOptions = {
                from: "coolrazi1998@gmail.com",
                to: req.body.email,
                bcc: "", // bcc is optional.
                subject: "Greetings Doc, here are your login credentials for the Patient Tracker's App",
                
                text:`Hello Doctor, 
                    You have been successfully registered in Patient Tracker's App
                    Your login credentials: 
                    Email: ${req.body.email}
                    Default password:${req.body.password} 
                    Registration No: ${req.body.regno}
                    please follow this link to login ${req.body.location}
                    and remember the registration no. to change your password.

                    Please change your default password.

                    If you has any query, reach us at care@int.com

                PLEASE DONOT REPLY THIS EMAIL IS AUTO-GENERATED. `
            }
            //console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    res.send("error");
                    console.log("error")
                } else {
                    //console.log("Message sent: " + response.message);
                    res.send("sent");
                    console.log("email is sent")
                }
            });
           
        

        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"unable to add"
        })
    })
})
app.get("/user",(req,res)=>{
    User.find().then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"unable to get"
        })
    })
})

app.post("/patient",(req,res)=>{
    const patient=new Patient({
        name:req.body.name,
        dob:req.body.dob,
        patientno:req.body.patientno,
        disease:req.body.disease,
        detail:req.body.detail,
        regno:req.body.regno,
        gender:req.body.gender,
        age:req.body.age
    })
    console.log(patient);
    patient.save().then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"unable to add patient"
        })
    })
})
app.post("/doctor",(req,res)=>{
  const doctor=new Doctor({
     name:req.body.name,
     specialization:req.body.specialization,
     regno:req.body.regno,
     degree:req.body.degree,
     mob:req.body.mob
  })
  console.log(doctor);
  doctor.save().then(data=>{

    

      res.send(data)
  }).catch((err)=>{
      res.send({
          message:"unable to send"
      })
  })
})
app.get("/patient",(req,res)=>{
    Patient.find().then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"unable to get data"
        })
    })
})
app.get("/patient/:patientno",(req,res)=>{
   
    Patient.findOne({patientno:req.params.patientno}
     ).then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"unable to get data"
        })
    })
})
app.get("/user/:id",(req,res)=>{
    console.log("gettin======",req.params.id)
    User.findOneAndUpdate({regno:req.params.id}).then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"err"
        })
    })
})
app.get("/doctor/:id",(req,res)=>{
    console.log("regno is coming",req.params.regno)
    Doctor.findOneAndUpdate({regno:req.params.id}).then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"error"
        })
    })
})
app.post("/patient/:patientno",(req,res)=>{
  
    Patient.findOneAndUpdate({patientno:req.params.patientno},{
        name:req.body.name,
        dob:req.body.dob,
        patientno:req.body.patientno,
        disease:req.body.disease,
        detail:req.body.detail,
        regno:req.body.regno,
        age:req.body.age,
        gender:req.body.gender
    },{new:true}).then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"unable to get data"
        })
    })
})
app.post("/admin/:id",(req,res)=>{
    console.log("adming updating",req.body.password)
    Admin.findByIdAndUpdate(req.params.id,{
        email:req.body.email,
        password:req.body.password,
    },{new: true}).then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"err"
        })
    })
})
app.post("/user/:id",(req,res)=>{
    console.log("posting=====",req.params.id)
    User.findOneAndUpdate({regno:req.params.id},{
        regno:req.body.regno,
        name:req.body.name,
        password:req.body.password,
    },{new:true}).then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"err"
        })
    })
})
app.get("/doctor",(req,res)=>{
    Doctor.find().then(data=>{
        res.send(data)
    }).catch((err)=>{
        res.send({
            message:"unable to get"
        })
    })
})






app.listen(4000,()=>{
    console.log("4000 is running")
})