const express = require('express');;

const users = [
    {
        id: 1,
        gander: 'Female',
        name: 'Farhana',
        contact: '+8801567900262',
        address:'Gazipur, Dhaka, Bangladesh',
        photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
    },
    {
        id: 2,
        gander: 'Male',
        name: 'Omar Faruk',
        contact: '+8801567900262',
        address:'Gazipur, Dhaka, Bangladesh',
        photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
    },
    {
        id: 3,
        gander: 'Male',
        name: 'Md. Omar Faruk',
        contact: '+8801567900262',
        address:'Gazipur, Dhaka, Bangladesh',
        photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
    },
    {
        id: 4,
        gander: 'Female',
        name: 'Kobita',
        contact: '+8801567900262',
        address:'Gazipur, Dhaka, Bangladesh',
        photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
    },
    {
        id: 5,
        gander: 'Female',
        name: 'Chionika',
        contact: '+8801567900262',
        address:'Gazipur, Dhaka, Bangladesh',
        photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
    },
    {
        id: 6,
        gander: 'Kale',
        name: 'Kabir Shing',
        contact: '+8801567900262',
        address:'Gazipur, Dhaka, Bangladesh',
        photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
    },
    {
        id: 7,
        gander: 'Male',
        name: 'Abdullah',
        contact: '+8801567900262',
        address:'Gazipur, Dhaka, Bangladesh',
        photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
    },
    {
        id: 8,
        gander: 'Male',
        name: 'Alif',
        contact: '+8801567900262',
        address:'Gazipur, Dhaka, Bangladesh',
        photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
    },
    {
        id: 9,
        gander: 'Male',
        name: 'Md. Rasel Hassan',
        contact: '+8801567900262',
        address:'Gazipur, Dhaka, Bangladesh',
        photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
    },
    {
        id: 10,
        gander: 'Female',
        name: 'Sabiha',
        contact: '+8801567900262',
        address:'Gazipur, Dhaka, Bangladesh',
        photoUrl: 'https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg',
    },
    {
        "id": 11,
        "gander": "Female",
        "name": "Kobita Akhter",
        "contact": "+8801567900262",
        "address": "Gazipur, Dhaka, Bangladesh",
        "photoUrl": "https://i.ibb.co/ySNYS6g/In-Shot-20220802-210749661.jpg"
    },
];

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
    users.push(newUser);
    res.send(users);
});

router.patch('/update', (req, res) =>{
    const UpdatedInfo = req.body;
    const {id, gander, contact, name, address, photoUrl} = UpdatedInfo;
    if(Number(id)){
        const UpdatedUser = users.find(user => user.id === Number(id));
        
  
        if(gander && name && address && photoUrl && contact){
            UpdatedUser.gander = gander;
            UpdatedUser.name = name;
            UpdatedUser.address = address;
            UpdatedUser.contact = contact;
            UpdatedUser.photoUrl = photoUrl;
        }
        else{
            res.send({message: 'Please input all the recomended value'});
        }
 
    res.send(UpdatedUser)
    }
    else{
        res.send({message: 'Your id must be a number.'})
    }
    
    
});

router.delete('/delete', (req, res) => {
    const {id} = req.body;
    console.log(id);
    const remainUsers = users.filter(user => user.id !== Number(id));
    res.send(remainUsers);
});

module.exports = router;