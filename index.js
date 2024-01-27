const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4 :uuidv4 }= require("uuid");
//..........method override .....................//
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
//................ejs setting .....................//...........................//
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let namelist=[
    {id:uuidv4(),
        name:"Akshay Dange",
     msg:"What is Your Name"},

    {id:uuidv4(),
        name:"Ritesh vazire",
        msg:"What are you doing now"},
        {id:uuidv4(),
            name:"Pavan attarkar",
            msg:"what to do by profession",
        },
        {id:uuidv4(),
            name:"manoj Lahudkar",
            msg:"Jay javan jay kisan",
        }
];

app.get("/posts",(req,res)=>{ 
   res.render("show.ejs",{namelist});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
  let {name, msg}=req.body;
  let id=uuidv4();
 namelist.push({id,name,msg});
 res.redirect("/posts");
 
});
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    const post= namelist.find((p)=>id === p.id);
    console.log(post);
    res.render("single.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let newmsg=req.body.msg;
    const post= namelist.find((p)=>id === p.id);
    post.msg= newmsg;
    console.log(post);
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    const post= namelist.find((p)=>id === p.id);
    res.render("edit.ejs",{post});
});
//......delete rout ..........
app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    namelist= namelist.filter((p)=>id !== p.id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log(`listing on port ${port}`);
})