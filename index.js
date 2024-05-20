const express= require("express");
const app=express();
const port=8080;
const path= require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.set("views",path.join(__dirname,"views"))

let posts=[
    {   id:uuidv4(),
        username:"rohit",
        content:"hello Rohit"
    },
    {    id:uuidv4(),
        username:"harshit",
        content:"hello Harshit"
    },
    { id:uuidv4(),
        username:"Om",
        content:"hello Om"
    },
    { id:uuidv4(),
        username:"shivam",
        content:"hello shivam"
    }

];

app.listen(port, ()=>{
    console.log("listening to port");

})

app.get("/",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.post("/",(req,res)=>{
    let {username,content}=req.body;
    let id= uuidv4();
   
    posts.push({id,username,content});
    res.redirect("/");
})
app.get("/posts/show/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
   res.render("edit.ejs",{post});
})
app.patch("/posts/edit",(req,res)=>{
    let {id,contents}=req.body;
   
    let post=posts.find((p)=>id===p.id);
    post.content=contents;
    res.redirect("/");
})
app.get("/posts/delete/:id",(req,res)=>{ 
    let {id}=req.params;
   
    posts=posts.filter((p)=>id !==p.id);
    res.redirect("/");

})

app.get("/posts/show/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    if(post)
    {
    res.render("show.ejs",{post});
    }
else
 res.send("Id is invalid");
})
app.get("/posts/new",(req,res)=>{
res.render("new.ejs");})