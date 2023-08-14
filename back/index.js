const express = require('express');
const mongoose = require('mongoose');
//const mongoAutoErd = require("mongo-auto-erd");
const path = require('path');

const multer = require('multer');

const validations = require('./validations.js');
const handleValidationErrors = require('./utils/handleValidationErrors.js');
const checkAuth = require('./utils/checkAuth.js');
const UserController = require('./controllers/UserController.js');

const DocumentController = require("./controllers/DocumentController.js");

const EditUniversityProfile = require("./controllers/EditUniversityProfile.js");
const EditCompanyProfile = require("./controllers/EditCompanyProfile.js");

const CreateMainPartOfContract = require("./controllers/CreateMainPartOfContract.js");
const CreateAddOnePartOfContract = require("./controllers/CreateAddOneContract.js");
const CreateAddTwoPartOfContract = require("./controllers/CreateAddTwoContract.js");



mongoose
.connect('mongodb+srv://admin:<password>@cluster0.pzigopy.mongodb.net/portal?retryWrites=true&w=majority')
.then(() =>{ console.log('DB ok')})
.catch((err) => console.log('DB error', err));


const app = express();

app.use(express.json());
app.use(express.static('../client'));

app.get('/', (req, res) => {
    res.sendFile('../client/index.html');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  
  // создаем объект multer
  const upload = multer({
    storage: storage
  });
  

app.post('/auth/login', validations.loginValidation, handleValidationErrors,UserController.login);
app.post('/auth/register', validations.registerValidation,handleValidationErrors, UserController.register);


app.get('/generate-demo-doc/:id', checkAuth, DocumentController.generateDemoDocument);
app.get('/generate-final-doc/:id', DocumentController.generateFinallyDocument);
app.get('/generate-add-one-doc/:id', DocumentController.generateAddOneDocument);
app.get('/generate-demo-add-one-doc/:id', DocumentController.generateDemoAddOneDocument);

app.get('/generate-add-two-doc/:id', DocumentController.generateAddTwoDocument);
app.get('/generate-demo-add-two-doc/:id', DocumentController.generateDemoAddTwoDocument);


app.post('/edit-uni-profile', checkAuth, upload.fields([{ name: 'universityStamp', maxCount: 1 }, { name: 'universitySignatureScan', maxCount: 1 }]), EditUniversityProfile.editUniProfile);
app.get('/get-data-of-university', checkAuth, EditUniversityProfile.getUniProfile);
app.put('/update-data-of-university', checkAuth, EditUniversityProfile.updateUniProfile);


app.post('/edit-comp-profile', checkAuth, upload.fields([{ name: 'companyStamp', maxCount: 1 }, { name: 'companySignatureScan', maxCount: 1 }]), EditCompanyProfile.editCompanyProfile);
app.get('/get-companies', checkAuth, EditCompanyProfile.getCompanies);
app.get('/get-details-about-company/:id', checkAuth, EditCompanyProfile.getCompanyDetails);
app.put('/update-contract-created/:id', checkAuth, EditCompanyProfile.updateContractCreated);
app.get('/check-contract-created/:id', checkAuth, EditCompanyProfile.checkContractCreated);
app.get('/get-inf-about-me', checkAuth, EditCompanyProfile.getMeComp);
app.put('/update-data-of-company/:id', checkAuth, EditCompanyProfile.updateCompProfile);

app.post('/add-date-and-number-contract', checkAuth, CreateMainPartOfContract.addDateAndNumberOfContract);
app.get('/get-data-and-number-of-contract/:id', checkAuth, CreateMainPartOfContract.getDataAndNumberContract);
app.put('/update-date-and-number-of-contract/:id', checkAuth, CreateMainPartOfContract.updateDateAndNumberOfContract);

app.post('/create-main-part-of-contact', checkAuth, CreateMainPartOfContract.CreateMainPartOfContract);
app.get('/find-main-part-of-contract/:id', checkAuth, CreateMainPartOfContract.findMainPartOfContractByCompanyId);
app.put('/update-uni-approve-in-main-contract/:id', checkAuth, CreateMainPartOfContract.approveUniversity);
app.get('/get-uni-approve-in-main-contract/:id', checkAuth, CreateMainPartOfContract.checkUniversityApproval);
app.put('/update-comp-approve-in-main-contract/:id', checkAuth, CreateMainPartOfContract.approveCompany);
app.get('/get-comp-approve-in-main-contract/:id', checkAuth, CreateMainPartOfContract.checkCompanyApproval);
app.get('/get-status-about-approved/:id', checkAuth, CreateMainPartOfContract.checkApprovalStatus);

app.post('/create-add-one-contract/:id', checkAuth, CreateAddOnePartOfContract.addAttachmentOne);
app.post('/edit-add-one-contract-data/:id', checkAuth, CreateAddOnePartOfContract.updateAttachmentOne);
app.get('/get-add-ones/:id', checkAuth, CreateAddOnePartOfContract.getAttachmentOnes);
app.post('/update-add-one-contract-comp-approved/:id', checkAuth, CreateAddOnePartOfContract.updateCompanyApproved);
app.get('/get-add-one-contract-comp-approved/:id', checkAuth, CreateAddOnePartOfContract.checkCompanyApproved);
app.post('/update-add-one-contract-uni-approved/:id', checkAuth, CreateAddOnePartOfContract.updateUniversityApproved);
app.get('/get-add-one-contract-uni-approved/:id', checkAuth, CreateAddOnePartOfContract.checkUniversityApproved);
app.get('/get-add-one-contract-approved/:id', checkAuth, CreateAddOnePartOfContract.checkApprovalStatus);
app.get('/get-add-one-contract-data/:id', checkAuth, CreateAddOnePartOfContract.getAttachmentOneData);

app.post('/create-add-two-contract/:id', checkAuth, CreateAddTwoPartOfContract.addAttachmentTwo);
app.get('/get-add-two/:id', checkAuth, CreateAddTwoPartOfContract.getAttachmentTwo);
app.get('/get-data-add-two/:id', checkAuth, CreateAddTwoPartOfContract.getDataAttachmentTwo);
app.post('/update-add-two-contract-comp-approved/:id', checkAuth, CreateAddTwoPartOfContract.updateCompanyApproved);
app.get('/check-add-two-contract-comp-approved/:id', checkAuth, CreateAddTwoPartOfContract.checkCompanyApproved);
app.post('/update-add-two-contract-uni-approved/:id', checkAuth, CreateAddTwoPartOfContract.updateUniversityApproved);
app.get('/check-add-two-contract-uni-approved/:id', checkAuth, CreateAddTwoPartOfContract.checkUniversityApproved);
app.get('/get-add-two-contract-approved/:id', checkAuth, CreateAddTwoPartOfContract.checkApprovalStatus);


app.listen(5555, (err) => {
    if (err){
        return console.log(err);
    }

    console.log('server ok')
})