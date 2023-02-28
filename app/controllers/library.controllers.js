const db = require("../models");
const Library = db.library;
exports.getbook = (req, res) => {
   Library.findAll().then(data=>{
    res.status(200).send(data)
   })
};

exports.findbook = (req, res) => {
    if(req.body.Book_Name ===undefined){
        return res.status(400).send({message:"error"})
          
    }
    Library.findOne({
        where: {
            Book_Name: req.body.Book_Name
        }
      })
      .then(data=>{
        if(!data){
            res.status(200).send({message:"book not found"})
        }
        else{
            res.status(200).send(data)
        }
        console.log(book)
      })

    
};

exports.addbook = (req,res) =>{
    // let {Book_Name} = req.body
    Library.findOne({
        where:{
            Book_Name:req.body.Book_Name
        }
    }).then(data =>{
        console.log(data)
        if(data){
            res.status(200).send({message:"already have these book"})
        }
        else{
            Library.create({
                Book_Name: req.body.Book_Name,
                Type: req.body.Type,
                Price: req.body.Price
            }).then(f=>{
                return res.status(200).send({message:"finish add book"})
            })
        }
    })
}

exports.updatebook = (req,res) =>{
    // let {Book_Name} = req.body
    Library.findOne({
        where:{
            Book_Name:req.body.Book_Name
        }
    }).then(data =>{
        console.log(data)
        if(!data){
            res.status(200).send({message:"not have these book"})
        }
        else{
            data.update({
                Book_Name: req.body.Book_Name,
                Type: req.body.Type,
                Price: req.body.Price
            }).then(f=>{
                return res.status(200).send({message:"finish update book"})
            })
        }
    })
}

exports.deletebook = (req,res) =>{
    // let {Book_Name} = req.body
    Library.destroy({
        where:{
            Book_Name:req.body.Book_Name
        }
    }).then(f=>{
        return res.status(200).send({message:"successfully delete"})
    })
}