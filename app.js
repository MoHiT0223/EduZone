 const express =  require("express");
 const ejs = require("ejs");
 const bodyParser = require("body-parser");
 const request = require("request");
const https = require("https");


 const app = express();
 app.set('view engine', 'ejs');
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static("public"));

 const port = 3000;

app.get("/", function(req, res){
    res.render("home");
})


app.get("/course", function(req, res){
    res.render("course");
})
app.get("/login", function(req, res){
    
    res.render("login");
})
app.get("/contact", function(req, res){
    res.render("contact");
})
app.get("/codingPractice", function(req, res){
    res.render("codingPractice");
})
app.get("/website", function(req, res){
    res.render("website");
});
app.get("/snippit", function(req, res){
    res.render("snippit");
});
app.get("/application", function(req, res){
    res.render("application");
});
app.get("/success", (req, res)=>{
    res.render("success");
})
app.post("/contact", function(req, res){
    var firstname = req.body.firstname;
        var lastName = req.body.lastname;
        var emailinput = req.body.emailinput;
        
        const data = {
            members: [
                {
                    "email_address": emailinput,
                    "status": "subscribed",
                    "merge_fields": {
                        "FNAME": firstname,
                        "LNAME": lastName
                    }
                }
            ]
        };
        const jsonData = JSON.stringify(data);
        const url = "https://us9.api.mailchimp.com/3.0/list/78eb8c9fba";
    
        const option = {
            method: "POST",
            auth: "MoHiT_23:6f7849c530d95ea62b1847742232e3ad-us9"
        }
        const request = https.request(url, option, function(response){
            if(response.statusCode === 200){
                res.redirect("success");
            }else{
                res.redirect("/");
            }
            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
        })
        request.write(jsonData);
        request.end();
        
    
    })
    
 app.listen(port, function(){
    console.log("this is running on 3000 port!!!");
 });