const User = require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("listings/users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        let newUser = new User({email,username});
        const registerdUser= await User.register(newUser,password);
        console.log(registerdUser);
        req.login(registerdUser,(err)=>{
            if(err){
                return  next(err);
             }
             req.flash("success","Welcome to wanderers");
             res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
};

module.exports.renderLoginForm =(req,res)=>{
    res.render("listings/users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to wanderers!");
    let redirectUrl = res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","Logging Out!");
        res.redirect("/listings");
    });
};