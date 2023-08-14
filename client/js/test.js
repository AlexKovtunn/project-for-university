GenerateAddOneDoc.addEventListener("click", () => {  // КНОПКА СОЗДАНИЯ ПРИЛОЖЕНИЯ 1

    if (document.querySelector('.cabinet__main-attachment-one-list') != null){
      document.querySelector('.cabinet__main-attachment-one-list').classList.add('none');
    }

    //GenerateFinalDoc.classList.add('none');
    GenerateAddOneDoc.classList.add('none');

    var formStudentCount = document.createElement('form');

    var studentCountLabel = document.createElement('label');
    studentCountLabel.textContent = 'Сколько студентов?';
    var studentCountInput = document.createElement('input');
    studentCountInput.type = 'number';
    studentCountInput.name = 'studentCount';
    formStudentCount.appendChild(studentCountLabel);
    studentCountLabel.appendChild(studentCountInput);

    var submitButtonStudentCount = document.createElement('button');
    submitButtonStudentCount.type = 'submit';
    submitButtonStudentCount.textContent = 'Отправить';

    formStudentCount.appendChild(submitButtonStudentCount);

    bufferBaseProfileSection.appendChild(formStudentCount);

    formStudentCount.addEventListener("submit", function (event) {
      event.preventDefault();

      var countStudentsForCreateForms = parseInt(studentCountInput.value);

      formStudentCount.remove();

      var formAddOneContract = document.createElement('form');
      formAddOneContract.classList.add('cabinet__main-edit__addoneform')

      // Направление подготовки
      var trainingDirectionLabel = document.createElement('label');
      trainingDirectionLabel.textContent = 'Направление подготовки:';
      var trainingDirectionInput = document.createElement('input');
      trainingDirectionInput.type = 'text';
      trainingDirectionInput.name = 'trainingDirection';
      formAddOneContract.appendChild(trainingDirectionLabel);
      trainingDirectionLabel.appendChild(trainingDirectionInput);
      
      // Шифр
      var cipherLabel = document.createElement('label');
      cipherLabel.textContent = 'Шифр:';
      var cipherInput = document.createElement('input');
      cipherInput.type = 'text';
      cipherInput.name = 'cipher';
      formAddOneContract.appendChild(cipherLabel);
      cipherLabel.appendChild(cipherInput);
      
      // Название основной образовательной программы
      var mainProgramNameLabel = document.createElement('label');
      mainProgramNameLabel.textContent = 'Название основной образовательной программы:';
      var mainProgramNameInput = document.createElement('input');
      mainProgramNameInput.type = 'text';
      mainProgramNameInput.name = 'mainProgramName';
      formAddOneContract.appendChild(mainProgramNameLabel);
      mainProgramNameLabel.appendChild(mainProgramNameInput);
      
      // Вид практики
      var practiceTypeLabel = document.createElement('label');
      practiceTypeLabel.textContent = 'Вид практики:';
      var practiceTypeSelect = document.createElement('select');
      practiceTypeSelect.name = 'practiceType';
      // Добавление вариантов выбора
      var practiceTypes = ['учебная', 'производственная', 'педагогическая', 'научно-исследовательская'];
      for (var i = 0; i < practiceTypes.length; i++) {
        var option = document.createElement('option');
        option.value = practiceTypes[i];
        option.textContent = practiceTypes[i];
        practiceTypeSelect.appendChild(option);
      }
      formAddOneContract.appendChild(practiceTypeLabel);
      practiceTypeLabel.appendChild(practiceTypeSelect);
      

      for (var i = 0; i < countStudentsForCreateForms; i++) {
        var fullNameLabel = document.createElement('label');
        fullNameLabel.textContent = 'ФИО студента ' + (i + 1) + ' студента:';
        var fullNameInput = document.createElement('input');
        fullNameInput.type = 'text';
        fullNameInput.name = 'fullName_' + i;
        formAddOneContract.appendChild(fullNameLabel);
        fullNameLabel.appendChild(fullNameInput);
      
        // Код программы
        var programCodeLabel = document.createElement('label');
        programCodeLabel.textContent = 'Код программы ' + (i + 1) + ' студента:';
        var programCodeInput = document.createElement('input');
        programCodeInput.type = 'text';
        programCodeInput.name = 'programCode_' + i;
        formAddOneContract.appendChild(programCodeLabel);
        programCodeLabel.appendChild(programCodeInput);
      
        // Курс
        var courseLabel = document.createElement('label');
        courseLabel.textContent = 'Курс ' + (i + 1) + ' студента:';
        var courseInput = document.createElement('input');
        courseInput.type = 'number';
        courseInput.name = 'course_' + i;
        formAddOneContract.appendChild(courseLabel);
        courseLabel.appendChild(courseInput);
      
        // Группа
        var groupLabel = document.createElement('label');
        groupLabel.textContent = 'Группа ' + (i + 1) + ' студента:';
        var groupInput = document.createElement('input');
        groupInput.type = 'text';
        groupInput.name = 'group_' + i;
        formAddOneContract.appendChild(groupLabel);
        groupLabel.appendChild(groupInput);
      
        // Даты практики
        var practiceDatesLabel = document.createElement('label');
        practiceDatesLabel.textContent = 'Даты практики ' + (i + 1) + ' студента:';
        var practiceDatesInput = document.createElement('input');
        practiceDatesInput.type = 'text';
        practiceDatesInput.name = 'practiceDates_' + i;
        formAddOneContract.appendChild(practiceDatesLabel);
        practiceDatesLabel.appendChild(practiceDatesInput);
      }


      // ФИО руководителя практики от кафедры
      var practiceSupervisorLabel = document.createElement('label');
      practiceSupervisorLabel.textContent = 'ФИО руководителя практики от кафедры:';
      var practiceSupervisorInput = document.createElement('input');
      practiceSupervisorInput.type = 'text';
      practiceSupervisorInput.name = 'practiceSupervisor';
      formAddOneContract.appendChild(practiceSupervisorLabel);
      practiceSupervisorLabel.appendChild(practiceSupervisorInput);
      
      // Кнопка отправки формы
      var submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.textContent = 'Отправить';

      formAddOneContract.addEventListener("submit", function (event) {
        event.preventDefault();
        
      
        // Создаем массив для хранения данных студентов
        var studentsData = [];
      
        // Получаем значения полей формы, относящихся к остальным данным
        var trainingDirection = document.querySelector('input[name="trainingDirection"]').value;
        var cipher = document.querySelector('input[name="cipher"]').value;
        var mainProgramName = document.querySelector('input[name="mainProgramName"]').value;
        var practiceType = document.querySelector('select[name="practiceType"]').value;
        var practiceSupervisor = document.querySelector('input[name="practiceSupervisor"]').value;
      
        // Обходим каждую форму студента
        for (var i = 0; i < countStudentsForCreateForms; i++) {
          // Создаем объект данных студента
          var studentData = {};
      
          // Получаем значения полей каждой формы студента
          var fullName = document.querySelector('input[name="fullName_' + i + '"]').value;
          var programCode = document.querySelector('input[name="programCode_' + i + '"]').value;
          var course = document.querySelector('input[name="course_' + i + '"]').value;
          var group = document.querySelector('input[name="group_' + i + '"]').value;
          var practiceDates = document.querySelector('input[name="practiceDates_' + i + '"]').value;
      
          // Заполняем объект данных студента
          studentData.fullName = fullName;
          studentData.programCode = programCode;
          studentData.course = course;
          studentData.group = group;
          studentData.practiceDates = practiceDates;
      
          // Добавляем объект данных студента в массив
          studentsData.push(studentData);
        }
      
        // Создаем объект данных для остальных полей формы
        var otherFormData = {
          trainingDirection: trainingDirection,
          cipher: cipher,
          mainProgramName: mainProgramName,
          practiceType: practiceType,
          practiceSupervisor: practiceSupervisor
        };
      
        // Отправляем данные студентов и остальные данные на сервер
        async function sendFormData(studentsData, otherFormData) {
          try {
            const response = await fetch(`http://localhost:5555/create-add-one-contract/${companyDetails._id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // добавляем токен в заголовок запроса
              },
              body: JSON.stringify({
                studentsData: studentsData,
                otherFormData: otherFormData
              })
            });
        
            if (response.ok) {
              const dataFromAttachmentOne = await response.json();
              const addOneContactId = dataFromAttachmentOne.attachmentOneId;
              console.log(addOneContactId);

              const GenerateAddOneDoc = document.createElement('button');
              GenerateAddOneDoc.textContent = 'Скачать демо-версию приложения 1';
              GenerateAddOneDoc.classList.add('cabinet__main-generate-finaldoc');

              // добавить сюда обработчик кнопки

              const editDataAddOneBtn = document.createElement('button');
              editDataAddOneBtn.textContent = 'Редактировать данные приложения 1';
              editDataAddOneBtn.classList.add('cabinet__main-edit-data');
              bufferBaseProfileSection.appendChild(editDataAddOneBtn);

              // добавить сюда обработчик кнопки

              const approveDocAddOneBtn = document.createElement('button');
              approveDocAddOneBtn.textContent = 'Согласовать документ';
              approveDocAddOneBtn.classList.add('cabinet__main-approve-doc');
              bufferBaseProfileSection.appendChild(approveDocAddOneBtn);

              approveDocAddOneBtn.addEventListener("click", function() {
                approveDocAddOneBtn.remove();
                editDataAddOneBtn.remove();
                GenerateAddOneDoc.remove();


// отправка данныъ на согласование
// получение одобрения

                
                const GenerateFinalAddOneDoc = document.createElement('button');
                GenerateFinalAddOneDoc.textContent = 'Скачать финальную приложение 1';
                GenerateFinalAddOneDoc.classList.add('cabinet__main-generate-finaldoc');

                if (GenerateFinalAddOneDoc != null){
                  GenerateFinalAddOneDoc.addEventListener("click", async () => {
                    try {
                      const response = await fetch(`http://localhost:5555/generate-add-one-doc/${addOneContactId}`, {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}` // добавляем токен в заголовок запроса
                        }
                      });
                  
                      if (response.ok) {
                        response.blob().then((blob) => {
                          var url = window.URL.createObjectURL(blob);
                          var a = document.createElement("a");
                          document.body.appendChild(a);
                          a.style = "display: none";
                          a.href = url;
                          a.download = "finaladdone.docx"; // название файла, который вы сгенерировали на бэкэнде
                          a.click();
                          window.URL.revokeObjectURL(url);
                        });
                        // Добавьте здесь вашу логику для обработки полученных данных
                      } else {
                        const errorData = await response.json();
                        console.log(errorData);
                        // Обработка ошибки при выполнении запроса
                      }
                    } catch (error) {
                      console.log(error);
                      // Обработка ошибки при выполнении запроса
                    }
                  });
                }


                async function getAttachmentTwo() {
                  try {
                    const response = await fetch(`/get-add-two/${addOneContactId}`, {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      }
                    });
                
                    if (!response.ok) {
                      throw new Error(response.statusText);
                    }
                
                    const getAddTwo = await response.json();
                
                    if (getAddTwo.exists) {
                      const getAddTwoTrue = document.createElement('p');
                      getAddTwoTrue.textContent = 'Приложение 2';
                      getAddTwoTrue.classList.add('cabinet__main-approve-false');
                      bufferBaseProfileSection.appendChild(getAddTwoTrue);

                      const GenerateAddTwoDoc = document.createElement('button');
                      GenerateAddTwoDoc.textContent = 'Скачать демо-версию приложение 2';
                      GenerateAddTwoDoc.classList.add('cabinet__main-generate-finaldoc');

                      const approveDocAddTwoBtn = document.createElement('button');
                      approveDocAddTwoBtn.textContent = 'Согласовать документ';
                      approveDocAddTwoBtn.classList.add('cabinet__main-approve-doc');

                      approveDocAddTwoBtn.addEventListener("click", function() {
                        approveDocAddTwoBtn.remove();
                        GenerateAddTwoDoc.remove();

                        // отправить согласованеи на сервер
                        // прочитать статуст согалсовани с сервера

                        const GenerateFinalAddTwoDoc = document.createElement('button');
                        GenerateFinalAddTwoDoc.textContent = 'Скачать финальную приложение 2';
                        GenerateFinalAddTwoDoc.classList.add('cabinet__main-generate-finaldoc');

                        if (GenerateFinalAddTwoDoc != null){
                          GenerateFinalAddTwoDoc.addEventListener("click", async () => {
                            try {
                              const response = await fetch(`http://localhost:5555/generate-add-two-doc/${addOneContactId}`, {
                                method: 'GET',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}` // добавляем токен в заголовок запроса
                                }
                              });
                          
                              if (response.ok) {
                                response.blob().then((blob) => {
                                  var url = window.URL.createObjectURL(blob);
                                  var a = document.createElement("a");
                                  document.body.appendChild(a);
                                  a.style = "display: none";
                                  a.href = url;
                                  a.download = "finaladdtwo.docx"; // название файла, который вы сгенерировали на бэкэнде
                                  a.click();
                                  window.URL.revokeObjectURL(url);
                                });
                                // Добавьте здесь вашу логику для обработки полученных данных
                              } else {
                                const errorData = await response.json();
                                console.log(errorData);
                                // Обработка ошибки при выполнении запроса
                              }
                            } catch (error) {
                              console.log(error);
                              // Обработка ошибки при выполнении запроса
                            }
                          });
                        }
                        bufferBaseProfileSection.appendChild(GenerateFinalAddTwoDoc);
                      })

                      // проверить появление логтипа "Прилжерние 2"
                      bufferBaseProfileSection.appendChild(GenerateAddTwoDoc); // ?
                      bufferBaseProfileSection.appendChild(approveDocAddTwoBtn);

                      GenerateAddTwoDoc.addEventListener("click", async () => {
                        try {
                          const response = await fetch(`http://localhost:5555/generate-demo-add-two-doc/${addOneContactId}`, {
                            method: 'GET',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}` // добавляем токен в заголовок запроса
                            }
                          });
                      
                          if (response.ok) {
                            response.blob().then((blob) => {
                              var url = window.URL.createObjectURL(blob);
                              var a = document.createElement("a");
                              document.body.appendChild(a);
                              a.style = "display: none";
                              a.href = url;
                              a.download = "demoaddtwo.docx"; // название файла, который вы сгенерировали на бэкэнде
                              a.click();
                              window.URL.revokeObjectURL(url);
                            });
                            // Добавьте здесь вашу логику для обработки полученных данных
                          } else {
                            const errorData = await response.json();
                            console.log(errorData);
                            // Обработка ошибки при выполнении запроса
                          }
                        } catch (error) {
                          console.log(error);
                          // Обработка ошибки при выполнении запроса
                        }
                      });

                    } else {
                      const getAddTwoFalse = document.createElement('p');
                      getAddTwoFalse.textContent = 'Компания ещё не инициировала создание приложения 2';
                      getAddTwoFalse.classList.add('cabinet__main-approve-false');
                      bufferBaseProfileSection.appendChild(getAddTwoFalse);
                    }
                  } catch (error) {
                    console.log('Ошибка запроса:', error.message);
                  }
                }
                
                getAttachmentTwo();

                bufferBaseProfileSection.appendChild(GenerateFinalAddOneDoc);
              })

              GenerateAddOneDoc.addEventListener("click", async () => {
                try {
                  const response = await fetch(`http://localhost:5555/generate-demo-add-one-doc/${addOneContactId}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}` // добавляем токен в заголовок запроса
                    }
                  });
              
                  if (response.ok) {
                    response.blob().then((blob) => {
                      var url = window.URL.createObjectURL(blob);
                      var a = document.createElement("a");
                      document.body.appendChild(a);
                      a.style = "display: none";
                      a.href = url;
                      a.download = "demoaddone.docx"; // название файла, который вы сгенерировали на бэкэнде
                      a.click();
                      window.URL.revokeObjectURL(url);
                    });
                    // Добавьте здесь вашу логику для обработки полученных данных
                  } else {
                    const errorData = await response.json();
                    console.log(errorData);
                    // Обработка ошибки при выполнении запроса
                  }
                } catch (error) {
                  console.log(error);
                  // Обработка ошибки при выполнении запроса
                }
              });
              bufferBaseProfileSection.appendChild(GenerateAddOneDoc);
            } else {
              const errors = await response.json();
              console.log(errors);
            }
          } catch (error) {
            console.log(error);
          }
        }
        formAddOneContract.remove();
        sendFormData(studentsData, otherFormData);
      });

      formAddOneContract.appendChild(submitButton);
      bufferBaseProfileSection.appendChild(formAddOneContract);
    })
  })