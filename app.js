const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const email=req.body.email;
  const name=req.body.name;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        Fname:name

      }
    ]
  };
  const json=JSON.stringify(data);
  const url="https://us2.api.mailchimp.com/3.0/lists/2678558c05";
  const options={
    method:"POST",
    auth:"madhu:3a9d9bf729370e866d59b89cf1ca94ae-us2"
  }
  const request=https.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(json);
  request.end();

});
app.listen(3000,function(){
  console.log("server is running ");

});
//api list
//2678558c05
//api key
//3a9d9bf729370e866d59b89cf1ca94ae-us2
