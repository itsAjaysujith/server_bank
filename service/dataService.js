
// import library to generate token
const jwt=require('jsonwebtoken')
// import model--by importing file
const db=require('./db')


userDetails={
    1000:{acno:1000,username:"amal",password:123,balance:100000,transactions:[]},
    1001:{acno:1001,username:"bhim",password:123,balance:100000,transactions:[]},
    1002:{acno:1002,username:"ajay",password:123,balance:100000,transactions:[]},
    1003:{acno:1003,username:"hari",password:123,balance:100000,transactions:[]}
  }


var register=(acno,username,password)=>{


  // want to give return inoreder it was an asynchronous request and take using then
  return db.User.findOne({acno}).then(user=>{
    if(user){
      return {
        statusCode:401,
        status:false,
        message:'user already exist'
        
       }
      }
       else{
        // insert data into model
        const newUser=new  db.User({acno,username,password,balance:0,transactions:[]})
        // to store object in collection
        newUser.save()
        return  {
          statusCode:201,
          status:true,
          message:'registration success'
        }
       }

    

  })
    
  
  }

    
  var login=(acnum,pawrd)=>{

    return db.User.findOne({acno:acnum,password:pawrd}).then(user=>{
      if(user){
        currentUser=user.username
        currentAcno=acnum
        // to identifies whos token we need to give any data as attribute to sign method as object--here we use acnum of user--and add astring to store token should be without space
        // this is the token from client
        const token=jwt.sign({ currentAcnum:acnum},'secretkey123')

        
        

        return {
          statusCode:201,
          status:true,
          message:'login success',
          currentUser,
          currentAcno,
          token
          
        }

      }else{
        return {
          statusCode:404,
          status:false,
          message:'incorrect account number and password'
        }

      }
    })
    
  }

  
  var deposit=(acnum,pas,amt)=>{
    
    // here amount in string type so we need to convert it into number using parseInt method
    var amnt=parseInt(amt) 
     
   return db.User.findOne({acno:acnum,password:pas}).then(user=>{
    if(user){
      user.balance+=amnt
      user.transactions.push({
        type:'credit',amount:amnt
      })
      // inorder to save the updations in mongodb
      user.save()

      return {
        statusCode:200,
        status:true,
        message:`${amnt} credited and new balance ${user.balance}`
      }
    }else{
      return {
        statusCode:401,
        status:false,
        message:'incorrect account number or password'

       }

    }
   })
    
  }

  var withdraw=(acnum1,pas1,withd)=>{
    
    // here amount in string type so we need to convert it into number using parseInt method
    var amnt=parseInt(withd) 

    return db.User.findOne({acno:acnum1,password:pas1}).then(user=>{
      if(user){
        if(user.balance>amnt){
          user.balance-=amnt
          user.transactions.push({
            type:'debit',amount:amnt
          })
          // inorder to save the updations in mongodb
          user.save()
    
          return {
            statusCode:200,
            status:true,
            message:`${amnt} debited and new balance ${user.balance}`
          }

        }else{
          return{
            statusCode:401,
            status:false,
            message:'insufficient balance'
          }

        }
       
      }else{
        return {
          statusCode:401,
          status:false,
          message:'incorrect account number or password'
  
         }
  
      }
     })
    
  }

  var getTaransaction=(acno)=>{

    return db.User.findOne({acno}).then(user=>{
      if(user){
        return {
          statusCode:200,
          status:true,
          transactions: user['transactions']
        }

      }else{
        return{
          statusCode:400,
          status:false,
          message:'user doesnt exist'
        }

      }
    })

   
    

  }

  var deleteAcc=(acno)=>{
    return db.User.deleteOne({acno}).then(user=>{
      if(user){
        return {
          statusCode:200,
          status:true,
          message:"deleted successfully"
        }

      }else{
        return{
          statusCode:400,
          status:false,
          message:'user doesnt exist'
        }

      }

    })
  }
    
    

  

  module.exports={
    register,login,deposit,withdraw,getTaransaction,deleteAcc
  }