const FormModel = require('../models/profileCompany.js');


exports.editCompanyProfile = async (req, res) => {
    try {
      const existingProfile = await FormModel.findOne({ userId: req.userId });
  
      if (existingProfile) {
        // if profile already exists, update it
        existingProfile.companyAdress = req.body.companyAdress;
        existingProfile.companyName = req.body.companyName;
        existingProfile.companyNameFull = req.body.companyNameFull;
        existingProfile.companyIndex = req.body.companyIndex;
        existingProfile.companyRequisites = req.body.companyRequisites;
        existingProfile.companyStamp = req.files.companyStamp[0].filename;
        existingProfile.companyEmployeeName = req.body.companyEmployeeName;
        existingProfile.companyEmployeeNameFull = req.body.companyEmployeeNameFull;
        existingProfile.companyJobTitle = req.body.companyJobTitle;
        existingProfile.companyJobTitleFull = req.body.companyJobTitleFull;
        existingProfile.companyPowerOfAttorney = req.body.companyPowerOfAttorney;
        existingProfile.companySignatureScan = req.files.companySignatureScan[0].filename;
  
        const updatedProfile = await existingProfile.save();
        res.status(200).json(updatedProfile);
      } else {
        // if profile does not exist, create a new one
        const newProfile = new FormModel({
          userId: req.userId,
          companyAdress: req.body.companyAdress,
          companyName: req.body.companyName,
          companyNameFull: req.body.companyNameFull,
          companyIndex: req.body.companyIndex,
          companyRequisites: req.body.companyRequisites,
          companyStamp: req.files.companyStamp[0].filename,
          companyEmployeeName: req.body.companyEmployeeName,
          companyEmployeeNameFull: req.body.companyEmployeeNameFull,
          companyJobTitle: req.body.companyJobTitle,
          companyJobTitleFull: req.body.companyJobTitleFull,
          companyPowerOfAttorney: req.body.companyPowerOfAttorney,
          companySignatureScan: req.files.companySignatureScan[0].filename,
        });
  
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при редактировании профиля' });
    }
  };

  exports.updateCompProfile = async (req, res) => {
    try {
      const { companyAdress, companyName, companyNameFull, companyIndex, companyRequisites, companyEmployeeName, companyEmployeeNameFull, companyJobTitle, companyJobTitleFull, companyPowerOfAttorney} = req.body;
      
      const companyId = req.params.id;
      const updatedCompany = await FormModel.findOneAndUpdate(
        { _id: companyId }, // Указываем идентификатор компании, которую нужно обновить
        {
          $set: {
            companyAdress,
            companyName,
            companyNameFull,
            companyIndex,
            companyRequisites,
            companyEmployeeName,
            companyEmployeeNameFull,
            companyJobTitle,
            companyJobTitleFull,
            companyPowerOfAttorney,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при обновлении университета' });
    }
  };

  exports.getCompanies = async (req, res) => {
    try {
      const companies = await FormModel.find({}, '_id companyAdress companyName');
  
      if (companies.length === 0) {
        return res.status(404).json({ message: 'Записей не найдено' });
      }
  
      res.status(200).json(companies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении записей ответов' });
    }
  };

  exports.getCompanyDetails = async (req, res) => {
    try {
      const companyId = req.params.id;
      const company = await FormModel.findById(companyId);
      if (!company) {
        return res.status(404).json({ message: 'Компания не найдена' });
      }
      res.status(200).json(company);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении данных компании' });
    }
  };

  exports.getMeComp = async (req, res) => {
    try {
      const company = await FormModel.findOne({ userId: req.userId });

      if (!company) {
        return res.status(404).json({ message: 'Данные о предприятии не найдены' });
      }
      res.status(200).json(company);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении данных компании' });
    }
  };

  exports.updateContractCreated = async (req, res) => {
    try {
      const companyId = req.params.id;
      const company = await FormModel.findByIdAndUpdate(companyId, { contractCreated: true });
      if (!company) {
        return res.status(404).json({ message: 'Компания не найдена' });
      }
      res.status(200).json({ message: 'Значение contractCreated успешно обновлено' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении значения contractCreated' });
    }
  };

  exports.checkContractCreated = async (req, res) => {
    try {
      const companyId = req.params.id;
      const company = await FormModel.findById(companyId);
      if (!company) {
        return res.status(404).json({ message: 'Компания не найдена' });
      }
      res.status(200).json({ contractCreated: company.contractCreated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при получении значения contractCreated' });
    }
  };