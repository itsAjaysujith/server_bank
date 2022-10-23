// server mongodb integration
// import

const mongoose=require('mongoose')

// for integration we use a connection string using mongoose
// use connect method from mongoose library
// a chance of parser related error so we need to avoid that warning add useNewUrlParser:true
mongoose.connect('mongodb://localhost:27017/bankserver',{useNewUrlParser:true})
// we connected to backend

// 2)model creation--it will be created as a class
// define database(bankserver) model--it is to connect the collections in database
// collection name users--so we need to give as User as model(thats should be singular of collection name and first letter capital)

const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:Number,
    balance:Number,
    transactions:[]
})

// export model to use in server
module.exports={
    User
}