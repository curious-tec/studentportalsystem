const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/studentsDB';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var ResultSchema = new Schema({
Result: Number,
Attendance: Number,
Review: String
})

var StudentSchema = new Schema({
USN: String,
DOB: Number,
password: Number,
performance: ResultSchema
});

var student = mongoose.model('student', StudentSchema );

var result = mongoose.model('result', ResultSchema);

var result2 = new result ({
Result: 8.7,
Attendance: 78,
Review: "Is a hardworking student."
});

// result2.save();

// var student1 = new student ({
//     USN: "1NT19CS042",
//     DOB: 12062000,
//     password: 7412,
//     performance: result1
// });

//  student1.save();

student.updateOne({USN: "1NT19CS094"}, {performance: result2}, function(err){
if(err){
console.log(err);
}
else{
console.log("succesfully updated document.")
}
});

student.find(function(err, students){
if(err){
console.log(err);
}
else
{
// mongoose.connection.close();
students.forEach(function(student){
console.log(student.USN);
});
}
});

// student.deleteMany({USN: "mihir"}, function(err){
//     if(err){
//         console.log(err);
//     }
//     else
//     {
//         console.log("Deleted successfully");
//     }
// });

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function(){
console.log("Server is running on port 3000");
})

app.use(express.static("public"));

app.get('/',function(req, res){
res.sendFile(__dirname + "/landing.html")
})
app.get('/teacher',function(req, res){
res.sendFile(__dirname + "/tech.html")
})
app.get('/student',function(req, res){
res.sendFile(__dirname + "/index.html")
})
// app.get('/demo', function(req, res){
//     var file = db.collection('students').find({USN: usn});
//     file.each(function(err, doc){
//         roll = doc.USN;
//     })
//     res.sendFile(__dirname + "/creat.html")
// })

app.get('/demo', function(req, res){
res.sendFile(__dirname + '/creat.html')
})


app.post('/student', function(req, res){
var usn = req.body.usn;
var dob = req.body.dob;
var passwd = req.body.passwd;

var check = new student ({
USN: usn,
DOB: dob,
password: passwd
});
student.find(function(err, students){
if(err){
console.log(err);
}
else
{
// mongoose.connection.close();
students.forEach(function(student){
if(check.USN == student.USN){
if(check.DOB == student.DOB)
if(check.password == student.password)
{
console.log("logged in successfully.");
res.redirect('/demo');
}

else{
res.redirect('/student');
}
}
});
}
});
})

