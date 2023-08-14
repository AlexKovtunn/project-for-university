const AttachmentOneModel = require('../models/addOneContract.js');
const StudentModel = require('../models/studentsForAddOne.js');
const MainPartOfContract = require('../models/MainPartOfContract.js');

exports.addAttachmentOne = async (req, res) => {
  const companyId = req.params.id;
  const mainPartOfContract = await MainPartOfContract.findOne({ companyProfile: companyId });
  if (!mainPartOfContract) {
    return res.status(404).json({ message: 'Запись MainPartOfContract не найдена' });
  }

  const { studentsData, otherFormData } = req.body;

  try {
    // Создаем новый объект AttachmentOne
    const attachmentOne = new AttachmentOneModel({
      mainContract: mainPartOfContract._id,
      trainingDirection: otherFormData.trainingDirection,
      cipher: otherFormData.cipher,
      mainProgramName: otherFormData.mainProgramName,
      practiceType: otherFormData.practiceType,
      practiceSupervisor: otherFormData.practiceSupervisor
    });

    // Сохраняем AttachmentOne в базе данных
    await attachmentOne.save();

    for (const studentData of studentsData) {
      const student = new StudentModel({
        ...studentData,
        attachmentOne: attachmentOne._id
      });
      await student.save();
    }

    res.status(200).json({ attachmentOneId: attachmentOne._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при сохранении формы" });
  }
};

exports.updateAttachmentOne = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    const attachmentOne = await AttachmentOneModel.findById(attachmentOneId);
    if (!attachmentOne) {
      return res.status(404).json({ message: 'Запись AttachmentOne не найдена' });
    }

    const { studentsData, otherFormData } = req.body;

    // Обновляем поля AttachmentOne
    attachmentOne.trainingDirection = otherFormData.trainingDirection;
    attachmentOne.cipher = otherFormData.cipher;
    attachmentOne.mainProgramName = otherFormData.mainProgramName;
    attachmentOne.practiceType = otherFormData.practiceType;
    attachmentOne.practiceSupervisor = otherFormData.practiceSupervisor;
    attachmentOne.companyApproved = false;
    attachmentOne.universityApproved = false;

    // Сохраняем обновленный AttachmentOne
    await attachmentOne.save();

    // Удаляем студентов, связанных с AttachmentOne
    await StudentModel.deleteMany({ attachmentOne: attachmentOne._id });

    // Создаем и сохраняем новых студентов на основе studentsData
    for (const studentData of studentsData) {
      const student = new StudentModel({
        ...studentData,
        attachmentOne: attachmentOne._id
      });
      await student.save();
    }

    res.status(200).json({ message: 'Данные успешно обновлены' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Возникла ошибка при обновлении данных' });
  }
};

exports.getAttachmentOneData = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    // Найти AttachmentOne по идентификатору
    const attachmentOne = await AttachmentOneModel.findById(attachmentOneId);

    if (!attachmentOne) {
      return res.status(404).json({ message: 'AttachmentOne не найден' });
    }

    // Найти все объекты StudentModel, связанные с attachmentOneId
    const studentsData = await StudentModel.find({ attachmentOne: attachmentOneId });

    const count = studentsData.length; // Количество элементов в массиве studentsData

    res.status(200).json({ attachmentOne: attachmentOne, studentsData: studentsData, count: count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при получении данных AttachmentOne" });
  }
};

exports.getAttachmentOnes = async (req, res) => {
  const mainContractId = req.params.id;
  
  try {
    const attachmentOnes = await AttachmentOneModel.find({ mainContract: mainContractId });

    if (attachmentOnes.length === 0) {
      // Если список приложений 1 пустой, отправляем информацию на клиент
      return res.status(200).json({ message: "Нет созданных приложений 1" });
    }

    res.status(200).json({ attachmentOnes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при получении списка приложений 1" });
  }
};

exports.updateCompanyApproved = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    const attachmentOne = await AttachmentOneModel.findById(attachmentOneId);

    if (!attachmentOne) {
      return res.status(404).json({ message: "Приложение 1 не найдено" });
    }

    attachmentOne.companyApproved = true;
    await attachmentOne.save();

    res.status(200).json({ message: "Поле companyApproved успешно обновлено" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при обновлении поля companyApproved" });
  }
};

exports.checkCompanyApproved = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    const attachmentOne = await AttachmentOneModel.findById(attachmentOneId);

    if (!attachmentOne) {
      return res.status(404).json({ message: "Приложение 1 не найдено" });
    }

    const companyApproved = attachmentOne.companyApproved;

    res.status(200).json(companyApproved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при обновлении поля companyApproved" });
  }
};

exports.updateUniversityApproved = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    const attachmentOne = await AttachmentOneModel.findById(attachmentOneId);

    if (!attachmentOne) {
      return res.status(404).json({ message: "Приложение 1 не найдено" });
    }

    attachmentOne.universityApproved = true;
    await attachmentOne.save();

    res.status(200).json({ message: "Поле universityApproved успешно обновлено" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при обновлении поля companyApproved" });
  }
};

exports.checkUniversityApproved = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    const attachmentOne = await AttachmentOneModel.findById(attachmentOneId);

    if (!attachmentOne) {
      return res.status(404).json({ message: "Приложение 1 не найдено" });
    }

    const universityApproved = attachmentOne.universityApproved;

    res.status(200).json(universityApproved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при обновлении поля companyApproved" });
  }
};

exports.checkApprovalStatus = async (req, res) => {
  try {
    const attachmentOneId = req.params.id;
    const attachmentOne = await AttachmentOneModel.findById(attachmentOneId);

    if (!attachmentOne) {
      return res.status(404).json({ message: "Приложение 1 не найдено" });
    }

    const isApproved = attachmentOne.universityApproved && attachmentOne.companyApproved;
    res.status(200).json({ isApproved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при проверке статуса согласования" });
  }
};



