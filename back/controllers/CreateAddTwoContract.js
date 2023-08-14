const AttachmentOneModel = require('../models/addOneContract.js');
const AttachmentTwoModel = require('../models/addTwoContract.js');

exports.addAttachmentTwo = async (req, res) => {
    const attachmentOneId = req.params.id;
    const attachmentOne = await AttachmentOneModel.findById(attachmentOneId);
    if (!attachmentOne) {
      return res.status(404).json({ message: 'Запись AttachmentOne не найдена' });
    }
  
    const { location, placement } = req.body;
  
    try {
      let attachmentTwo = await AttachmentTwoModel.findOne({ AttachmentOne: attachmentOne._id });
  
      if (!attachmentTwo) {
        // Если запись AttachmentTwo не существует, создаем новый объект
        attachmentTwo = new AttachmentTwoModel({
          AttachmentOne: attachmentOne._id,
          location,
          placement
        });
      } else {
        // Если запись AttachmentTwo уже существует, обновляем ее поля
        attachmentTwo.location = location;
        attachmentTwo.placement = placement;
        attachmentTwo.companyApproved = false;
        attachmentTwo.universityApproved = false;
      }
  
      // Сохраняем или обновляем AttachmentTwo в базе данных
      await attachmentTwo.save();
  
      res.status(200).json({ attachmentTwoId: attachmentTwo._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Возникла ошибка при сохранении формы" });
    }
  };

exports.getAttachmentTwo = async (req, res) => {
    const attachmentOneId = req.params.id;

    try {
        const attachmentTwo = await AttachmentTwoModel.findOne({ AttachmentOne: attachmentOneId });

        if (attachmentTwo) {
        // Если AttachmentTwo существует, возвращаем true
        return res.status(200).json({ exists: true });
        } else {
        // Если AttachmentTwo отсутствует, возвращаем false
        return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Возникла ошибка при получении AttachmentTwo" });
    }
};

exports.getDataAttachmentTwo = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    const attachmentTwo = await AttachmentTwoModel.findOne({ AttachmentOne: attachmentOneId });

    if (attachmentTwo) {
      // Если AttachmentTwo существует, возвращаем его
      return res.status(200).json(attachmentTwo);
    } else {
      // Если AttachmentTwo отсутствует, возвращаем пустой объект
      return res.status(200).json({ attachmentTwo: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при получении AttachmentTwo" });
  }
};

exports.updateCompanyApproved = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    const attachmentTwo = await AttachmentTwoModel.findOne({ AttachmentOne: attachmentOneId });

    if (!attachmentTwo) {
      return res.status(404).json({ message: "Приложение 2 не найдено" });
    }

    attachmentTwo.companyApproved = true;
    await attachmentTwo.save();

    res.status(200).json({ message: "Поле companyApproved успешно обновлено" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при обновлении поля companyApproved" });
  }
};

exports.checkCompanyApproved = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    const attachmentTwo = await AttachmentTwoModel.findOne({ AttachmentOne: attachmentOneId });

    if (!attachmentTwo) {
      return res.status(404).json({ message: "Приложение 2 не найдено" });
    }


    const companyApproved = attachmentTwo.companyApproved;

    res.status(200).json(companyApproved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при обновлении поля companyApproved" });
  }
};

exports.updateUniversityApproved = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    const attachmentTwo = await AttachmentTwoModel.findOne({ AttachmentOne: attachmentOneId });

    if (!attachmentTwo) {
      return res.status(404).json({ message: "Приложение 2 не найдено" });
    }

    attachmentTwo.universityApproved = true;
    await attachmentTwo.save();

    res.status(200).json({ message: "Поле universityApproved успешно обновлено" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при обновлении поля companyApproved" });
  }
};

exports.checkUniversityApproved = async (req, res) => {
  const attachmentOneId = req.params.id;

  try {
    const attachmentTwo = await AttachmentTwoModel.findOne({ AttachmentOne: attachmentOneId });

    if (!attachmentTwo) {
      return res.status(404).json({ message: "Приложение 2 не найдено" });
    }

    const universityApproved = attachmentTwo.universityApproved;

    res.status(200).json(universityApproved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Возникла ошибка при обновлении поля companyApproved" });
  }
};

exports.checkApprovalStatus = async (req, res) => {
  try {
    const attachmentOneId = req.params.id;
    const attachmentTwo = await AttachmentTwoModel.findOne({ AttachmentOne: attachmentOneId });

    if (!attachmentTwo) {
      return res.status(404).json({ message: "Приложение 2 не найдено" });
    }

    const isApproved = attachmentTwo.universityApproved && attachmentTwo.companyApproved;
    res.status(200).json({ isApproved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при проверке статуса согласования" });
  }
};