const express = require('express');
const getUsers = require ('../../user.js');

let users;

getUsers((data) =>{
    users = data;
},(error)=>{
    console.log(error);
}
)

let users1;

// const users = [
//     {
//         id: 1,
//         gander: 'Female',
//         name: 'Farhana',
//         contact: '+8801567900262',
//         address:'Gazipur, Dhaka, Bangladesh',
//         photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
//     },
//     {
//         id: 2,
//         gander: 'Male',
//         name: 'Omar Faruk',
//         contact: '+8801567900262',
//         address:'Gazipur, Dhaka, Bangladesh',
//         photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
//     },
//     {
//         id: 3,
//         gander: 'Male',
//         name: 'Md. Omar Faruk',
//         contact: '+8801567900262',
//         address:'Gazipur, Dhaka, Bangladesh',
//         photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
//     },
//     {
//         id: 4,
//         gander: 'Female',
//         name: 'Kobita',
//         contact: '+8801567900262',
//         address:'Gazipur, Dhaka, Bangladesh',
//         photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
//     },
//     {
//         id: 5,
//         gander: 'Female',
//         name: 'Chionika',
//         contact: '+8801567900262',
//         address:'Gazipur, Dhaka, Bangladesh',
//         photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
//     },
//     {
//         id: 6,
//         gander: 'Kale',
//         name: 'Kabir Shing',
//         contact: '+8801567900262',
//         address:'Gazipur, Dhaka, Bangladesh',
//         photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
//     },
//     {
//         id: 7,
//         gander: 'Male',
//         name: 'Abdullah',
//         contact: '+8801567900262',
//         address:'Gazipur, Dhaka, Bangladesh',
//         photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
//     },
//     {
//         id: 8,
//         gander: 'Male',
//         name: 'Alif',
//         contact: '+8801567900262',
//         address:'Gazipur, Dhaka, Bangladesh',
//         photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
//     },
//     {
//         id: 9,
//         gander: 'Male',
//         name: 'Md. Rasel Hassan',
//         contact: '+8801567900262',
//         address:'Gazipur, Dhaka, Bangladesh',
//         photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
//     },
//     {
//         id: 10,
//         gander: 'Female',
//         name: 'Sabiha',
//         contact: '+8801567900262',
//         address:'Gazipur, Dhaka, Bangladesh',
//         photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
//     },
//     {
//         "id": 11,
//         "gander": "Female",
//         "name": "Kobita Akhter",
//         "contact": "+8801567900262",
//         "address": "Gazipur, Dhaka, Bangladesh",
//         "photoUrl": "https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg"
//     },
// ];

const router = express.Router();

router.get('/all', (req, res) =>{
  const {limit} = req.query;
  res.send(users.slice(0, limit));
});

router.get('/random', (req, res) =>{
  const randomNumber = Math.random() * users.length;

  const randomIntegerNumber = Math.ceil(randomNumber);
  const randomUser = users.find(user => user.id === randomIntegerNumber)
  res.send(randomUser);
});

router.post('/save', (req, res) => {
    const newUser = req.body;
    const {id, gander, contact, name, address, photoUrl} = newUser;
    if(gander && name && address && photoUrl && contact){
        users.push(newUser);
        res.send(users);
    }
    else{
        res.send({message: 'Please input all the recomended value'})
    }

});

router.patch('/update', (req, res) =>{
    const updatedInfo = req.body;
    
    if(Number(updatedInfo.id)){
        const updatedUser = users.find(user => user.id === Number(updatedInfo.id));
        
        updatedUser.gander = updatedInfo.gander?updatedInfo.gander : updatedUser.gander;
        updatedUser.name = updatedInfo.name?updatedInfo.name : updatedUser.name;
        updatedUser.address = updatedInfo.address?updatedInfo.address : updatedUser.address;
        updatedUser.contact = updatedInfo.contact?updatedInfo.contact : updatedUser.contact;
        updatedUser.photoUrl = updatedInfo.photoUrl?updatedInfo.photoUrl : updatedUser.photoUrl;
       
        res.send(updatedUser)
    }
    else{
        res.send({message: 'Your id must be a number.'})
    }
    
    
});

router.patch('/bulk-update', (req, res) => {
    const array = req.body;
    array.map(data => {
        res.send(data);
    })
})

router.delete('/delete', (req, res) => {
    const {id} = req.body;
   if(Number(id)){
    const remainUsers = users.filter(user => user.id !== Number(id));
    res.send(remainUsers);
   }
   else{
    res.send({message: 'Please input a valite id.'})
   }
});

module.exports = router;