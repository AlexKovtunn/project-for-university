const FormModel = require('../models/profileUniversity.js');

exports.editUniProfile = async (req, res) => {
  try {
    const existingForm = await FormModel.findOne({ userId: req.userId });

    if (existingForm) {
      // если запись уже существует, то производим обновление
      existingForm.universityAdress = req.body.universityAdress;
      existingForm.universityIndex = req.body.universityIndex;
      existingForm.universityOGRN = req.body.universityOGRN;
      existingForm.universityINN = req.body.universityINN;
      existingForm.universityKPP = req.body.universityKPP;
      existingForm.universityStamp = req.files.universityStamp[0].filename;
      existingForm.universityViceRectorName = req.body.universityViceRectorName;
      existingForm.universityViceRectorNameFull = req.body.universityViceRectorNameFull;
      existingForm.universityJobTitle = req.body.universityJobTitle;
      existingForm.universityJobTitleFull = req.body.universityJobTitleFull;
      existingForm.universityPowerOfAttorney = req.body.universityPowerOfAttorney;
      existingForm.universityPowerOfAttorneyDate = req.body.universityPowerOfAttorneyDate;
      existingForm.universitySignatureScan = req.files.universitySignatureScan[0].filename;
      const updatedForm = await existingForm.save();
      res.status(200).json(updatedForm);
    } else {
      // если записи не существует, то создаем новую запись
      const form = new FormModel({
        universityAdress: req.body.universityAdress,
        universityIndex: req.body.universityIndex,
        universityOGRN: req.body.universityOGRN,
        universityINN: req.body.universityINN,
        universityKPP: req.body.universityKPP,
        universityStamp: req.files.universityStamp[0].filename,
        universityViceRectorName: req.body.universityViceRectorName,
        universityViceRectorNameFull: req.body.universityViceRectorNameFull,
        universityJobTitle: req.body.universityJobTitle,
        universityJobTitleFull: req.body.universityJobTitleFull,
        universityPowerOfAttorney: req.body.universityPowerOfAttorney,
        universityPowerOfAttorneyDate: req.body.universityPowerOfAttorneyDate,
        universitySignatureScan: req.files.universitySignatureScan[0].filename,
        userId: req.userId
      });
      const savedForm = await form.save();
      res.status(201).json(savedForm);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при редактировании профиля' });
  }
};

exports.getUniProfile = async (req, res) => {
  try {
    const existingForm = await FormModel.findOne();

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

exports.updateUniProfile = async (req, res) => {
  try {
    const { universityAdress, universityIndex, universityOGRN, universityINN, universityKPP, universityViceRectorName, universityViceRectorNameFull, universityJobTitle, universityJobTitleFull, universityPowerOfAttorney, universityPowerOfAttorneyDate } = req.body;
    const updatedUniversity = await FormModel.findOneAndUpdate(
      {},
      {
        $set: {
          universityAdress,
          universityIndex,
          universityOGRN,
          universityINN,
          universityKPP,
          universityViceRectorName,
          universityViceRectorNameFull,
          universityJobTitle,
          universityJobTitleFull,
          universityPowerOfAttorney,
          universityPowerOfAttorneyDate,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUniversity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при обновлении университета' });
  }
};