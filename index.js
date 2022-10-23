// here we create server
// import express and store in a constant variable
const express=require('express')
const jwt=require('jsonwebtoken')
const cors=require('cors')



//2nd step app creation- using express

const app=express()


// command to share data via cors to frontend--connection creation
// orgin is url of orgin --angular
app.use(cors({origin:'http://localhost:4200'}))

// to parse json to js data
app.use(express.json())

// 3rd step--create port number--in a 3000 serires port number--using listen method

app.listen(3000,()=>{console.log('server started at port number 3000')})

// server creation completed-----------


// inorder to import data service file from service folder to use register function
const dataService=require('./service/dataService')


// 4) resolve request http request
// get request--in agular we use empty string to show in lamding page here we use slash for first page--('/')

// app.get('/',(req,res)=>{
//     res.send('hai welcome to web page $$$$')

// })


// post method


// put method

app.put('/',(req,res)=>{
    res.send('put method')

})

// patch method

app.patch('/',(req,res)=>{
    res.send('patch method')

})

// delte method

app.delete('/',(req,res)=>{
    res.send('delete method')

})

// inorder to update node without rerun use nodemon


// ANGULAR PROJECT BANK

// register page request
app.post('/register',(req,res)=>{
    // console used to look the info passed
    // here body in json format so need to parse by calling use method above--app.use(express.json)
    console.log(req.body);
    // earlier we stored below line in result but now after mongo db model class result will be in asynchronous form that can be stored in a const--it is to be used by then method
    dataService.register(req.body.acno,req.body.username,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)

    })
    
  
    
})

// middleware creation--to check token is valid--using verify method

const jwtmiddleware=(req,res,next)=>{
     // try and catch to change the error code--error when middleware case is not valid--it will be server error--it should not be server error to change to client side error 400

    try{
        console.log('router specific middleware started');
        // below is the token we generated--it will in the body of that request--we stored it as token
        token=req.headers['token1']
        // validate token
        const data=jwt.verify(token,'secretkey123')
        console.log(data);
    
        // to take next request after the working of middleware
        next()

    }
   

    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'please login'


        })
    }
}


// login page request

app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acnum,req.body.pawrd).then(result=>{
        res.status(result.statusCode).json(result)

    })
    
  

})

// deposit page request
// call the above middleware in deposit after the path

app.post('/deposit',jwtmiddleware,(req,res)=>{
   
    
        console.log(req.body);
        dataService.deposit(req.body.acnum,req.body.pas,req.body.amt).then(result=>{
            res.status(result.statusCode).json(result)

        })
  

})

// withdraw page request

app.post('/withdraw',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acnum1,req.body.pas1,req.body.withd).then(result=>{
        res.status(result.statusCode).json(result)

    })
   
  

})

// transaction page request

app.post('/transaction',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    dataService.getTaransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)

    })
   
  

})

// in delete request data cant pass in body so pass in params--like any number after http

app.delete('/deleteacc/:acno',(req,res)=>{
    console.log(req.body);
    dataService.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)

    })
   
  

})



