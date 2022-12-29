const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const place=req.body.place;
  const appid="0c6dd647e65670a77750ca8d0de9f442";
  const str="https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+appid;
  https.get(str,function(response){
    response.on("data",function(data){
      const weather=JSON.parse(data);
      const tempr=weather.main.temp;
      const description=weather.weather[0].main;
      const ico=weather.weather[0].icon;
      const url="http://openweathermap.org/img/wn/"+ico+"@2x.png";
      res.render("index",{temp:tempr, desc:description, image:url});
      res.send();
    });
  });
});
app.listen(process.env.PORT || 3000,function(){
  console.log("server connected on port 3000 successfully");
});
