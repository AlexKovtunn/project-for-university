const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const ImageModule = require('docxtemplater-image-module-free');
const MainContractModel = require('../models/MainPartOfContract.js');
const AttachmentOneModel = require('../models/addOneContract.js');
const AttachmentTwoModel = require('../models/addTwoContract.js');
const StudentModel = require('../models/studentsForAddOne.js');

exports.generateDemoDocument = async (req, res) => {
try { 
      const companyProfileId = req.params.id;

      const mainContract = await MainContractModel.findOne({
        companyProfile: companyProfileId,
      })
        .populate("DateAndNumber")
        .populate("companyProfile")
        .populate("universityProfile");

      if (!mainContract) {
        res.status(404).send("Контракт не найден");
        return;
      }

      const pathToFile = path.resolve(__dirname, "../dogovor1.docx");

      try {
        fs.accessSync(pathToFile, fs.constants.R_OK); // проверяем наличие и права на чтение
      } catch (err) {
        console.error(`Ошибка чтения файла: ${err}`);
        res.status(500).send("Ошибка чтения файла");
        return;
      }
      
      const content = fs.readFileSync(pathToFile, "binary");
  
      const zip = new PizZip(content);
  
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
  
      doc.setData({
        contractNumber: mainContract.DateAndNumber.contractNumber,
        contractDate: mainContract.DateAndNumber.contractDate,
        contractMonth: mainContract.DateAndNumber.contractMonth,
        contractYear: mainContract.DateAndNumber.contractYear,
        
        companyAdress: mainContract.companyProfile.companyAdress,
        companyName: mainContract.companyProfile.companyName,
        companyNameFull: mainContract.companyProfile.companyNameFull,
        companyIndex: mainContract.companyProfile.companyIndex,
        companyRequisites: mainContract.companyProfile.companyRequisites,
        
        companyEmployeeName: mainContract.companyProfile.companyEmployeeName,
        companyEmployeeNameFull: mainContract.companyProfile.companyEmployeeNameFull,
        companyJobTitle: mainContract.companyProfile.companyJobTitle,
        companyPowerOfAttorney: mainContract.companyProfile.companyPowerOfAttorney,
        companyJobTitleFull: mainContract.companyProfile.companyJobTitleFull,

        universityAdress: mainContract.universityProfile.universityAdress,
        universityIndex: mainContract.universityProfile.universityIndex,
        universityOGRN: mainContract.universityProfile.universityOGRN,
        universityINN: mainContract.universityProfile.universityINN,
        universityKPP: mainContract.universityProfile.universityKPP,
        universityJobTitle: mainContract.universityProfile.universityJobTitle,
        universityJobTitleFull: mainContract.universityProfile.universityJobTitleFull,
                
        universityViceRectorName: mainContract.universityProfile.universityViceRectorName,
        universityViceRectorNameFull: mainContract.universityProfile.universityViceRectorNameFull,
        universityPowerOfAttorney: mainContract.universityProfile.universityPowerOfAttorney,
        universityPowerOfAttorneyDate: mainContract.universityProfile.universityPowerOfAttorneyDate,
      });
      
      doc.render();
  
      const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });
  
      fs.writeFileSync(path.resolve(__dirname, "../output.docx"), buf);
  
      res.download(path.resolve(__dirname, "../output.docx"), "demo.docx", (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Ошибка отправки файла");
        } else {
          console.log("Файл отправлен успешно");
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Ошибка генерации документа");
    }
};

exports.generateFinallyDocument = async (req, res) => {
  try { 
        const companyProfileId = req.params.id;
  
        const mainContract = await MainContractModel.findOne({
          companyProfile: companyProfileId,
        })
          .populate("DateAndNumber")
          .populate("companyProfile")
          .populate("universityProfile");
  
        if (!mainContract) {
          res.status(404).send("Контракт не найден");
          return;
        }
  
        const pathToFile = path.resolve(__dirname, "../dogovor1final.docx");
  
        try {
          fs.accessSync(pathToFile, fs.constants.R_OK); // проверяем наличие и права на чтение
        } catch (err) {
          console.error(`Ошибка чтения файла: ${err}`);
          res.status(500).send("Ошибка чтения файла");
          return;
        }
        
        const content = fs.readFileSync(pathToFile, "binary");
    
        const zip = new PizZip(content);
    
        const imageModule = new ImageModule({
          centered: false,
          fileType: 'docx',
          getImage: function(tagValue, tagName) {
            let imageName;
            if (tagName === 'universityStamp') {
              imageName = tagValue; // Значение для тега 'universityStamp'
            } else if (tagName === 'universitySignatureScan') {
              imageName = tagValue; // Значение для тега 'universitySignatureScan'
            } else if (tagName === 'companyStamp') {
              imageName = tagValue; // Значение для тега 'companyStamp'
            } else if (tagName === 'companySignatureScan') {
              imageName = tagValue; // Значение для тега 'companySignatureScan'
            }
        
            if (imageName) {
              const imagePath = path.resolve(__dirname, `../uploads/${imageName}`);
              return fs.readFileSync(imagePath);
            }
        
            return null; // Return null if the image is not found
          },
          getSize: function(img, tagValue, tagName) {
            if (tagName === 'universityStamp' || tagName === 'companyStamp') {
              return [225, 225]; // Размеры печати
            } else if (tagName === 'universitySignatureScan' || tagName === 'companySignatureScan') {
              return [140, 90]; // Размеры подписи
            }
          },
        });

        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          modules: [imageModule],
        });
    

        doc.setData({
          contractNumber: mainContract.DateAndNumber.contractNumber,
          contractDate: mainContract.DateAndNumber.contractDate,
          contractMonth: mainContract.DateAndNumber.contractMonth,
          contractYear: mainContract.DateAndNumber.contractYear,
          
          companyAdress: mainContract.companyProfile.companyAdress,
          companyName: mainContract.companyProfile.companyName,
          companyNameFull: mainContract.companyProfile.companyNameFull,
          companyIndex: mainContract.companyProfile.companyIndex,
          companyRequisites: mainContract.companyProfile.companyRequisites,
          
          companyEmployeeName: mainContract.companyProfile.companyEmployeeName,
          companyEmployeeNameFull: mainContract.companyProfile.companyEmployeeNameFull,
          companyJobTitle: mainContract.companyProfile.companyJobTitle,
          companyPowerOfAttorney: mainContract.companyProfile.companyPowerOfAttorney,
          companyJobTitleFull: mainContract.companyProfile.companyJobTitleFull,

          universityAdress: mainContract.universityProfile.universityAdress,
          universityIndex: mainContract.universityProfile.universityIndex,
          universityOGRN: mainContract.universityProfile.universityOGRN,
          universityINN: mainContract.universityProfile.universityINN,
          universityKPP: mainContract.universityProfile.universityKPP,
          universityJobTitle: mainContract.universityProfile.universityJobTitle,
          universityJobTitleFull: mainContract.universityProfile.universityJobTitleFull,
          
          universityViceRectorName: mainContract.universityProfile.universityViceRectorName,
          universityViceRectorNameFull: mainContract.universityProfile.universityViceRectorNameFull,
          universityPowerOfAttorney: mainContract.universityProfile.universityPowerOfAttorney,
          universityPowerOfAttorneyDate: mainContract.universityProfile.universityPowerOfAttorneyDate,

          universityStamp: mainContract.universityProfile.universityStamp,
          universitySignatureScan: mainContract.universityProfile.universitySignatureScan,
          
          companyStamp: mainContract.companyProfile.companyStamp,
          companySignatureScan: mainContract.companyProfile.companySignatureScan,
        });
        
        doc.render();
    
        const buf = doc.getZip().generate({
          type: "nodebuffer",
          compression: "DEFLATE",
        });
    
        fs.writeFileSync(path.resolve(__dirname, "../output.docx"), buf);
    
        res.download(path.resolve(__dirname, "../output.docx"), "final.docx", (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Ошибка отправки файла");
          } else {
            console.log("Файл отправлен успешно");
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка генерации документа");
      }
  };

exports.generateDemoAddOneDocument = async (req, res) => {
  const attachmentOneId = req.params.id;
  try { 
    const attachmentOne = await AttachmentOneModel.findById(attachmentOneId)
    .populate({
      path: 'mainContract',
      populate: {
        path: 'DateAndNumber companyProfile universityProfile'
      }
    });
    const students = await StudentModel.find({ attachmentOne: attachmentOneId });
    
    const studentsData = students.map((student, index) => ({
      studentNumber: index + 1,
      fullName: student.fullName,
      programCode: student.programCode,
      course: student.course,
      group: student.group,
      practiceDates: student.practiceDates,
    }));

    const mainContract = attachmentOne.mainContract;

    const pathToFile = path.resolve(__dirname, "../dogovor2.docx");

    try {
      fs.accessSync(pathToFile, fs.constants.R_OK); // проверяем наличие и права на чтение
    } catch (err) {
      console.error(`Ошибка чтения файла: ${err}`);
      res.status(500).send("Ошибка чтения файла");
      return;
    }
    
    const content = fs.readFileSync(pathToFile, "binary");

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData({ 
      contractNumber: mainContract.DateAndNumber.contractNumber,
      contractDate: mainContract.DateAndNumber.contractDate,
      contractMonth: mainContract.DateAndNumber.contractMonth,
      contractYear: mainContract.DateAndNumber.contractYear,

      universityJobTitle: mainContract.universityProfile.universityJobTitle,
      universityViceRectorName: mainContract.universityProfile.universityViceRectorName,

      companyEmployeeName: mainContract.companyProfile.companyEmployeeName,
      companyJobTitle: mainContract.companyProfile.companyJobTitle,

      trainingDirection: attachmentOne.trainingDirection,
      cipher: attachmentOne.cipher,
      mainProgramName: attachmentOne.mainProgramName,
      practiceType: attachmentOne.practiceType,
      practiceSupervisor: attachmentOne.practiceSupervisor,
      
      students: studentsData
    });
    
    doc.render();

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    fs.writeFileSync(path.resolve(__dirname, "../output.docx"), buf);

    res.download(path.resolve(__dirname, "../output.docx"), "demoaddone.docx", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Ошибка отправки файла");
      } else {
        console.log("Файл отправлен успешно");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка генерации документа");
  }
};

exports.generateAddOneDocument = async (req, res) => {
  const attachmentOneId = req.params.id;
  try { 
    const attachmentOne = await AttachmentOneModel.findById(attachmentOneId)
    .populate({
      path: 'mainContract',
      populate: {
        path: 'DateAndNumber companyProfile universityProfile'
      }
    });
    const students = await StudentModel.find({ attachmentOne: attachmentOneId });
    
    const studentsData = students.map((student, index) => ({
      studentNumber: index + 1,
      fullName: student.fullName,
      programCode: student.programCode,
      course: student.course,
      group: student.group,
      practiceDates: student.practiceDates,
    }));

    const mainContract = attachmentOne.mainContract;

    const pathToFile = path.resolve(__dirname, "../dogovor2final.docx");

    try {
      fs.accessSync(pathToFile, fs.constants.R_OK); // проверяем наличие и права на чтение
    } catch (err) {
      console.error(`Ошибка чтения файла: ${err}`);
      res.status(500).send("Ошибка чтения файла");
      return;
    }
    
    const content = fs.readFileSync(pathToFile, "binary");

    const zip = new PizZip(content);

    const imageModule = new ImageModule({
      centered: false,
      fileType: 'docx',
      getImage: function(tagValue, tagName) {
        let imageName;
        if (tagName === 'universityStamp') {
          imageName = tagValue; // Значение для тега 'universityStamp'
        } else if (tagName === 'universitySignatureScan') {
          imageName = tagValue; // Значение для тега 'universitySignatureScan'
        } else if (tagName === 'companyStamp') {
          imageName = tagValue; // Значение для тега 'companyStamp'
        } else if (tagName === 'companySignatureScan') {
          imageName = tagValue; // Значение для тега 'companySignatureScan'
        }
    
        if (imageName) {
          const imagePath = path.resolve(__dirname, `../uploads/${imageName}`);
          return fs.readFileSync(imagePath);
        }
    
        return null; // Return null if the image is not found
      },
      getSize: function(img, tagValue, tagName) {
        if (tagName === 'universityStamp' || tagName === 'companyStamp') {
          return [225, 225]; // Размеры печати
        } else if (tagName === 'universitySignatureScan' || tagName === 'companySignatureScan') {
          return [140, 90]; // Размеры подписи
        }
      },
    });

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [imageModule],
    });

    doc.setData({ 
      contractNumber: mainContract.DateAndNumber.contractNumber,
      contractDate: mainContract.DateAndNumber.contractDate,
      contractMonth: mainContract.DateAndNumber.contractMonth,
      contractYear: mainContract.DateAndNumber.contractYear,


      universityJobTitle: mainContract.universityProfile.universityJobTitle,
      universityViceRectorName: mainContract.universityProfile.universityViceRectorName,
      universityStamp: mainContract.universityProfile.universityStamp,
      universitySignatureScan: mainContract.universityProfile.universitySignatureScan,

      companyEmployeeName: mainContract.companyProfile.companyEmployeeName,
      companyJobTitle: mainContract.companyProfile.companyJobTitle,
      companyStamp: mainContract.companyProfile.companyStamp,
      companySignatureScan: mainContract.companyProfile.companySignatureScan,

      trainingDirection: attachmentOne.trainingDirection,
      cipher: attachmentOne.cipher,
      mainProgramName: attachmentOne.mainProgramName,
      practiceType: attachmentOne.practiceType,
      practiceSupervisor: attachmentOne.practiceSupervisor,
      
      students: studentsData
    });
    
    doc.render();

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    fs.writeFileSync(path.resolve(__dirname, "../output.docx"), buf);

    res.download(path.resolve(__dirname, "../output.docx"), "finaladdone.docx", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Ошибка отправки файла");
      } else {
        console.log("Файл отправлен успешно");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка генерации документа");
  }
};

exports.generateDemoAddTwoDocument = async (req, res) => {
  const attachmentOneId = req.params.id;
  try {
    const attachmentTwo = await AttachmentTwoModel.findOne({ AttachmentOne: attachmentOneId })
    .populate({
      path: 'AttachmentOne',
      populate: {
        path: 'mainContract',
        populate: {
          path: 'DateAndNumber companyProfile universityProfile'
        }
      }
    });

    const mainContract = attachmentTwo.AttachmentOne.mainContract;
    const location = attachmentTwo.location;
    const placement = attachmentTwo.placement;

    const pathToFile = path.resolve(__dirname, "../dogovor3.docx");

    try {
      fs.accessSync(pathToFile, fs.constants.R_OK); // проверяем наличие и права на чтение
    } catch (err) {
      console.error(`Ошибка чтения файла: ${err}`);
      res.status(500).send("Ошибка чтения файла");
      return;
    }

    const content = fs.readFileSync(pathToFile, "binary");

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData({
      contractNumber: mainContract.DateAndNumber.contractNumber,
      contractDate: mainContract.DateAndNumber.contractDate,
      contractMonth: mainContract.DateAndNumber.contractMonth,
      contractYear: mainContract.DateAndNumber.contractYear,

      universityJobTitle: mainContract.universityProfile.universityJobTitle,
      universityViceRectorName: mainContract.universityProfile.universityViceRectorName,

      companyEmployeeName: mainContract.companyProfile.companyEmployeeName,
      companyJobTitle: mainContract.companyProfile.companyJobTitle,

      location: location,
      placement: placement,
    });

    doc.render();

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    fs.writeFileSync(path.resolve(__dirname, "../output.docx"), buf);

    res.download(path.resolve(__dirname, "../output.docx"), "demoaddtwo.docx", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Ошибка отправки файла");
      } else {
        console.log("Файл отправлен успешно");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка генерации документа");
  }
};

exports.generateAddTwoDocument = async (req, res) => {
  const attachmentOneId = req.params.id;
  try {
    const attachmentTwo = await AttachmentTwoModel.findOne({ AttachmentOne: attachmentOneId })
    .populate({
      path: 'AttachmentOne',
      populate: {
        path: 'mainContract',
        populate: {
          path: 'DateAndNumber companyProfile universityProfile'
        }
      }
    });

    const mainContract = attachmentTwo.AttachmentOne.mainContract;
    const location = attachmentTwo.location;
    const placement = attachmentTwo.placement;

    const pathToFile = path.resolve(__dirname, "../dogovor3final.docx");

    try {
      fs.accessSync(pathToFile, fs.constants.R_OK); // проверяем наличие и права на чтение
    } catch (err) {
      console.error(`Ошибка чтения файла: ${err}`);
      res.status(500).send("Ошибка чтения файла");
      return;
    }

    const content = fs.readFileSync(pathToFile, "binary");

    const zip = new PizZip(content);

    const imageModule = new ImageModule({
      centered: false,
      fileType: 'docx',
      getImage: function(tagValue, tagName) {
        let imageName;
        if (tagName === 'universityStamp') {
          imageName = tagValue; // Значение для тега 'universityStamp'
        } else if (tagName === 'universitySignatureScan') {
          imageName = tagValue; // Значение для тега 'universitySignatureScan'
        } else if (tagName === 'companyStamp') {
          imageName = tagValue; // Значение для тега 'companyStamp'
        } else if (tagName === 'companySignatureScan') {
          imageName = tagValue; // Значение для тега 'companySignatureScan'
        }
    
        if (imageName) {
          const imagePath = path.resolve(__dirname, `../uploads/${imageName}`);
          return fs.readFileSync(imagePath);
        }
    
        return null; // Return null if the image is not found
      },
      getSize: function(img, tagValue, tagName) {
        if (tagName === 'universityStamp' || tagName === 'companyStamp') {
          return [225, 225]; // Размеры печати
        } else if (tagName === 'universitySignatureScan' || tagName === 'companySignatureScan') {
          return [140, 90]; // Размеры подписи
        }
      },
    });

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [imageModule],
    });

    doc.setData({
      contractNumber: mainContract.DateAndNumber.contractNumber,
      contractDate: mainContract.DateAndNumber.contractDate,
      contractMonth: mainContract.DateAndNumber.contractMonth,
      contractYear: mainContract.DateAndNumber.contractYear,

      universityJobTitle: mainContract.universityProfile.universityJobTitle,
      universityViceRectorName: mainContract.universityProfile.universityViceRectorName,
      universityStamp: mainContract.universityProfile.universityStamp,
      universitySignatureScan: mainContract.universityProfile.universitySignatureScan,

      companyEmployeeName: mainContract.companyProfile.companyEmployeeName,
      companyJobTitle: mainContract.companyProfile.companyJobTitle,
      companyStamp: mainContract.companyProfile.companyStamp,
      companySignatureScan: mainContract.companyProfile.companySignatureScan,

      location: location,
      placement: placement,
    });

    doc.render();

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    fs.writeFileSync(path.resolve(__dirname, "../output.docx"), buf);

    res.download(path.resolve(__dirname, "../output.docx"), "finaladdtwo.docx", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Ошибка отправки файла");
      } else {
        console.log("Файл отправлен успешно");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка генерации документа");
  }
};