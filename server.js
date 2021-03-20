const express=require('express')
const nodemailer=require('nodemailer');
const app=express();
const PORT =process.env.PORT || 5000;
app.use(express.static('public'));
app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/public/index.html')
})

app.post('/',(req,res)=>{
    console.log(req.body)
    const transpoter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'vipul1999agrawal@gmail.com',
            pass:'YOUR_PASSWORD '
        }
    })
    const mailOptions={
        from:req.body.email,
        to:'vipul1999agrawal@gmail.com',
        subject:`Messagefrom ${req.body.email}: ${req.body.subject}`,
        text:req.body.message
    }
    transpoter.sendMail(mailOptions,(error,info)=>{
        if(error) {
            console.log(error);
            res.send('error');
        }
        else
        {
            res.send('success')
        }
    })
})
app.listen(PORT ,()=>{
    console.log(`serving running on ${PORT}`)
})
