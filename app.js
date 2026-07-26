import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
const app=express();
const port =process.env.PORT || 3000;;
const posts=[];
let postid=1;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.post("/create",(req,res)=>
{
    // console.log(`Post button clicked`);
    // res.send("post recieved");
    posts.push({
        id:postid,
        title: req.body.title,
        content:req.body.content
        
    });
   res.redirect("/");
    console.log(posts);
    postid++;
});
app.get("/",(req,res)=>
{
    res.render("index.ejs",{
        posts:posts
    });

});
app.post("/edit/:id",(req,res)=>
{
    const post = posts.find(post => post.id === Number(req.params.id));
    post.title=req.body.title;
    post.content=req.body.content;
     res.redirect("/");
})
app.get("/edit/:id",(req,res)=>
{
    const post=posts.find(post=>post.id===Number(req.params.id));
    res.render("edit.ejs",{
    post:post

});

});
app.post("/delete/:id",(req,res)=>
{
    const index = posts.findIndex(
    post => post.id === Number(req.params.id)
);
posts.splice(index,1);
res.redirect("/");
})
app.listen(port,()=>
{
    console.log(`It is running on the port ${port}`);
});
