const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Mobile = require('./contacts.js');
const multer = require('multer');

mongoose.connect('mongodb+srv://ayushv657:gkczp9LJXpkYnN7u@cluster0.stthbi5.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

app.use(express.json());

const Storage = multer.diskStorage(

    {
        destination: "uploads",
        filename: (req,file, cb) => {
            cb(null, file.originalname)
        }

    });

const upload = multer(
    {
        storage: Storage

    }).single('testImage');


app.post('/details', upload, (req, res) => {
    const mobile = new Mobile({
        companyName: req.body.companyName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        MobileNo: req.body.Mobileno,
        address: req.body.address,
        image: {
            data: '0_GettyImages-1252794475.jpg',
            contentType: 'image/jpg'
          }
    });

    mobile.save()
        .then(() => {
            res.status(200).send('Data saved successfully');
        })
        .catch((error) => {
            console.error('Error saving data:', error);
            res.status(500).send('An error occurred while saving data');
        });
});

app.get('/details', (req, res) => {
    Mobile.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            console.error('Error retrieving data:', error);
            res.status(500).send('An error occurred while retrieving data');
        });
});

app.get('/details/:id', (req, res) => {
    Mobile.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            console.error('error has been caught', error);
            res.status(500).send('Error is showing up');
        });
});


app.put('/details/:id', (req, res) => {
    const { id } = req.params;

    Mobile.findByIdAndUpdate(id, req.body)
        .then(() => {
            res.status(200).send('Data updated successfully');
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            res.status(500).send('An error occurred while updating data');
        });
});

app.delete('/details/:id', (req, res) => {
    const { id } = req.params;

    Mobile.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send('Data deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting data:', error);
            res.status(500).send('An error occurred while deleting data');
        });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.put('/details/:id/block', (req, res) => {
    const { id } = req.params;

    Mobile.findByIdAndUpdate(id, { blocked: true })
        .then(() => {
            res.status(200).send('Contact blocked successfully');
        })
        .catch((error) => {
            console.error('Error blocking contact:', error);
            res.status(500).send('An error occurred while blocking the contact');
        });
});
