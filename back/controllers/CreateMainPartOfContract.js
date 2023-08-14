const DateNumberContractModel = require('../models/NumberAndDateContract.js');
const MainPartOfContract = require('../models/MainPartOfContract.js');
const ProfileUniversity = require('../models/profileUniversity.js');

exports.addDateAndNumberOfContract = async (req, res) => {
  try {
    const { contractNumber, contractDate, contractMonth, contractYear } = req.body;
    const dateAndNumberOfContract = new DateNumberContractModel({
      contractNumber,
      contractDate,
      contractMonth,
      contractYear,
    });
    const savedDateAndNumberOfContract = await dateAndNumberOfContract.save();
    res.status(200).json(savedDateAndNumberOfContract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при добавлении даты и номера договора' });
  }
};

exports.updateDateAndNumberOfContract = async (req, res) => {
  try {
    const { contractNumber, contractDate, contractMonth, contractYear } = req.body;
    const updatedDateAndNumberOfContract = await DateNumberContractModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          contractNumber,
          contractDate,
          contractMonth,
          contractYear,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedDateAndNumberOfContract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при обновлении даты и номера договора' });
  }
};

exports.getDataAndNumberContract = async (req, res) => {
  try {
    const existingForm = await DateNumberContractModel.findById(req.params.id);

    if (existingForm) {
      res.status(200).json(existingForm);
    } else {
      res.status(404).json({ message: 'Запись не найдена' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении профиля' });
  }
};

exports.CreateMainPartOfContract = async (req, res) => {
    try {
        const university = await ProfileUniversity.findOne();
        const mainPartOfContract = new MainPartOfContract({
            DateAndNumber: req.body.contract,
            companyProfile: req.body.company,
            universityProfile: university._id,
        });
        const savedMainPartOfContract = await mainPartOfContract.save();
        res.status(201).json(savedMainPartOfContract);
      } catch (err) {
        res.status(500).json({ message: 'Ошибка создания главной части договора' });
      }
  };

  exports.findMainPartOfContractByCompanyId = async (req, res) => {
    try {
      const companyId = req.params.id;
      const mainPartOfContract = await MainPartOfContract.findOne({ companyProfile: companyId });
      if (!mainPartOfContract) {
        return res.status(404).json({ message: 'Запись MainPartOfContract не найдена' });
      }
      res.status(200).json(mainPartOfContract);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при поиске записи MainPartOfContract' });
    }
  };

  exports.checkApprovalStatus = async (req, res) => {
    try {
      const contractId = req.params.id;
      const contract = await MainPartOfContract.findById(contractId);
      if (!contract) {
        return res.status(404).json({ message: 'Контракт не найден' });
      }
  
      const isApproved = contract.universityApproved && contract.companyApproved;
      res.status(200).json({ isApproved });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при проверке статуса согласования' });
    }
  };

  exports.approveUniversity = async (req, res) => {
    try {
      const contractId = req.params.id;
      const contract = await MainPartOfContract.findById(contractId);
      if (!contract) {
        return res.status(404).json({ message: 'Контракт не найден' });
      }
  
      // Обновление universityApproved на true
      contract.universityApproved = true;
      await contract.save();
  
      res.status(200).json({ universityApproved: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении universityApproved' });
    }
  };

  exports.checkUniversityApproval = async (req, res) => {
    try {
      const contractId = req.params.id;
      const contract = await MainPartOfContract.findById(contractId);
      if (!contract) {
        return res.status(404).json({ message: 'Контракт не найден' });
      }
  
      const universityApproved = contract.universityApproved;
  
      res.status(200).json({ universityApproved });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при проверке universityApproved' });
    }
  };

  exports.approveCompany = async (req, res) => {
    try {
      const contractId = req.params.id;
      const contract = await MainPartOfContract.findById(contractId);
      if (!contract) {
        return res.status(404).json({ message: 'Контракт не найден' });
      }
  
      // Обновление universityApproved на true
      contract.companyApproved = true;
      await contract.save();
  
      res.status(200).json({ companyApproved: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении companyApproved' });
    }
  };

  exports.checkCompanyApproval = async (req, res) => {
    try {
      const contractId = req.params.id;
      const contract = await MainPartOfContract.findById(contractId);
      if (!contract) {
        return res.status(404).json({ message: 'Контракт не найден' });
      }
  
      const companyApproved = contract.companyApproved;
  
      res.status(200).json({ companyApproved });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при проверке universityApproved' });
    }
  };