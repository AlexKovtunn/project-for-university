async function sendRequest(url, method, body = null, token, rawResponse = false) {
  const headers = {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${token}`
  };

  const requestOptions = {
    method: method,
    headers: headers,
  };

  if (body !== null) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(response.status);
    }

    if (rawResponse) {
      return response;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", function() {
    const avatarInput = document.querySelector('.cabinet__acc-input');
    const avatarPreview = document.querySelector('.cabinet__acc-img');
    
    avatarInput.addEventListener('change', function() {
        const file = this.files[0];
        const reader = new FileReader();
    
        reader.addEventListener('load', function() {
            avatarPreview.src = reader.result;
        });
    
        reader.readAsDataURL(file);
    });

    const editProfileSection = document.querySelector('.cabinet__main-profile');
    const buttonEditProfile = document.querySelector('.cabinet__acc-edit');
    const buttonBacktoCompanies = document.querySelector('.cabinet__acc-companies-list');
    const buttonBacktoDocuments = document.querySelector('.cabinet__acc-documents-list');
    const baseProfileSection = document.querySelector('.cabinet__main-base');
    const mainProfileSection = document.querySelector('.cabinet__main');

    const editProfileUniForm = document.querySelector('.edit-university');
    const editProfileCompForm = document.querySelector('.edit-company');


    let bufferEditProfileSection = editProfileSection;
    let bufferBaseProfileSection = baseProfileSection;

    window.onload = function() {
      mainProfileSection.innerHTML = '';
      bufferEditProfileSection.innerHTML = '';
      mainProfileSection.appendChild(bufferBaseProfileSection);

      if (localStorage.getItem('userRole') === 'university') {
        buttonBacktoCompanies.classList.remove('none');
        buttonBacktoDocuments.classList.add('none');
        const fetchData = async () => {
          try {
            const response = await fetch('/get-data-of-university', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            const data = await response.json();
            const universityInputs = editProfileUniForm.querySelectorAll('.edit-university__input-text');
            for (let i = 0; i < universityInputs.length; i++) {
              const inputName = universityInputs[i].getAttribute('name');
              if (inputName in data) {
                universityInputs[i].value = data[inputName];
              }
            }
          } catch (error) {
            console.error('Данные о предприятии пока не заполнены');
          }
        };
      
        fetchData(); // Ожидаем завершения запроса
      
        bufferEditProfileSection.appendChild(editProfileUniForm);
      }
      
      if (localStorage.getItem('userRole') === 'company') {
        buttonBacktoCompanies.classList.add('none');
        buttonBacktoDocuments.classList.remove('none');
        (async () =>{
          try {
            const companyDetailsResponse = await fetch(`/get-inf-about-me`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (companyDetailsResponse.ok) {
              let companyDetails = await companyDetailsResponse.json();

              const companyInputs = editProfileCompForm.querySelectorAll('.edit-company__input-text');
                for (let i = 0; i < companyInputs.length; i++) {
                  const inputName = companyInputs[i].getAttribute('name');
                  if (inputName in companyDetails) {
                    companyInputs[i].value = companyDetails[inputName];
                  }
              }
            } else {
              throw new Error('Ошибка получения деталей компании');
            }
          }
        catch (error) {
          console.error(error);
        }
      })();

        bufferEditProfileSection.appendChild(editProfileCompForm);
      }
    }


    buttonEditProfile.addEventListener('click', function() {

      mainProfileSection.innerHTML = '';

      if (localStorage.getItem('userRole') === 'university') {
        const fetchData = async () => {
          try {
            const response = await fetch('/get-data-of-university', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            const data = await response.json();
            const universityInputs = editProfileUniForm.querySelectorAll('.edit-university__input-text');
            for (let i = 0; i < universityInputs.length; i++) {
              const inputName = universityInputs[i].getAttribute('name');
              if (inputName in data) {
                universityInputs[i].value = data[inputName];
              }
            }
          } catch (error) {
            console.error('Данные о предприятии пока не заполнены');
          }
        };
      
        fetchData(); // Ожидаем завершения запроса
      
        bufferEditProfileSection.appendChild(editProfileUniForm);
      }
      
      if (localStorage.getItem('userRole') === 'company') {
        //buttonBacktoCompanies.classList.add('none');
        (async () =>{
          try {
            const companyDetailsResponse = await fetch(`/get-inf-about-me`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (companyDetailsResponse.ok) {
              let companyDetails = await companyDetailsResponse.json();

              const companyInputs = editProfileCompForm.querySelectorAll('.edit-company__input-text');
                for (let i = 0; i < companyInputs.length; i++) {
                  const inputName = companyInputs[i].getAttribute('name');
                  if (inputName in companyDetails) {
                    companyInputs[i].value = companyDetails[inputName];
                  }
              }
            } else {
              throw new Error('Ошибка получения деталей компании');
            }
          }
        catch (error) {
          console.error(error);
        }
      })();

        bufferEditProfileSection.appendChild(editProfileCompForm);
      }

      mainProfileSection.appendChild(bufferEditProfileSection);

    })    



    buttonBacktoCompanies.addEventListener('click', function() {
      mainProfileSection.innerHTML = '';
      mainProfileSection.appendChild(bufferBaseProfileSection);  // ?
    })

    buttonBacktoDocuments.addEventListener('click', function() {
      mainProfileSection.innerHTML = '';
      mainProfileSection.appendChild(bufferBaseProfileSection);  // ?
    }) 

    if (localStorage.getItem('UserRole') === 'university') {
      bufferEditProfileSection.appendChild(editProfileUniForm);
    } else {
      bufferEditProfileSection.appendChild(editProfileCompForm);
    }

    const token = localStorage.getItem('token');

    const editUniProfileForm = document.querySelector('.edit-university__form');

    editUniProfileForm.addEventListener('submit', async (event) => {
      event.preventDefault();
    
      const formData = new FormData(editUniProfileForm);

      try {
        const response = await fetch('http://localhost:5555/edit-uni-profile', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}` // добавляем токен в заголовок запроса
          }
        });
    
        if (response.ok) {
          const form = await response.json();
          console.log(form);

          const universityAdress = document.querySelector('[name="universityAdress"]').value;
          const universityIndex = document.querySelector('[name="universityIndex"]').value;
          const universityOGRN = document.querySelector('[name="universityOGRN"]').value;
          const universityINN = document.querySelector('[name="universityINN"]').value;
          const universityKPP = document.querySelector('[name="universityKPP"]').value;
          const universityViceRectorName = document.querySelector('[name="universityViceRectorName"]').value;
          const universityViceRectorNameFull = document.querySelector('[name="universityViceRectorNameFull"]').value;
          const universityJobTitle = document.querySelector('[name="universityJobTitle"]').value;
          const universityJobTitleFull = document.querySelector('[name="universityJobTitleFull"]').value;
          const universityPowerOfAttorney = document.querySelector('[name="universityPowerOfAttorney"]').value;
          const universityPowerOfAttorneyDate = document.querySelector('[name="universityPowerOfAttorneyDate"]').value;
        
          // создаем объект с ответами пользователя
          const universityProfileAnswers = {
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
            universityPowerOfAttorneyDate
          };

        } else {
          const errors = await response.json();
          console.log(errors);
        }
      } catch (error) {
        console.log(error);
      }
    });

    const editCompanyProfileForm = document.querySelector('.edit-company__form');

    editCompanyProfileForm.addEventListener('submit', async (event) => {
      event.preventDefault();
    
      const formData = new FormData(editCompanyProfileForm);

      try {
        const response = await fetch('http://localhost:5555/edit-comp-profile', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}` // добавляем токен в заголовок запроса
          }
        });
    
        if (response.ok) {
          const form = await response.json();
          console.log(form);

          const companyAdress = document.querySelector('[name="companyAdress"]').value;
          const companyName = document.querySelector('[name="companyName"]').value;
          const companyNameFull = document.querySelector('[name="companyNameFull"]').value;
          const companyIndex = document.querySelector('[name="companyIndex"]').value;
          const companyRequisites = document.querySelector('[name="companyRequisites"]').value;
          const companyEmployeeName = document.querySelector('[name="companyEmployeeName"]').value;
          const companyEmployeeNameFull = document.querySelector('[name="companyEmployeeNameFull"]').value;
          const companyJobTitle = document.querySelector('[name="companyJobTitle"]').value;
          const companyJobTitleFull = document.querySelector('[name="companyJobTitleFull"]').value;
          const companyPowerOfAttorney = document.querySelector('[name="companyPowerOfAttorney"]').value;
        
          // создаем объект с ответами пользователя
          const companyProfileAnswers = {
            companyAdress,
            companyName,
            companyNameFull,
            companyIndex,
            companyRequisites,
            companyEmployeeName,
            companyEmployeeNameFull,
            companyJobTitle,
            companyJobTitleFull,
            companyPowerOfAttorney
          };

        } else {
          const errors = await response.json();
          console.log(errors);
        }
      } catch (error) {
        console.log(error);
      }
    });
    
    const logoutBtn = document.querySelector('.cabinet__acc-exit');

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '../index.html';
    });


    if (localStorage.getItem('userRole') === 'university') {
      const companyList = document.querySelector('.cabinet__main-list');
      const fetchCompanies = async () => {
        try {
          const response = await fetch('/get-companies', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const companies = await response.json();
            if (companies.length > 0) {
              companies.forEach(company => {
                const companyListItem = document.createElement('li');
                companyListItem.classList.add('cabinet__main-item');
                const companyName = document.createElement('span');
                const companyAddress = document.createElement('span');
                companyName.textContent = `Название предприятия: "${company.companyName}"`;
                companyAddress.textContent = `Адрес предприятия: ${company.companyAdress}`;
                companyListItem.appendChild(companyName);
                companyListItem.appendChild(companyAddress);
                companyListItem.addEventListener('click', async () => {
                  try {
                    const companyDetailsResponse = await fetch(`/get-details-about-company/${company._id}`, {
                      method: 'GET',
                      headers: {
                        'Authorization': `Bearer ${token}`
                      }
                    });
                    if (companyDetailsResponse.ok) {
                      const companyDetails = await companyDetailsResponse.json();
                      console.log(companyDetails);
                      companyList.classList.add('none');
                      //const backToCompaniesButton = document.createElement('button');
                      //backToCompaniesButton.classList.add('cabinet__main-back-button');
                      //backToCompaniesButton.textContent = 'Вернуться к списку предприятий';
                      //bufferBaseProfileSection.appendChild(backToCompaniesButton);
  
                      
                      const companyLabel = document.createElement('div');
                      companyLabel.innerHTML = "<b>" + companyDetails.companyName + "</b>";
                      bufferBaseProfileSection.appendChild(companyLabel);

                      const contractDiv = document.createElement('div');
                      contractDiv.innerText = "Договор";
                      bufferBaseProfileSection.appendChild(contractDiv);


                      if (!companyDetails.contractCreated){
                        const createDemoDoc = document.createElement('button');
                        createDemoDoc.classList.add('cabinet__main-back-button');
                        createDemoDoc.textContent = 'Перейти к созданию договора';
                        bufferBaseProfileSection.appendChild(createDemoDoc);
      
                        createDemoDoc.addEventListener('click', () => {
                          const form = document.createElement('form');
  
                          const contractNumber = document.createElement('div');
                          const contractNumberLabel = document.createElement('label');
                          contractNumberLabel.setAttribute('for', 'contractNumber');
                          contractNumberLabel.innerText = 'Номер контракта: ';
                          const contractNumberInput = document.createElement('input');
                          contractNumberInput.setAttribute('type', 'text');
                          contractNumberInput.setAttribute('id', 'contractNumber');
                          contractNumberInput.setAttribute('name', 'contractNumber');
                          contractNumberInput.setAttribute('required', true);
                          contractNumber.appendChild(contractNumberLabel);
                          contractNumber.appendChild(contractNumberInput);
                          
                          const contractDate = document.createElement('div');
                          const contractDateLabel = document.createElement('label');
                          contractDateLabel.setAttribute('for', 'contractDate');
                          contractDateLabel.innerText = 'Дата контракта: ';
                          const contractDateInput = document.createElement('input');
                          contractDateInput.setAttribute('type', 'text');
                          contractDateInput.setAttribute('id', 'contractDate');
                          contractDateInput.setAttribute('name', 'contractDate');
                          contractDateInput.setAttribute('required', true);
                          contractDate.appendChild(contractDateLabel);
                          contractDate.appendChild(contractDateInput);
  
                          const month = document.createElement('div');
                          const monthLabel = document.createElement('label');
                          monthLabel.setAttribute('for', 'contractMonth');
                          monthLabel.innerText = 'Месяц: ';
                          const monthInput = document.createElement('input');
                          monthInput.setAttribute('type', 'text');
                          monthInput.setAttribute('id', 'contractMonth');
                          monthInput.setAttribute('name', 'contractMonth');
                          monthInput.setAttribute('required', true);
                          month.appendChild(monthLabel);
                          month.appendChild(monthInput);
                          
                          const year = document.createElement('div');
                          const yearLabel = document.createElement('label');
                          yearLabel.setAttribute('for', 'contractYear');
                          yearLabel.innerText = 'Год: ';
                          const yearInput = document.createElement('input');
                          yearInput.setAttribute('type', 'number');
                          yearInput.setAttribute('id', 'contractYear');
                          yearInput.setAttribute('name', 'contractYear');
                          yearInput.setAttribute('required', true);
                          year.appendChild(yearLabel);
                          year.appendChild(yearInput);
  
                          const submitButton = document.createElement('button');
                          submitButton.type = 'submit';
                          submitButton.textContent = 'Отправить';
  
                          form.appendChild(contractNumber);
                          form.appendChild(contractDate);
                          form.appendChild(month);
                          form.appendChild(year);
                          form.appendChild(submitButton);
  
                          form.classList.add('cabinet__main-form')
  
                          bufferBaseProfileSection.appendChild(form);
                          createDemoDoc.classList.add('none');
  
                          document.querySelector('.cabinet__main-form').addEventListener('submit', async (event) => {
                            event.preventDefault();
                            const { contractNumber, contractDate, contractMonth, contractYear } = event.target.elements;
                            try {
                              const response = await fetch('/add-date-and-number-contract', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                  contractNumber: contractNumber.value,
                                  contractDate: contractDate.value,
                                  contractMonth: contractMonth.value,
                                  contractYear: contractYear.value,
                                })
                              });
                              const dateAndNumberOfContract = await response.json();
                              console.log(dateAndNumberOfContract);
                              
                              try {
                                const mainPartResponse = await fetch('/create-main-part-of-contact', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                  },
                                  body: JSON.stringify({
                                    contract: dateAndNumberOfContract._id, 
                                    company: companyDetails._id, 
                                  })
                                });
                                const mainPartOfContract = await mainPartResponse.json();
                                console.log(mainPartOfContract);
  
                                fetch(`/update-contract-created/${companyDetails._id}`, {
                                  method: 'PUT',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                  }
                                })
                                .then(response => {
                                  if (!response.ok) {
                                    throw new Error(`Не удалось обновить статус contractCreated. Ошибка HTTP: ${response.status}`);
                                  }
                                  return response.json();
                                })
                                .then(data => {
                                  console.log(data);
                                })
                                .catch(error => {
                                  console.error('Не удалось обновить статус contractCreated. Ошибка при отправке запроса:', error);
                                });
                                
                                const bufferDateAndNumberContract = document.querySelector('.cabinet__main-form').cloneNode(true);
                                document.querySelector('.cabinet__main-form').remove();
                                const CreateDemoDocBtn = document.createElement('button');
                                CreateDemoDocBtn.textContent = 'Скачать пробный документ';
                                CreateDemoDocBtn.classList.add('cabinet__main-generate-doc');
                                bufferBaseProfileSection.appendChild(CreateDemoDocBtn);
  
                                // Кнопка "Редактировать данные"
                                const editDataBtn = document.createElement('button');
                                editDataBtn.textContent = 'Редактировать данные договора';
                                editDataBtn.classList.add('cabinet__main-edit-data');
                                bufferBaseProfileSection.appendChild(editDataBtn);
  
                                editDataBtn.addEventListener('click', async function(){
                                  const editDataAndNumberOfContract = document.createElement('form');
                                  editDataAndNumberOfContract.classList.add('cabinet__main-edit-datanumber_form');
  
                                  editDataAndNumberOfContract.innerHTML = bufferDateAndNumberContract.innerHTML;
                                  try {
                                    const response = await fetch(`/get-data-and-number-of-contract/${dateAndNumberOfContract._id}`, {
                                      method: 'GET',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                      }
                                    });
                                    const dateAndNumberOfContractFromBD = await response.json();
                                    const dataAndNumberInputs = editDataAndNumberOfContract.querySelectorAll('input');
                                    for (let i = 0; i < dataAndNumberInputs.length; i++) {
                                      const inputDataAndNumberName = dataAndNumberInputs[i].getAttribute('name');
                                      if (inputDataAndNumberName in dateAndNumberOfContractFromBD) {
                                        dataAndNumberInputs[i].value = dateAndNumberOfContractFromBD[inputDataAndNumberName];
                                      }
                                    }
                                  } catch (error) {
                                    console.error(error);
                                  }
  
  
  
                                  const universityForm = document.createElement('form');
                                  universityForm.classList.add('cabinet__main-edit-uni_form');
                                  const editUniversityForm = editProfileSection.querySelector('.edit-university__form');
                                    
                                  const formElements = editUniversityForm.cloneNode(true);
                                  const fileInputs = formElements.querySelectorAll('.edit-university__label-file');
                                  fileInputs.forEach(input => input.remove());
                                    
                                  universityForm.innerHTML = formElements.innerHTML;
                                
                                  try {
                                    const response = await fetch('/get-data-of-university', {
                                      method: 'GET',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                      }
                                    });
                                    const data = await response.json();
                                    const universityInputs = universityForm.querySelectorAll('.edit-university__input-text');
                                    for (let i = 0; i < universityInputs.length; i++) {
                                      const inputName = universityInputs[i].getAttribute('name');
                                      if (inputName in data) {
                                        universityInputs[i].value = data[inputName];
                                      }
                                    }
                                  } catch (error) {
                                    console.error(error);
                                  }
                                
                                  const containerWithEditUniForms = document.createElement('div');
                                  containerWithEditUniForms.appendChild(editDataAndNumberOfContract);
                                  containerWithEditUniForms.appendChild(universityForm);
                                  containerWithEditUniForms.classList.add('cabinet__main-container-edituni');
  
                                  editDataBtn.style.display = 'none';
  
                                  const closeEditBtn = document.createElement('button');
                                  closeEditBtn.textContent = 'Закрыть редактирование';
                                  closeEditBtn.classList.add('cabinet__main-edit-data');
                                  containerWithEditUniForms.appendChild(closeEditBtn);
                                  
                                  closeEditBtn.addEventListener('click', () => {
                                    editDataBtn.style.display = 'block';
                                    containerWithEditUniForms.remove();
                                  });
  
                                  bufferBaseProfileSection.appendChild(containerWithEditUniForms);
  
                                  editDataAndNumberOfContract.addEventListener('submit', async (event) => {
                                    event.preventDefault();
                                  
                                    const formData = new FormData(event.target);
                                    const data = Object.fromEntries(formData.entries());
                                  
                                    try {
                                      const response = await fetch(`/update-date-and-number-of-contract/${dateAndNumberOfContract._id}`, {
                                        method: 'PUT',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify(data),
                                      });
                                  
                                      const updatedData = await response.json();
                                      console.log(updatedData);
                                    } catch (error) {
                                      console.error(error);
                                    }
                                  });
  
                                  universityForm.addEventListener('submit', async (event) => {
                                    event.preventDefault();
                                  
                                    const formData = new FormData(event.target);
                                    const data = Object.fromEntries(formData.entries());
                                  
                                    try {
                                      const response = await fetch(`/update-data-of-university`, {
                                        method: 'PUT',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify(data),
                                      });
                                  
                                      const updatedData = await response.json();
                                      console.log(updatedData);
                                    } catch (error) {
                                      console.error(error);
                                    }
                                  });
                                });
  
                                // Кнопка "Согласовать документ"
                                const approveDocBtn = document.createElement('button');
                                approveDocBtn.textContent = 'Согласовать документ';
                                approveDocBtn.classList.add('cabinet__main-approve-doc');

                                approveDocBtn.addEventListener("click", () => {
                                  console.log('asdasd');
                                  fetch(`/update-uni-approve-in-main-contract/${mainPartOfContract._id}`, {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                      'Authorization': `Bearer ${token}`
                                    },
                                  })
                                  .then((response) => {
                                    if (!response.ok) {
                                      throw new Error(response.status);
                                    }
                                    return response.json();
                                  })
                                  .then((uniApprovedStatusTrue) => {
                                    console.log(`Статус согласования на university: ${uniApprovedStatusTrue.universityApproved}`);
                                    
                                    approveDocBtn.remove();
                                    document.querySelector('.cabinet__main-generate-doc').remove();
                                    editDataBtn.remove();

                                    fetch(`/get-status-about-approved/${mainPartOfContract._id}`, {
                                      method: 'GET',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                      },
                                    })
                                      .then(response => {
                                        if (!response.ok) {
                                          throw new Error(response.status);
                                        }
                                        return response.json();
                                      })
                                      .then(checkApproveStatus => {
                                        if (checkApproveStatus.isApproved) {
                                          const GenerateFinalDoc = document.createElement('button');
                                          GenerateFinalDoc.textContent = 'Скачать главную часть договора';
                                          GenerateFinalDoc.classList.add('cabinet__main-generate-finaldoc');

                                          const GenerateAddOneDoc = document.createElement('button');
                                          GenerateAddOneDoc.textContent = 'Перейти к созданию приложения 1';
                                          GenerateAddOneDoc.classList.add('cabinet__main-generate-addonedoc');

                                          GenerateFinalDoc.addEventListener("click", () => {
                                            fetch(`/generate-final-doc/${companyDetails._id}`, {
                                              method: "GET",
                                              headers: {
                                                "Content-Type": "application/json",
                                                'Authorization': `Bearer ${token}`
                                              },
                                            })
                                              .then((response) => {
                                                if (!response.ok) {
                                                  throw new Error(response.status);
                                                }
                                                response.blob().then((blob) => {
                                                  var url = window.URL.createObjectURL(blob);
                                                  var a = document.createElement("a");
                                                  document.body.appendChild(a);
                                                  a.style = "display: none";
                                                  a.href = url;
                                                  a.download = "final.docx"; // название файла, который вы сгенерировали на бэкэнде
                                                  a.click();
                                                  window.URL.revokeObjectURL(url);
                                                });
                                              })
                                              .catch((error) => {
                                                console.error(error);
                                                // здесь можно обработать ошибку
                                              });
                                          });

                                          bufferBaseProfileSection.appendChild(GenerateFinalDoc);
                                          const addOneDocDiv = document.createElement('div');
                                          addOneDocDiv.innerText = "Приложение 1";
                                          bufferBaseProfileSection.appendChild(addOneDocDiv);
                                          bufferBaseProfileSection.appendChild(GenerateAddOneDoc);
                                        } else {
                                          const CreateDemoDocBtn = document.createElement('button');
                                          CreateDemoDocBtn.textContent = 'Скачать пробный документ';
                                          CreateDemoDocBtn.classList.add('cabinet__main-generate-doc');
                                          bufferBaseProfileSection.appendChild(CreateDemoDocBtn);
                                          document.querySelector('.cabinet__main-generate-doc').addEventListener("click", () => {
                                            fetch(`/generate-demo-doc/${companyDetails._id}`, {
                                              method: "GET",
                                              headers: {
                                                "Content-Type": "application/json",
                                                'Authorization': `Bearer ${token}`
                                              },
                                            })
                                              .then((response) => {
                                                if (!response.ok) {
                                                  throw new Error(response.status);
                                                }
                                                response.blob().then((blob) => {
                                                  var url = window.URL.createObjectURL(blob);
                                                  var a = document.createElement("a");
                                                  document.body.appendChild(a);
                                                  a.style = "display: none";
                                                  a.href = url;
                                                  a.download = "demo.docx"; // название файла, который вы сгенерировали на бэкэнде
                                                  a.click();
                                                  window.URL.revokeObjectURL(url);
                                                });
                                              })
                                              .catch((error) => {
                                                console.error(error);
                                                // здесь можно обработать ошибку
                                              });
                                          });
                                        
                                          const approveStatusFalse = document.createElement('p');
                                          approveStatusFalse.textContent = 'Компания не подтвердила согласование';
                                          approveStatusFalse.classList.add('cabinet__main-approve-false');
                                          bufferBaseProfileSection.appendChild(approveStatusFalse);
                                        }
                                      })
                                      .catch(error => {
                                        console.error(error);
                                        // обработать ошибку
                                      });
                                  })
                                  .catch((error) => {
                                    console.error(error);
                                    // здесь можно обработать ошибку
                                  });
                                });

                                bufferBaseProfileSection.appendChild(approveDocBtn);
  
                                document.querySelector('.cabinet__main-generate-doc').addEventListener("click", () => {
                                  fetch(`/generate-demo-doc/${companyDetails._id}`, {
                                    method: "GET",
                                    headers: {
                                      "Content-Type": "application/json",
                                      'Authorization': `Bearer ${token}`
                                    },
                                  })
                                    .then((response) => {
                                      if (!response.ok) {
                                        throw new Error(response.status);
                                      }
                                      response.blob().then((blob) => {
                                        var url = window.URL.createObjectURL(blob);
                                        var a = document.createElement("a");
                                        document.body.appendChild(a);
                                        a.style = "display: none";
                                        a.href = url;
                                        a.download = "demo.docx"; // название файла, который вы сгенерировали на бэкэнде
                                        a.click();
                                        window.URL.revokeObjectURL(url);
                                      });
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                      // здесь можно обработать ошибку
                                    });
                                });
  
  
  
                              } catch (error) {
                                console.error(error);
                              }
                            } catch (error) {
                              console.error(error);
                            }
                          });
                        });
                      } else {
                        fetch(`/find-main-part-of-contract/${companyDetails._id}`, {
                          method: 'GET',
                          headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                          }
                        })
                        .then(response => response.json())
                        .then(mainPartOfContract => {
                          console.log(mainPartOfContract);

                          fetch(`/get-status-about-approved/${mainPartOfContract._id}`, {
                            method: 'GET',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                          })
                          .then(response => {
                            if (!response.ok) {
                              throw new Error(response.status);
                            }
                            return response.json();
                          })
                          .then(checkApproveStatus => {
                            if (checkApproveStatus.isApproved) {
                              const GenerateFinalDoc = document.createElement('button');
                              GenerateFinalDoc.textContent = 'Скачать главную часть договора';
                              GenerateFinalDoc.classList.add('cabinet__main-generate-finaldoc');
                              
                              const GenerateAddOneDoc = document.createElement('button');
                              GenerateAddOneDoc.textContent = 'Перейти к созданию приложения 1';
                              GenerateAddOneDoc.classList.add('cabinet__main-generate-addonedoc');

                              GenerateFinalDoc.addEventListener("click", () => {
                                fetch(`/generate-final-doc/${companyDetails._id}`, {
                                  method: "GET",
                                  headers: {
                                    "Content-Type": "application/json",
                                    'Authorization': `Bearer ${token}`
                                  },
                                })
                                  .then((response) => {
                                    if (!response.ok) {
                                      throw new Error(response.status);
                                    }
                                    response.blob().then((blob) => {
                                      var url = window.URL.createObjectURL(blob);
                                      var a = document.createElement("a");
                                      document.body.appendChild(a);
                                      a.style = "display: none";
                                      a.href = url;
                                      a.download = "final.docx"; // название файла, который вы сгенерировали на бэкэнде
                                      a.click();
                                      window.URL.revokeObjectURL(url);
                                    });
                                  })
                                  .catch((error) => {
                                    console.error(error);
                                    // здесь можно обработать ошибку
                                  });
                              });


                              bufferBaseProfileSection.appendChild(GenerateFinalDoc);
                              const addOneDocDiv = document.createElement('div');
                              addOneDocDiv.innerText = "Приложение 1";
                              bufferBaseProfileSection.appendChild(addOneDocDiv);

                              // перенет блок не внизу всеъ приложений, а повыше (под блоком добщего договора)
                              async function fetchAttachmentOnes() {
                                try {
                                  const response = await fetch(`/get-add-ones/${mainPartOfContract._id}`, {
                                    method: 'GET',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${token}`
                                    }
                                  });
                              
                                  if (!response.ok) {
                                    throw new Error('Ошибка при получении списка приложений 1');
                                  }
                              
                                  const listAddOnes = await response.json();
                              
                                  if (listAddOnes.message) {
                                    // Если есть сообщение о том, что приложений 1 нет
                                    const addOneEmpty = document.createElement('p');
                                    addOneEmpty.textContent = 'Созданных приложений 1 нет';
                                    addOneEmpty.classList.add('cabinet__main-approve-false');
                                    bufferBaseProfileSection.appendChild(addOneEmpty);
                                  } else {
                                    const attachmentOnes = listAddOnes.attachmentOnes;
                                    console.log(attachmentOnes); // Обработка полученных приложений 1
                              
                                    // Создание flex-списка
                                    const attachmentOneList = document.createElement('ul');
                                    attachmentOneList.classList.add('cabinet__main-attachment-one-list');
                              
                                    // Обход полученных приложений 1 и создание элементов списка
                                    attachmentOnes.forEach((attachmentOne, index) => {
                                      const attachmentOneItem = document.createElement('li');
                                      attachmentOneItem.textContent = `${index + 1} Приложение 1`;
                              
                                      attachmentOneItem.addEventListener('click', async () => { 
                                        const containerAddOnesBtn = document.createElement('div');
                                        bufferBaseProfileSection.appendChild(containerAddOnesBtn);

                                        if (document.querySelector('.cabinet__main-generate-addonedoc') != null){
                                          document.querySelector('.cabinet__main-generate-addonedoc').classList.add('none');
                                        }

                                        const backToAddOnesBtn = document.createElement('button');
                                        backToAddOnesBtn.classList.add('cabinet__main-generate-finaldoc');
                                        backToAddOnesBtn.textContent = 'Вернуться к созданным приложениям 1';
                                        containerAddOnesBtn.appendChild(backToAddOnesBtn);

                                        backToAddOnesBtn.addEventListener('click', (event) => {
                                          containerAddOnesBtn.remove();   
                                          const paragraphs = bufferBaseProfileSection.querySelectorAll('p');
                                          document.querySelector('.cabinet__main-generate-addonedoc').classList.remove('none');
                                          paragraphs.forEach((paragraph) => {
                                            paragraph.remove();
                                          });
                                          fetchAttachmentOnes();
                                        });
                                        attachmentOneList.remove();

                                        async function handleAddOneApproval() {
                                          try {
                                            const checkAddOneApproved = await sendRequest(`/get-add-one-contract-approved/${attachmentOne._id}`, 'GET', null, token);

                                            if (checkAddOneApproved.isApproved) { 
                                              const GenerateFinalAddOneDoc = document.createElement('button');
                                              GenerateFinalAddOneDoc.textContent = 'Скачать финальную версию приложения 1';
                                              GenerateFinalAddOneDoc.classList.add('cabinet__main-generate-finaldoc');
                                              GenerateFinalAddOneDoc.addEventListener("click", async () => {
                                                try {
                                                  const createFinalDocumentAddOne = await sendRequest(`http://localhost:5555/generate-add-one-doc/${attachmentOne._id}`, 'GET', null, token, true);
                                              
                                                  if (createFinalDocumentAddOne.ok) {
                                                    createFinalDocumentAddOne.blob().then((blob) => {
                                                      var url = window.URL.createObjectURL(blob);
                                                      var a = document.createElement("a");
                                                      document.body.appendChild(a);
                                                      a.style = "display: none";
                                                      a.href = url;
                                                      a.download = "finaladdone.docx";
                                                      a.click();
                                                      window.URL.revokeObjectURL(url);
                                                    });
                                                  } else {
                                                    const errorData = await response.json();
                                                    console.log(errorData);
                                                  }
                                                } catch (error) {
                                                  console.log(error);
                                                  // Обработка ошибки при выполнении запроса
                                                }
                                              });

                                              const addTwoDocLabel = document.createElement('div');
                                              addTwoDocLabel.innerText = "Приложение 2";
                                              containerAddOnesBtn.appendChild(GenerateFinalAddOneDoc);
                                              containerAddOnesBtn.appendChild(addTwoDocLabel);

                                              const addTwoCreatedFunc = async () => {
                                                try {
                                                  const checkAddTwoCreated = await sendRequest(`/get-add-two/${attachmentOne._id}`, 'GET', null, token);
                                                  if (checkAddTwoCreated.exists) {
                                                    async function checkApprovalStatusRecursive(){
                                                      console.log('asd');
                                                      try {
                                                        const checkAddTwoApproved = await sendRequest(`/get-add-two-contract-approved/${attachmentOne._id}`, 'GET', null, token);
                                                        if (checkAddTwoApproved.isApproved) {
                                                          const GenerateFinalAddTwoDoc = document.createElement('button');
                                                          GenerateFinalAddTwoDoc.textContent = 'Скачать финальную версию приложения 2';
                                                          GenerateFinalAddTwoDoc.classList.add('cabinet__main-generate-finaldoc');
                                  
                                                          GenerateFinalAddTwoDoc.addEventListener("click", async () => {
                                                            try {
                                                              const createFinalDocumentAddOne = await sendRequest(`/generate-add-two-doc/${attachmentOne._id}`, 'GET', null, token, true);
                                                          
                                                              if (createFinalDocumentAddOne.ok) {
                                                                createFinalDocumentAddOne.blob().then((blob) => {
                                                                  var url = window.URL.createObjectURL(blob);
                                                                  var a = document.createElement("a");
                                                                  document.body.appendChild(a);
                                                                  a.style = "display: none";
                                                                  a.href = url;
                                                                  a.download = "finaladdtwo.docx";
                                                                  a.click();
                                                                  window.URL.revokeObjectURL(url);
                                                                });
                                                              } else {
                                                                const errorData = await response.json();
                                                                console.log(errorData);
                                                              }
                                                            } catch (error) {
                                                              console.log(error);
                                                              // Обработка ошибки при выполнении запроса
                                                            }
                                                          });
                                  
                                                          containerAddOnesBtn.appendChild(GenerateFinalAddTwoDoc); 
                                                        } else {
                                                          try {
                                                            const universityApprovedAddTwo = await sendRequest(`/check-add-two-contract-uni-approved/${attachmentOne._id}`, 'GET', null, token);

                                                            if (universityApprovedAddTwo) {
                                                              const GenerateAddTwoDoc = document.createElement('button');
                                                              GenerateAddTwoDoc.textContent = 'Скачать демо-версию приложения 2';
                                                              GenerateAddTwoDoc.classList.add('cabinet__main-generate-finaldoc');
                                                              bufferBaseProfileSection.appendChild(GenerateAddTwoDoc);
                                                              GenerateAddTwoDoc.addEventListener("click", async () => {
                                                                try {
                                                                  const createDemoDocumentAddTwo = await sendRequest(`http://localhost:5555/generate-demo-add-two-doc/${attachmentOne._id}`, 'GET', null, token, true);
                                                        
                                                                  if (createDemoDocumentAddTwo.ok) {
                                                                    createDemoDocumentAddTwo.blob().then((blob) => {
                                                                      var url = window.URL.createObjectURL(blob);
                                                                      var a = document.createElement("a");
                                                                      document.body.appendChild(a);
                                                                      a.style = "display: none";
                                                                      a.href = url;
                                                                      a.download = "demoaddtwo.docx";
                                                                      a.click();
                                                                      window.URL.revokeObjectURL(url);
                                                                    });
                                                                  } else {
                                                                    const errorData = await createDemoDocumentAddTwo.json();
                                                                    console.log(errorData);
                                                                    // Обработка ошибки при выполнении запроса
                                                                  }
                                                                } catch (error) {
                                                                  console.log(error);
                                                                  // Обработка ошибки при выполнении запроса
                                                                }
                                                              });


                                                              const addTwoEmpty = document.createElement('p');
                                                              addTwoEmpty.textContent = 'Предприятие ещё не подтвердило согласование';
                                                              addTwoEmpty.classList.add('cabinet__main-approve-false');
                                                              bufferBaseProfileSection.appendChild(addTwoEmpty);
                                                            } else {
                                                              const GenerateAddTwoDoc = document.createElement('button');
                                                              GenerateAddTwoDoc.textContent = 'Скачать демо-версию приложения 2';
                                                              GenerateAddTwoDoc.classList.add('cabinet__main-generate-finaldoc');

                                                              GenerateAddTwoDoc.addEventListener("click", async () => {
                                                                try {
                                                                  const createDemoDocumentAddTwo = await sendRequest(`http://localhost:5555/generate-demo-add-two-doc/${attachmentOne._id}`, 'GET', null, token, true);
                                                        
                                                                  if (createDemoDocumentAddTwo.ok) {
                                                                    createDemoDocumentAddTwo.blob().then((blob) => {
                                                                      var url = window.URL.createObjectURL(blob);
                                                                      var a = document.createElement("a");
                                                                      document.body.appendChild(a);
                                                                      a.style = "display: none";
                                                                      a.href = url;
                                                                      a.download = "demoaddtwo.docx";
                                                                      a.click();
                                                                      window.URL.revokeObjectURL(url);
                                                                    });
                                                                  } else {
                                                                    const errorData = await createDemoDocumentAddTwo.json();
                                                                    console.log(errorData);
                                                                    // Обработка ошибки при выполнении запроса
                                                                  }
                                                                } catch (error) {
                                                                  console.log(error);
                                                                  // Обработка ошибки при выполнении запроса
                                                                }
                                                              });

                                                              const approveDocAddTwoBtn = document.createElement('button');
                                                              approveDocAddTwoBtn.textContent = 'Согласовать документ';
                                                              approveDocAddTwoBtn.classList.add('cabinet__main-approve-doc');

                                                              approveDocAddTwoBtn.addEventListener("click", async () => {
                                                                try {
                                                                  GenerateAddTwoDoc.remove();
                                                                  approveDocAddTwoBtn.remove();
                                                                  const updateUniveristyApprovedAddTwo = await sendRequest(`/update-add-two-contract-uni-approved/${attachmentOne._id}`, 'POST', null, token);
                                                                  
                                                                  checkApprovalStatusRecursive();
                                                                } catch (error) {
                                                                  console.error('Ошибка при выполнении запроса:', error);
                                                                  // Обработка ошибки при выполнении запроса
                                                                }
                                                              });
                                                              containerAddOnesBtn.appendChild(GenerateAddTwoDoc);
                                                              containerAddOnesBtn.appendChild(approveDocAddTwoBtn);
                                                            }
                                                          } catch (error) {
                                                            console.error('Ошибка при выполнении запроса:', error);
                                                          }
                                                        }
                                                      } catch (error) {
                                                        console.error('Ошибка при выполнении запроса:', error);
                                                        // Обработка ошибки при выполнении запроса
                                                      }  
                                                    
                                                    }

                                                    checkApprovalStatusRecursive();
                                                  } else {
                                                    const errorMessage = document.createElement('p');
                                                    errorMessage.textContent = 'Предприятие ещё не инициировало генерацию документа';
                                                    bufferBaseProfileSection.appendChild(errorMessage);
                                                  }
                                                } catch (error) {
                                                  console.error('Ошибка при выполнении запроса:', error);
                                                }
                                              };

                                              await addTwoCreatedFunc();

                                            } else {
                                              try { 
                                                const checkUniversityApproved = await sendRequest(`/get-add-one-contract-uni-approved/${attachmentOne._id}`, 'GET', null, token);

                                                if (checkUniversityApproved) {
                                                  const GenerateAddOneDoc = document.createElement('button');
                                                  GenerateAddOneDoc.textContent = 'Скачать демо-версию приложение 1';
                                                  GenerateAddOneDoc.classList.add('cabinet__main-generate-finaldoc');
                                                  bufferBaseProfileSection.appendChild(GenerateAddOneDoc);
                                                  GenerateAddOneDoc.addEventListener("click", async () => {
                                                    try {
                                                      const createDemoDocumentAddOne = await sendRequest(`http://localhost:5555/generate-demo-add-one-doc/${attachmentOne._id}`, 'GET', null, token, true);
                                        
                                                      if (createDemoDocumentAddOne.ok) {
                                                        createDemoDocumentAddOne.blob().then((blob) => {
                                                          var url = window.URL.createObjectURL(blob);
                                                          var a = document.createElement("a");
                                                          document.body.appendChild(a);
                                                          a.style = "display: none";
                                                          a.href = url;
                                                          a.download = "demoaddone.docx";
                                                          a.click();
                                                          window.URL.revokeObjectURL(url);
                                                        });
                                                      } else {
                                                        const errorData = await response.json();
                                                        console.log(errorData);
                                                      }
                                                    } catch (error) {
                                                      console.log(error);
                                                    }
                                                  });

                                                  const addOneEmpty = document.createElement('p');
                                                  addOneEmpty.textContent = 'Предприятие ещё не подтвердило согласование';
                                                  addOneEmpty.classList.add('cabinet__main-approve-false');
                                                  bufferBaseProfileSection.appendChild(addOneEmpty);
                                                } else {
                                                  const GenerateAddOneDoc = document.createElement('button');
                                                  GenerateAddOneDoc.textContent = 'Скачать демо-версию приложение 1';
                                                  GenerateAddOneDoc.classList.add('cabinet__main-generate-finaldoc');
                                                  containerAddOnesBtn.appendChild(GenerateAddOneDoc);

                                                  GenerateAddOneDoc.addEventListener("click", async () => {
                                                    try {
                                                      const createDemoDocumentAddOne = await sendRequest(`http://localhost:5555/generate-demo-add-one-doc/${attachmentOne._id}`, 'GET', null, token, true);
                                        
                                                      if (createDemoDocumentAddOne.ok) {
                                                        createDemoDocumentAddOne.blob().then((blob) => {
                                                          var url = window.URL.createObjectURL(blob);
                                                          var a = document.createElement("a");
                                                          document.body.appendChild(a);
                                                          a.style = "display: none";
                                                          a.href = url;
                                                          a.download = "demoaddone.docx";
                                                          a.click();
                                                          window.URL.revokeObjectURL(url);
                                                        });
                                                      } else {
                                                        const errorData = await response.json();
                                                        console.log(errorData);
                                                      }
                                                    } catch (error) {
                                                      console.log(error);
                                                    }
                                                  });
                                                  
                                                  const editDataAddOneBtn = document.createElement('button');
                                                  editDataAddOneBtn.textContent = 'Редактировать данные приложения 1';
                                                  editDataAddOneBtn.classList.add('cabinet__main-edit-data');
                                                  containerAddOnesBtn.appendChild(editDataAddOneBtn);

                                                  editDataAddOneBtn.addEventListener('click', async function () {
                                                    try {
                                                      const attachmentOneData = await sendRequest(`/get-add-one-contract-data/${attachmentOne._id}`, 'GET', null, token);
                                                      editDataAddOneBtn.classList.add('none');

                                                      var editFormAddOneContract = document.createElement('form');
                                                      editFormAddOneContract.classList.add('cabinet__main-edit__addoneform')
                                                
                                                      // Направление подготовки
                                                      var trainingDirectionLabel = document.createElement('label');
                                                      trainingDirectionLabel.textContent = 'Направление подготовки:';
                                                      var trainingDirectionInput = document.createElement('input');
                                                      trainingDirectionInput.type = 'text';
                                                      trainingDirectionInput.name = 'trainingDirection';
                                                      editFormAddOneContract.appendChild(trainingDirectionLabel);
                                                      trainingDirectionLabel.appendChild(trainingDirectionInput);
                                                      
                                                      // Шифр
                                                      var cipherLabel = document.createElement('label');
                                                      cipherLabel.textContent = 'Шифр:';
                                                      var cipherInput = document.createElement('input');
                                                      cipherInput.type = 'text';
                                                      cipherInput.name = 'cipher';
                                                      editFormAddOneContract.appendChild(cipherLabel);
                                                      cipherLabel.appendChild(cipherInput);
                                                      
                                                      // Название основной образовательной программы
                                                      var mainProgramNameLabel = document.createElement('label');
                                                      mainProgramNameLabel.textContent = 'Название основной образовательной программы:';
                                                      var mainProgramNameInput = document.createElement('input');
                                                      mainProgramNameInput.type = 'text';
                                                      mainProgramNameInput.name = 'mainProgramName';
                                                      editFormAddOneContract.appendChild(mainProgramNameLabel);
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
                                                      editFormAddOneContract.appendChild(practiceTypeLabel);
                                                      practiceTypeLabel.appendChild(practiceTypeSelect);
                                                      
                                                
                                                      for (var i = 0; i < attachmentOneData.count; i++) {
                                                        var fullNameLabel = document.createElement('label');
                                                        fullNameLabel.textContent = 'ФИО студента ' + (i + 1) + ' студента:';
                                                        var fullNameInput = document.createElement('input');
                                                        fullNameInput.type = 'text';
                                                        fullNameInput.name = 'fullName_' + i;
                                                        editFormAddOneContract.appendChild(fullNameLabel);
                                                        fullNameLabel.appendChild(fullNameInput);
                                                      
                                                        // Код программы
                                                        var programCodeLabel = document.createElement('label');
                                                        programCodeLabel.textContent = 'Код программы ' + (i + 1) + ' студента:';
                                                        var programCodeInput = document.createElement('input');
                                                        programCodeInput.type = 'text';
                                                        programCodeInput.name = 'programCode_' + i;
                                                        editFormAddOneContract.appendChild(programCodeLabel);
                                                        programCodeLabel.appendChild(programCodeInput);
                                                      
                                                        // Курс
                                                        var courseLabel = document.createElement('label');
                                                        courseLabel.textContent = 'Курс ' + (i + 1) + ' студента:';
                                                        var courseInput = document.createElement('input');
                                                        courseInput.type = 'number';
                                                        courseInput.name = 'course_' + i;
                                                        editFormAddOneContract.appendChild(courseLabel);
                                                        courseLabel.appendChild(courseInput);
                                                      
                                                        // Группа
                                                        var groupLabel = document.createElement('label');
                                                        groupLabel.textContent = 'Группа ' + (i + 1) + ' студента:';
                                                        var groupInput = document.createElement('input');
                                                        groupInput.type = 'text';
                                                        groupInput.name = 'group_' + i;
                                                        editFormAddOneContract.appendChild(groupLabel);
                                                        groupLabel.appendChild(groupInput);
                                                      
                                                        // Даты практики
                                                        var practiceDatesLabel = document.createElement('label');
                                                        practiceDatesLabel.textContent = 'Даты практики ' + (i + 1) + ' студента:';
                                                        var practiceDatesInput = document.createElement('input');
                                                        practiceDatesInput.type = 'text';
                                                        practiceDatesInput.name = 'practiceDates_' + i;
                                                        editFormAddOneContract.appendChild(practiceDatesLabel);
                                                        practiceDatesLabel.appendChild(practiceDatesInput);

                                                        fullNameInput.value = attachmentOneData.studentsData[i].fullName;
                                                        programCodeInput.value = attachmentOneData.studentsData[i].programCode;
                                                        courseInput.value = attachmentOneData.studentsData[i].course;
                                                        groupInput.value = attachmentOneData.studentsData[i].group;
                                                        practiceDatesInput.value = attachmentOneData.studentsData[i].practiceDates;
                                                      }
                                                
                                                
                                                      // ФИО руководителя практики от кафедры
                                                      var practiceSupervisorLabel = document.createElement('label');
                                                      practiceSupervisorLabel.textContent = 'ФИО руководителя практики от кафедры:';
                                                      var practiceSupervisorInput = document.createElement('input');
                                                      practiceSupervisorInput.type = 'text';
                                                      practiceSupervisorInput.name = 'practiceSupervisor';
                                                      editFormAddOneContract.appendChild(practiceSupervisorLabel);
                                                      practiceSupervisorLabel.appendChild(practiceSupervisorInput);
                                                      
                                                      // Кнопка отправки формы
                                                      var submitButton = document.createElement('button');
                                                      submitButton.type = 'submit';
                                                      submitButton.textContent = 'Отправить';
                                                      editFormAddOneContract.appendChild(submitButton);

                                                      const closeButton = document.createElement('button');
                                                      closeButton.textContent = 'Закрыть';
                                                      closeButton.addEventListener('click', function(){
                                                        editFormAddOneContract.remove();
                                                        editDataAddOneBtn.classList.remove('none');
                                                      })
                                                      editFormAddOneContract.appendChild(closeButton);

                                                      trainingDirectionInput.value = attachmentOneData.attachmentOne.trainingDirection;
                                                      cipherInput.value = attachmentOneData.attachmentOne.cipher;
                                                      mainProgramNameInput.value = attachmentOneData.attachmentOne.mainProgramName;
                                                      practiceTypeSelect.value = attachmentOneData.attachmentOne.practiceType;
                                                      practiceSupervisorInput.value = attachmentOneData.attachmentOne.practiceSupervisor;

                                                      editFormAddOneContract.addEventListener("submit", function (event) { 
                                                        event.preventDefault();
                    
                                                        var studentsData = [];
                          
                                                        // Получаем значения полей формы, относящихся к остальным данным
                                                        var trainingDirection = document.querySelector('input[name="trainingDirection"]').value;
                                                        var cipher = document.querySelector('input[name="cipher"]').value;
                                                        var mainProgramName = document.querySelector('input[name="mainProgramName"]').value;
                                                        var practiceType = document.querySelector('select[name="practiceType"]').value;
                                                        var practiceSupervisor = document.querySelector('input[name="practiceSupervisor"]').value;
                                                      
                                                        // Обходим каждую форму студента
                                                        for (var i = 0; i < attachmentOneData.count; i++) {
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
                    
                                                        async function sendFormData(studentsData, otherFormData) { 
                                                          try {
                                                            const createAddOneContractResponse = await sendRequest(`http://localhost:5555/edit-add-one-contract-data/${attachmentOne._id}`, 'POST', {
                                                              studentsData: studentsData,
                                                              otherFormData: otherFormData
                                                            }, token, true);
                                                            if (createAddOneContractResponse) {
                                                              
                                                            }
                                                          } catch (error) {
                                                            console.error('Ошибка при выполнении запроса:', error);
                                                            // Обработка ошибки при выполнении запроса
                                                          }
                                                        } 
                                                        editFormAddOneContract.remove();
                                                        editDataAddOneBtn.classList.remove('none');
                                                        sendFormData(studentsData, otherFormData);
                                                      });
                    
                                                      bufferBaseProfileSection.appendChild(editFormAddOneContract);
                                                  
                                                    } catch (error) {
                                                      console.error('Ошибка при выполнении запроса:', error);
                                                      // Обработка ошибки при выполнении запроса
                                                    }
                                                  });

                                                  const approveDocAddOneBtn = document.createElement('button');
                                                  approveDocAddOneBtn.textContent = 'Согласовать документ';
                                                  approveDocAddOneBtn.classList.add('cabinet__main-approve-doc');
                                                  containerAddOnesBtn.appendChild(approveDocAddOneBtn);

                                                  approveDocAddOneBtn.addEventListener("click", async () => {
                                                    try {
                                                      const updateAddOneCompApproved = await sendRequest(`/update-add-one-contract-uni-approved/${attachmentOne._id}`, 'POST', null, token);
                                                      approveDocAddOneBtn.remove();
                                                      if (document.querySelector('.cabinet__main-edit__addoneform') != null){
                                                        document.querySelector('.cabinet__main-edit__addoneform').remove();
                                                      }
                                                      editDataAddOneBtn.remove();
                                                      GenerateAddOneDoc.remove();
                                                      
                                                      handleAddOneApproval(); 
                                                    } catch (error) {
                                                      console.log(error);
                                                    }
                                                  })

                                                }
                                              } catch (error) {
                                                console.error('Ошибка при выполнении запроса:', error);
                                              }
                                            }
                                          } catch (error) {
                                            console.error('Ошибка при выполнении запроса:', error);
                                          }
                                        };

                                        handleAddOneApproval();
                                      });

                                      // Добавление элемента списка в общий список
                                      attachmentOneList.appendChild(attachmentOneItem);
                                    });
                              
                                    // Добавление списка приложений 1 в контейнер
                                    bufferBaseProfileSection.appendChild(attachmentOneList);
                                  }
                                } catch (error) {
                                  console.log(error);
                                  // Обработка ошибки при выполнении запроса
                                }
                              }
                              
                              // Вызов асинхронной функции      
                              fetchAttachmentOnes();
                              GenerateAddOneDoc.addEventListener("click", () => { // СОЗДАНИЕ ПРИЛОЖЕНИЯ 1
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
                                  formAddOneContract.appendChild(submitButton);

                                  formAddOneContract.addEventListener("submit", function (event) { 
                                    event.preventDefault();


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

                                    async function sendFormData(studentsData, otherFormData) { 
                                      try {
                                        const createAddOneContractResponse = await sendRequest(`http://localhost:5555/create-add-one-contract/${companyDetails._id}`, 'POST', {
                                          studentsData: studentsData,
                                          otherFormData: otherFormData
                                        }, token, true);
                                        if (createAddOneContractResponse) {
                                          // Выполнение функции fetchAttachmentOnes
                                          GenerateAddOneDoc.classList.remove('none');
                                          await fetchAttachmentOnes();
                                        }
                                      } catch (error) {
                                        console.error('Ошибка при выполнении запроса:', error);
                                        // Обработка ошибки при выполнении запроса
                                      }
                                    }

                                    formAddOneContract.remove();
                                    sendFormData(studentsData, otherFormData);
                                  });

                                  bufferBaseProfileSection.appendChild(formAddOneContract);
                                });
                              })
                              bufferBaseProfileSection.appendChild(GenerateAddOneDoc);
                        
                            } else {

                              fetch(`/get-uni-approve-in-main-contract/${mainPartOfContract._id}`, {
                                method: 'GET',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                                },
                              })
                              .then((response) => {
                                if (!response.ok) {
                                  throw new Error('Ошибка запроса');
                                }
                                return response.json();
                              })
                              .then((checkUniversityApproval) => {
                                if (!checkUniversityApproval.universityApproved){
                                  const CreateDemoDocBtn = document.createElement('button');
                                  CreateDemoDocBtn.textContent = 'Скачать пробный документ';
                                  CreateDemoDocBtn.classList.add('cabinet__main-generate-doc');
                                  bufferBaseProfileSection.appendChild(CreateDemoDocBtn);
          
                                  const editDataBtn = document.createElement('button');
                                  editDataBtn.textContent = 'Редактировать данные';
                                  editDataBtn.classList.add('cabinet__main-edit-data');
                                  bufferBaseProfileSection.appendChild(editDataBtn);
          
                                  editDataBtn.addEventListener('click', async function(){
                                    const editDataAndNumberOfContract = document.createElement('form');
                                    editDataAndNumberOfContract.classList.add('cabinet__main-edit-datanumber_form');
        
                                    const contractNumber = document.createElement('div');
                                    const contractNumberLabel = document.createElement('label');
                                    contractNumberLabel.setAttribute('for', 'contractNumber');
                                    contractNumberLabel.innerText = 'Номер контракта: ';
                                    const contractNumberInput = document.createElement('input');
                                    contractNumberInput.setAttribute('type', 'text');
                                    contractNumberInput.setAttribute('id', 'contractNumber');
                                    contractNumberInput.setAttribute('name', 'contractNumber');
                                    contractNumberInput.setAttribute('required', true);
                                    contractNumber.appendChild(contractNumberLabel);
                                    contractNumber.appendChild(contractNumberInput);
                                    
                                    const contractDate = document.createElement('div');
                                    const contractDateLabel = document.createElement('label');
                                    contractDateLabel.setAttribute('for', 'contractDate');
                                    contractDateLabel.innerText = 'Дата контракта: ';
                                    const contractDateInput = document.createElement('input');
                                    contractDateInput.setAttribute('type', 'text');
                                    contractDateInput.setAttribute('id', 'contractDate');
                                    contractDateInput.setAttribute('name', 'contractDate');
                                    contractDateInput.setAttribute('required', true);
                                    contractDate.appendChild(contractDateLabel);
                                    contractDate.appendChild(contractDateInput);
          
                                    const month = document.createElement('div');
                                    const monthLabel = document.createElement('label');
                                    monthLabel.setAttribute('for', 'contractMonth');
                                    monthLabel.innerText = 'Месяц: ';
                                    const monthInput = document.createElement('input');
                                    monthInput.setAttribute('type', 'text');
                                    monthInput.setAttribute('id', 'contractMonth');
                                    monthInput.setAttribute('name', 'contractMonth');
                                    monthInput.setAttribute('required', true);
                                    month.appendChild(monthLabel);
                                    month.appendChild(monthInput);
                                    
                                    const year = document.createElement('div');
                                    const yearLabel = document.createElement('label');
                                    yearLabel.setAttribute('for', 'contractYear');
                                    yearLabel.innerText = 'Год: ';
                                    const yearInput = document.createElement('input');
                                    yearInput.setAttribute('type', 'number');
                                    yearInput.setAttribute('id', 'contractYear');
                                    yearInput.setAttribute('name', 'contractYear');
                                    yearInput.setAttribute('required', true);
                                    year.appendChild(yearLabel);
                                    year.appendChild(yearInput);
          
                                    const submitButton = document.createElement('button');
                                    submitButton.type = 'submit';
                                    submitButton.textContent = 'Отправить';
          
                                    editDataAndNumberOfContract.appendChild(contractNumber);
                                    editDataAndNumberOfContract.appendChild(contractDate);
                                    editDataAndNumberOfContract.appendChild(month);
                                    editDataAndNumberOfContract.appendChild(year);
                                    editDataAndNumberOfContract.appendChild(submitButton);
        
                                    try {
                                      const response = await fetch(`/get-data-and-number-of-contract/${mainPartOfContract.DateAndNumber}`, {
                                        method: 'GET',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': `Bearer ${token}`
                                        }
                                      });
                                      const dateAndNumberOfContractFromBD = await response.json();
                                      const dataAndNumberInputs = editDataAndNumberOfContract.querySelectorAll('input');
                                      for (let i = 0; i < dataAndNumberInputs.length; i++) {
                                        const inputDataAndNumberName = dataAndNumberInputs[i].getAttribute('name');
                                        if (inputDataAndNumberName in dateAndNumberOfContractFromBD) {
                                          dataAndNumberInputs[i].value = dateAndNumberOfContractFromBD[inputDataAndNumberName];
                                        }
                                      }
                                    } catch (error) {
                                      console.error(error);
                                    }
          
          
          
                                    const universityForm = document.createElement('form');
                                    universityForm.classList.add('cabinet__main-edit-uni_form');
                                    const editUniversityForm = editProfileSection.querySelector('.edit-university__form');
                                      
                                    const formElements = editUniversityForm.cloneNode(true);
                                    const fileInputs = formElements.querySelectorAll('.edit-university__label-file');
                                    fileInputs.forEach(input => input.remove());
                                      
                                    universityForm.innerHTML = formElements.innerHTML;
                                  
                                    try {
                                      const response = await fetch('/get-data-of-university', {
                                        method: 'GET',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': `Bearer ${token}`
                                        }
                                      });
                                      const data = await response.json();
                                      const universityInputs = universityForm.querySelectorAll('.edit-university__input-text');
                                      for (let i = 0; i < universityInputs.length; i++) {
                                        const inputName = universityInputs[i].getAttribute('name');
                                        if (inputName in data) {
                                          universityInputs[i].value = data[inputName];
                                        }
                                      }
                                    } catch (error) {
                                      console.error(error);
                                    }
                                  
                                    const containerWithEditUniForms = document.createElement('div');
                                    containerWithEditUniForms.appendChild(editDataAndNumberOfContract);
                                    containerWithEditUniForms.appendChild(universityForm);
                                    containerWithEditUniForms.classList.add('cabinet__main-container-edituni');
          
                                    editDataBtn.style.display = 'none';
          
                                    const closeEditBtn = document.createElement('button');
                                    closeEditBtn.textContent = 'Закрыть редактирование';
                                    closeEditBtn.classList.add('cabinet__main-edit-data');
                                    containerWithEditUniForms.appendChild(closeEditBtn);
                                    
                                    closeEditBtn.addEventListener('click', () => {
                                      editDataBtn.style.display = 'block';
                                      containerWithEditUniForms.remove();
                                    });
          
                                    bufferBaseProfileSection.appendChild(containerWithEditUniForms);
          
                                    editDataAndNumberOfContract.addEventListener('submit', async (event) => {
                                      event.preventDefault();
                                    
                                      const formData = new FormData(event.target);
                                      const data = Object.fromEntries(formData.entries());
                                    
                                      try {
                                        const response = await fetch(`/update-date-and-number-of-contract/${mainPartOfContract.DateAndNumber}`, {
                                          method: 'PUT',
                                          headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                          },
                                          body: JSON.stringify(data),
                                        });
                                    
                                        const updatedData = await response.json();
                                        console.log(updatedData);
                                      } catch (error) {
                                        console.error(error);
                                      }
                                    });
          
                                    universityForm.addEventListener('submit', async (event) => {
                                      event.preventDefault();
                                    
                                      const formData = new FormData(event.target);
                                      const data = Object.fromEntries(formData.entries());
                                    
                                      try {
                                        const response = await fetch(`/update-data-of-university`, {
                                          method: 'PUT',
                                          headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                          },
                                          body: JSON.stringify(data),
                                        });
                                    
                                        const updatedData = await response.json();
                                        console.log(updatedData);
                                      } catch (error) {
                                        console.error(error);
                                      }
                                    });
                                  });
        
                                  // Кнопка "Согласовать документ"
                                  const approveDocBtn = document.createElement('button');
                                  approveDocBtn.textContent = 'Согласовать документ';
                                  approveDocBtn.classList.add('cabinet__main-approve-doc');
                                  bufferBaseProfileSection.appendChild(approveDocBtn);
        
                                  approveDocBtn.addEventListener("click", () => {
                                    console.log('asdasd');
                                    fetch(`/update-uni-approve-in-main-contract/${mainPartOfContract._id}`, {
                                      method: "PUT",
                                      headers: {
                                        "Content-Type": "application/json",
                                        'Authorization': `Bearer ${token}`
                                      },
                                    })
                                    .then((response) => {
                                      if (!response.ok) {
                                        throw new Error(response.status);
                                      }
                                      return response.json();
                                    })
                                    .then((uniApprovedStatusTrue) => {
                                      console.log(`Статус согласования на university: ${uniApprovedStatusTrue.universityApproved}`);
                                      
                                      approveDocBtn.remove();
                                      document.querySelector('.cabinet__main-generate-doc').remove();
                                      editDataBtn.remove();
        
                                      fetch(`/get-status-about-approved/${mainPartOfContract._id}`, {
                                        method: 'GET',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': `Bearer ${token}`
                                        },
                                      })
                                        .then(response => {
                                          if (!response.ok) {
                                            throw new Error(response.status);
                                          }
                                          return response.json();
                                        })
                                        .then(checkApproveStatus => {
                                          if (checkApproveStatus.isApproved) {
                                            const GenerateFinalDoc = document.createElement('button');
                                            GenerateFinalDoc.textContent = 'Скачать главную часть договора';
                                            GenerateFinalDoc.classList.add('cabinet__main-generate-finaldoc');

                                            // перенести обработчик сюда

                                            // проверить наличие логттипа "приложение 1"
                                            const GenerateAddOneDoc = document.createElement('button');
                                            GenerateAddOneDoc.textContent = 'Перейти к созданию приложения 1';
                                            GenerateAddOneDoc.classList.add('cabinet__main-generate-addonedoc');
        
                                            GenerateFinalDoc.addEventListener("click", () => {
                                              fetch(`/generate-final-doc/${companyDetails._id}`, {
                                                method: "GET",
                                                headers: {
                                                  "Content-Type": "application/json",
                                                  'Authorization': `Bearer ${token}`
                                                },
                                              })
                                                .then((response) => {
                                                  if (!response.ok) {
                                                    throw new Error(response.status);
                                                  }
                                                  response.blob().then((blob) => {
                                                    var url = window.URL.createObjectURL(blob);
                                                    var a = document.createElement("a");
                                                    document.body.appendChild(a);
                                                    a.style = "display: none";
                                                    a.href = url;
                                                    a.download = "final.docx"; // название файла, который вы сгенерировали на бэкэнде
                                                    a.click();
                                                    window.URL.revokeObjectURL(url);
                                                  });
                                                })
                                                .catch((error) => {
                                                  console.error(error);
                                                  // здесь можно обработать ошибку
                                                });
                                            });
        
                                            bufferBaseProfileSection.appendChild(GenerateFinalDoc);
                                            const addOneDocDiv = document.createElement('div');
                                            addOneDocDiv.innerText = "Приложение 1";
                                            bufferBaseProfileSection.appendChild(addOneDocDiv);
                                            bufferBaseProfileSection.appendChild(GenerateAddOneDoc);
                                          } else {
                                            const CreateDemoDocBtn = document.createElement('button');
                                            CreateDemoDocBtn.textContent = 'Скачать пробный документ';
                                            CreateDemoDocBtn.classList.add('cabinet__main-generate-doc');
                                            bufferBaseProfileSection.appendChild(CreateDemoDocBtn);
                                            document.querySelector('.cabinet__main-generate-doc').addEventListener("click", () => {
                                              fetch(`/generate-demo-doc/${companyDetails._id}`, {
                                                method: "GET",
                                                headers: {
                                                  "Content-Type": "application/json",
                                                  'Authorization': `Bearer ${token}`
                                                },
                                              })
                                                .then((response) => {
                                                  if (!response.ok) {
                                                    throw new Error(response.status);
                                                  }
                                                  response.blob().then((blob) => {
                                                    var url = window.URL.createObjectURL(blob);
                                                    var a = document.createElement("a");
                                                    document.body.appendChild(a);
                                                    a.style = "display: none";
                                                    a.href = url;
                                                    a.download = "demo.docx"; // название файла, который вы сгенерировали на бэкэнде
                                                    a.click();
                                                    window.URL.revokeObjectURL(url);
                                                  });
                                                })
                                                .catch((error) => {
                                                  console.error(error);
                                                  // здесь можно обработать ошибку
                                                });
                                            });
                                            
                                            const approveStatusFalse = document.createElement('p');
                                            approveStatusFalse.textContent = 'Компания не подтвердила согласование';
                                            approveStatusFalse.classList.add('cabinet__main-approve-false');
                                            bufferBaseProfileSection.appendChild(approveStatusFalse);
                                          }
                                        })
                                        .catch(error => {
                                          console.error(error);
                                          // обработать ошибку
                                        });
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                      // здесь можно обработать ошибку
                                    });
                                  });
        
                                  document.querySelector('.cabinet__main-generate-doc').addEventListener("click", () => {
                                    fetch(`/generate-demo-doc/${companyDetails._id}`, {
                                      method: "GET",
                                      headers: {
                                        "Content-Type": "application/json",
                                        'Authorization': `Bearer ${token}`
                                      },
                                    })
                                      .then((response) => {
                                        if (!response.ok) {
                                          throw new Error(response.status);
                                        }
                                        response.blob().then((blob) => {
                                          var url = window.URL.createObjectURL(blob);
                                          var a = document.createElement("a");
                                          document.body.appendChild(a);
                                          a.style = "display: none";
                                          a.href = url;
                                          a.download = "demo.docx"; // название файла, который вы сгенерировали на бэкэнде
                                          a.click();
                                          window.URL.revokeObjectURL(url);
                                        });
                                      })
                                      .catch((error) => {
                                        console.error(error);
                                        // здесь можно обработать ошибку
                                      });
                                  });
                                } else{
                                  const CreateDemoDocBtn = document.createElement('button');
                                  CreateDemoDocBtn.textContent = 'Скачать пробный документ';
                                  CreateDemoDocBtn.classList.add('cabinet__main-generate-doc');
                                  bufferBaseProfileSection.appendChild(CreateDemoDocBtn);
                                  document.querySelector('.cabinet__main-generate-doc').addEventListener("click", () => {
                                    fetch(`/generate-demo-doc/${companyDetails._id}`, {
                                      method: "GET",
                                      headers: {
                                        "Content-Type": "application/json",
                                        'Authorization': `Bearer ${token}`
                                      },
                                    })
                                      .then((response) => {
                                        if (!response.ok) {
                                          throw new Error(response.status);
                                        }
                                        response.blob().then((blob) => {
                                          var url = window.URL.createObjectURL(blob);
                                          var a = document.createElement("a");
                                          document.body.appendChild(a);
                                          a.style = "display: none";
                                          a.href = url;
                                          a.download = "demo.docx"; // название файла, который вы сгенерировали на бэкэнде
                                          a.click();
                                          window.URL.revokeObjectURL(url);
                                        });
                                      })
                                      .catch((error) => {
                                        console.error(error);
                                        // здесь можно обработать ошибку
                                      });
                                  });
                                  

                                  const approveStatusFalse = document.createElement('p');
                                  approveStatusFalse.textContent = 'Компания не подтвердила согласование';
                                  approveStatusFalse.classList.add('cabinet__main-approve-false');
                                  bufferBaseProfileSection.appendChild(approveStatusFalse);
                                }
                              })
                              .catch((error) => {
                                // Обработка ошибок
                                console.error('Ошибка:', error.message);
                              });
                            }
                          })
                          .catch(error => {
                            console.error(error);
                            // обработать ошибку
                          });                         
                        })

                        
                        .catch(error => {
                          console.error(error);
                        });
                      }

                      document.querySelector('.cabinet__acc-companies-list').addEventListener('click', () => {
                        companyList.classList.remove('none');
                        
                        const cabinetMainChildren = document.querySelectorAll('.cabinet__main-base > *');
  
                        // Проходимся по найденным элементам
                        cabinetMainChildren.forEach(child => {
                          // Проверяем, что класс не равен "companyList"
                          if (!child.classList.contains('cabinet__main-list')) {
                            child.remove(); // Удаляем элемент
                          }
                        });
                      });

                    } else {
                      throw new Error('Ошибка получения деталей компании');
                    }
                  } catch (error) {
                    console.error(error);
                    const errorMessage = document.createElement('p');
                    errorMessage.textContent = 'Произошла ошибка при получении деталей компании';
                    companyList.appendChild(errorMessage);
                  }
                });

                companyList.appendChild(companyListItem);
              });
            }
          } else {
            throw new Error('Данные о предприятиях отсутствуют');
          }
        } catch (error) {
          console.error(error);
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'Данные о предприятиях отсутствуют';
          companyList.appendChild(errorMessage);
        }
      };
      fetchCompanies();
    } else {  //////////////////////////////////////////////// КОМПАНИЯ ///////////////////////////////////////////////////////////////////
      (async () => {
        console.log('я компания');
        try {
          const companyDetailsResponse = await fetch(`/get-inf-about-me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (companyDetailsResponse.ok) {
            let companyDetails = await companyDetailsResponse.json();
            console.log(companyDetails);

            const companyLabel = document.createElement('div');
            companyLabel.innerHTML = "<b>" + companyDetails.companyName + "</b>";
            bufferBaseProfileSection.appendChild(companyLabel);

            const contractLabel = document.createElement('div');
            contractLabel.innerText = "Договор";
            bufferBaseProfileSection.appendChild(contractLabel);

            if (!companyDetails.contractCreated){
              const errorMessage = document.createElement('p');
              errorMessage.textContent = 'Университет ещё не инициировал генерацию документа';
              bufferBaseProfileSection.appendChild(errorMessage);
            } else{
              //console.log('я компания');
              
              fetch(`/find-main-part-of-contract/${companyDetails._id}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(mainPartOfContract => {
              console.log(mainPartOfContract);
                
              fetch(`/get-status-about-approved/${mainPartOfContract._id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error(response.status);
                }
                return response.json();
              })
              .then(checkApproveStatus => {
                if (checkApproveStatus.isApproved) {
                  const GenerateFinalDoc = document.createElement('button');
                  GenerateFinalDoc.textContent = 'Скачать главную часть договора';
                  GenerateFinalDoc.classList.add('cabinet__main-generate-finaldoc');

                  let fetchAttachmentOnesCalled = false;
                  async function fetchAttachmentOnes() {
                    try {
                      const response = await fetch(`/get-add-ones/${mainPartOfContract._id}`, {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        }
                      });
                  
                      if (!response.ok) {
                        throw new Error('Ошибка при получении списка приложений 1');
                      }
                  
                      const data = await response.json();
                  
                      if (data.message) {
                        // Если есть сообщение о том, что приложений 1 нет
                        const addOneEmpty = document.createElement('p');
                        addOneEmpty.textContent = 'Созданных приложений 1 нет';
                        addOneEmpty.classList.add('cabinet__main-approve-false');
                        bufferBaseProfileSection.appendChild(addOneEmpty);
                      } else {
                        const attachmentOnes = data.attachmentOnes;
                        console.log(attachmentOnes); // Обработка полученных приложений 1

                        // Создание flex-списка
                        const attachmentOneList = document.createElement('ul');
                        attachmentOneList.classList.add('cabinet__main-attachment-one-list');

                        // Обход полученных приложений 1 и создание элементов списка
                        attachmentOnes.forEach((attachmentOne, index) => {
                          const attachmentOneItem = document.createElement('li');
                          attachmentOneItem.textContent = `${index + 1} Приложение 1`;

                          // Обработчик события клика на элементе списка

                          attachmentOneItem.addEventListener('click', async () => {
                            const containerAddOnesBtn = document.createElement('div');
                            bufferBaseProfileSection.appendChild(containerAddOnesBtn);
                            fetchAttachmentOnesCalled = false;
                            attachmentOneList.remove();
                            document.querySelector('.cabinet__acc-documents-list').addEventListener('click', (event) => {
                              containerAddOnesBtn.remove();   
                              const paragraphs = bufferBaseProfileSection.querySelectorAll('p');
                              
                              paragraphs.forEach((paragraph) => {
                                paragraph.remove();
                              });
                              if (!fetchAttachmentOnesCalled) {
                                fetchAttachmentOnes();
                                fetchAttachmentOnesCalled = true;
                              }
                            });
                            
                            async function handleAddOneApproval() {
                              try {
                                const checkAddOneApproved = await sendRequest(`/get-add-one-contract-approved/${attachmentOne._id}`, 'GET', null, token);
                            
                                if (checkAddOneApproved.isApproved) {
                                  const GenerateFinalAddOneDoc = document.createElement('button');
                                  GenerateFinalAddOneDoc.textContent = 'Скачать финальную версию приложения 1';
                                  GenerateFinalAddOneDoc.classList.add('cabinet__main-generate-finaldoc');

                                  GenerateFinalAddOneDoc.addEventListener("click", async () => {
                                    try {
                                      const createFinalDocumentAddOne = await sendRequest(`http://localhost:5555/generate-add-one-doc/${attachmentOne._id}`, 'GET', null, token, true);
                                  
                                      if (createFinalDocumentAddOne.ok) {
                                        createFinalDocumentAddOne.blob().then((blob) => {
                                          var url = window.URL.createObjectURL(blob);
                                          var a = document.createElement("a");
                                          document.body.appendChild(a);
                                          a.style = "display: none";
                                          a.href = url;
                                          a.download = "finaladdone.docx";
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

                                  const addTwoDocLabel = document.createElement('div');
                                  addTwoDocLabel.innerText = "Приложение 2";
                                  containerAddOnesBtn.appendChild(GenerateFinalAddOneDoc);
                                  containerAddOnesBtn.appendChild(addTwoDocLabel);
                                  
                                  const addTwoCreatedFunc = async () => {
                                    try {
                                      const checkAddTwoCreated = await sendRequest(`/get-add-two/${attachmentOne._id}`, 'GET', null, token);
                                  
                                      if (checkAddTwoCreated.exists) {
                                        async function checkApprovalStatusRecursive(){
                                          try {
                                            const checkAddTwoApproved = await sendRequest(`/get-add-two-contract-approved/${attachmentOne._id}`, 'GET', null, token);
                                          
                                            if (checkAddTwoApproved.isApproved) {
                                              
                                              const GenerateFinalAddTwoDoc = document.createElement('button');
                                              GenerateFinalAddTwoDoc.textContent = 'Скачать финальную версию приложения 2';
                                              GenerateFinalAddTwoDoc.classList.add('cabinet__main-generate-finaldoc');
  
                                              GenerateFinalAddTwoDoc.addEventListener("click", async () => {
                                                try {
                                                  const createFinalDocumentAddOne = await sendRequest(`/generate-add-two-doc/${attachmentOne._id}`, 'GET', null, token, true);
                                              
                                                  if (createFinalDocumentAddOne.ok) {
                                                    createFinalDocumentAddOne.blob().then((blob) => {
                                                      var url = window.URL.createObjectURL(blob);
                                                      var a = document.createElement("a");
                                                      document.body.appendChild(a);
                                                      a.style = "display: none";
                                                      a.href = url;
                                                      a.download = "finaladdtwo.docx";
                                                      a.click();
                                                      window.URL.revokeObjectURL(url);
                                                    });
                                                  } else {
                                                    const errorData = await response.json();
                                                    console.log(errorData);
                                                  }
                                                } catch (error) {
                                                  console.log(error);
                                                  // Обработка ошибки при выполнении запроса
                                                }
                                              });
  
                                              containerAddOnesBtn.appendChild(GenerateFinalAddTwoDoc);
                                            } else {
  
                                              try {
                                                const companyApprovedAddTwo = await sendRequest(`/check-add-two-contract-comp-approved/${attachmentOne._id}`, 'GET', null, token);
                                                
                                                if (companyApprovedAddTwo) {
                                                  const GenerateAddTwoDoc = document.createElement('button');
                                                  GenerateAddTwoDoc.textContent = 'Скачать демо-версию приложения 2';
                                                  GenerateAddTwoDoc.classList.add('cabinet__main-generate-finaldoc');
                                            
                                                  GenerateAddTwoDoc.addEventListener("click", async () => {
                                                    try {
                                                      const createDemoDocumentAddTwo = await sendRequest(`http://localhost:5555/generate-demo-add-two-doc/${attachmentOne._id}`, 'GET', null, token, true);
                                            
                                                      if (createDemoDocumentAddTwo.ok) {
                                                        createDemoDocumentAddTwo.blob().then((blob) => {
                                                          var url = window.URL.createObjectURL(blob);
                                                          var a = document.createElement("a");
                                                          document.body.appendChild(a);
                                                          a.style = "display: none";
                                                          a.href = url;
                                                          a.download = "demoaddtwo.docx";
                                                          a.click();
                                                          window.URL.revokeObjectURL(url);
                                                        });
                                                      } else {
                                                        const errorData = await createDemoDocumentAddTwo.json();
                                                        console.log(errorData);
                                                        // Обработка ошибки при выполнении запроса
                                                      }
                                                    } catch (error) {
                                                      console.log(error);
                                                      // Обработка ошибки при выполнении запроса
                                                    }
                                                  });
                                                  bufferBaseProfileSection.appendChild(GenerateAddTwoDoc);

                                                  const addTwoEmpty = document.createElement('p');
                                                  addTwoEmpty.textContent = 'Университет ещё не подтвердил согласование';
                                                  addTwoEmpty.classList.add('cabinet__main-approve-false');
                                                  bufferBaseProfileSection.appendChild(addTwoEmpty);
                                                } else{


                                                  const GenerateAddTwoDoc = document.createElement('button');
                                                  GenerateAddTwoDoc.textContent = 'Скачать демо-версию приложения 2';
                                                  GenerateAddTwoDoc.classList.add('cabinet__main-generate-finaldoc');
                                            
                                                  GenerateAddTwoDoc.addEventListener("click", async () => {
                                                    try {
                                                      const createDemoDocumentAddTwo = await sendRequest(`http://localhost:5555/generate-demo-add-two-doc/${attachmentOne._id}`, 'GET', null, token, true);
                                            
                                                      if (createDemoDocumentAddTwo.ok) {
                                                        createDemoDocumentAddTwo.blob().then((blob) => {
                                                          var url = window.URL.createObjectURL(blob);
                                                          var a = document.createElement("a");
                                                          document.body.appendChild(a);
                                                          a.style = "display: none";
                                                          a.href = url;
                                                          a.download = "demoaddtwo.docx";
                                                          a.click();
                                                          window.URL.revokeObjectURL(url);
                                                        });
                                                      } else {
                                                        const errorData = await createDemoDocumentAddTwo.json();
                                                        console.log(errorData);
                                                        // Обработка ошибки при выполнении запроса
                                                      }
                                                    } catch (error) {
                                                      console.log(error);
                                                      // Обработка ошибки при выполнении запроса
                                                    }
                                                  });
                                            
                                                  const editDataAddTwoBtn = document.createElement('button');
                                                  editDataAddTwoBtn.textContent = 'Редактировать данные приложения 2';
                                                  editDataAddTwoBtn.classList.add('cabinet__main-edit-data');
                                            
                                                  // обработка кнопки
                                                  editDataAddTwoBtn.addEventListener('click', async function () {
                                                    editDataAddTwoBtn.classList.add('none');
                                                    const editFormAddTwo = document.createElement('form');
                                                    editFormAddTwo.classList.add('cabinet__main-edit__addoneform')
                                            
                                                    // Создание элементов формы
                                                    const locationLabel = document.createElement('label');
                                                    const locationInput = document.createElement('input');
                                                    const placementLabel = document.createElement('label');
                                                    const placementInput = document.createElement('input');
                                                    const submitButtonAddTwo = document.createElement('button');
                                                    const closeButton = document.createElement('button');
                                            
                                                    // Настройка атрибутов элементов формы
                                                    locationInput.type = 'text';
                                                    locationInput.name = 'location';
                                                    placementInput.type = 'text';
                                                    placementInput.name = 'placement';
                                                    submitButtonAddTwo.type = 'submit';
                                                    submitButtonAddTwo.textContent = 'Отправить';
                                                    closeButton.textContent = 'Закрыть';
                                            
                                                    // Настройка связей между label и input
                                                    locationLabel.textContent = 'Место нахождения профильной организации:';
                                                    locationLabel.appendChild(locationInput);
                                                    placementLabel.textContent = 'Перечень помещений для проведения практики:';
                                                    placementLabel.appendChild(placementInput);
                                            
                                                    editFormAddTwo.appendChild(locationLabel);
                                                    editFormAddTwo.appendChild(placementLabel);
                                                    editFormAddTwo.appendChild(submitButtonAddTwo);
                                                    editFormAddTwo.appendChild(closeButton);
                                            
                                                    const dataOfFormAddTwo = await sendRequest(`/get-data-add-two/${attachmentOne._id}`, 'GET', null, token);
                                                    console.log(dataOfFormAddTwo);
                                                    locationInput.value = dataOfFormAddTwo.location;
                                                    placementInput.value = dataOfFormAddTwo.placement;

                                                    editFormAddTwo.addEventListener('submit', async (event) => {
                                                      event.preventDefault();
                                                      editFormAddTwo.remove();
                                                      editDataAddTwoBtn.classList.remove('none');
                                            
                                                      const formData = {
                                                        location: locationInput.value,
                                                        placement: placementInput.value
                                                      };
                                                      try {
                                                        const createAddTwoContract = await sendRequest(`/create-add-two-contract/${attachmentOne._id}`, 'POST', formData, token);
                                                      } catch (error) {
                                                        console.error('Ошибка при выполнении запроса:', error);
                                                        // Обработка ошибки при выполнении запроса
                                                      }
                                                    })
                                            
                                                    closeButton.addEventListener('click', function () {
                                                      editFormAddTwo.remove();
                                                      editDataAddTwoBtn.classList.remove('none');
                                                    });
                                                    containerAddOnesBtn.appendChild(editFormAddTwo);
                                                  })
                                            
                                                  const approveDocAddTwoBtn = document.createElement('button');
                                                  approveDocAddTwoBtn.textContent = 'Согласовать документ';
                                                  approveDocAddTwoBtn.classList.add('cabinet__main-approve-doc');
                                            
                                                  approveDocAddTwoBtn.addEventListener("click", async () => {
                                                    try {
                                                      if (document.querySelector('.cabinet__main-edit__addoneform') != null){
                                                        document.querySelector('.cabinet__main-edit__addoneform').remove();
                                                      };
                                                      GenerateAddTwoDoc.remove();
                                                      approveDocAddTwoBtn.remove();
                                                      editDataAddTwoBtn.remove();
                                                      const updateCompanyApprovedAddTwo = await sendRequest(`/update-add-two-contract-comp-approved/${attachmentOne._id}`, 'POST', null, token);
                                                      
                                                      checkApprovalStatusRecursive();
                                                    } catch (error) {
                                                      console.error('Ошибка при выполнении запроса:', error);
                                                      // Обработка ошибки при выполнении запроса
                                                    }
                                                  });
  
                                                  containerAddOnesBtn.appendChild(editDataAddTwoBtn);
                                                  containerAddOnesBtn.appendChild(GenerateAddTwoDoc);
                                                  containerAddOnesBtn.appendChild(approveDocAddTwoBtn);
                                                }
  
                                              } catch (error) {
                                                console.error('Ошибка при выполнении запроса:', error);
                                              }
                                            }
                                          } catch (error) {
                                            console.error('Ошибка при выполнении запроса:', error);
                                            // Обработка ошибки при выполнении запроса
                                          }  
                                        }

                                        checkApprovalStatusRecursive();
                                      } else {
                                        const GenerateAddTwoDoc = document.createElement('button');
                                        GenerateAddTwoDoc.textContent = 'Перейти к созданию приложения 2';
                                        GenerateAddTwoDoc.classList.add('cabinet__main-generate-addonedoc');
                                        containerAddOnesBtn.appendChild(GenerateAddTwoDoc);
                                  
                                        GenerateAddTwoDoc.addEventListener('click', async function () {
                                          GenerateAddTwoDoc.remove();
                                          const formAddTwo = document.createElement('form');
                                          formAddTwo.classList.add('cabinet__main-edit__addoneform')
                                  
                                          // Создание элементов формы
                                          const locationLabel = document.createElement('label');
                                          const locationInput = document.createElement('input');
                                          const placementLabel = document.createElement('label');
                                          const placementInput = document.createElement('input');
                                          const submitButtonAddTwo = document.createElement('button');
                                  
                                          // Настройка атрибутов элементов формы
                                          locationInput.type = 'text';
                                          locationInput.name = 'location';
                                          placementInput.type = 'text';
                                          placementInput.name = 'placement';
                                          submitButtonAddTwo.type = 'submit';
                                          submitButtonAddTwo.textContent = 'Отправить';
                                  
                                          // Настройка связей между label и input
                                          locationLabel.textContent = 'Место нахождения профильной организации:';
                                          locationLabel.appendChild(locationInput);
                                          placementLabel.textContent = 'Перечень помещений для проведения практики:';
                                          placementLabel.appendChild(placementInput);
                                  
                                          formAddTwo.appendChild(locationLabel);
                                          formAddTwo.appendChild(placementLabel);
                                          formAddTwo.appendChild(submitButtonAddTwo);
                                  
                                          formAddTwo.addEventListener('submit', async (event) => {
                                            event.preventDefault();
                                            formAddTwo.remove();
                                  
                                            const formData = {
                                              location: locationInput.value,
                                              placement: placementInput.value
                                            };
                                            try {
                                              const createAddTwoContract = await sendRequest(`/create-add-two-contract/${attachmentOne._id}`, 'POST', formData, token);
                                              await addTwoCreatedFunc();
                                            } catch (error) {
                                              console.error('Ошибка при выполнении запроса:', error);
                                              // Обработка ошибки при выполнении запроса
                                            }
                                          })
                                  
                                          containerAddOnesBtn.appendChild(formAddTwo);
                                        })
                                      }
                                    } catch (error) {
                                      console.error('Ошибка при выполнении запроса:', error);
                                    }
                                  };
                                  
                                  await addTwoCreatedFunc();

                                } else {
                                  try {
                                    const checkCompanyApproved = await sendRequest(`/get-add-one-contract-comp-approved/${attachmentOne._id}`, 'GET', null, token);
                            
                                    if (checkCompanyApproved) {
                                      const GenerateAddOneDoc = document.createElement('button');
                                      GenerateAddOneDoc.textContent = 'Скачать демо-версию приложение 1';
                                      GenerateAddOneDoc.classList.add('cabinet__main-generate-finaldoc');
                            
                                      GenerateAddOneDoc.addEventListener("click", async () => {
                                        try {
                                          const createDemoDocumentAddOne = await sendRequest(`http://localhost:5555/generate-demo-add-one-doc/${attachmentOne._id}`, 'GET', null, token, true);
                            
                                          if (createDemoDocumentAddOne.ok) {
                                            createDemoDocumentAddOne.blob().then((blob) => {
                                              var url = window.URL.createObjectURL(blob);
                                              var a = document.createElement("a");
                                              document.body.appendChild(a);
                                              a.style = "display: none";
                                              a.href = url;
                                              a.download = "demoaddone.docx";
                                              a.click();
                                              window.URL.revokeObjectURL(url);
                                            });
                                          } else {
                                            const errorData = await response.json();
                                            console.log(errorData);
                                          }
                                        } catch (error) {
                                          console.log(error);
                                        }
                                      });
                                      bufferBaseProfileSection.appendChild(GenerateAddOneDoc);

                                      const addOneEmpty = document.createElement('p');
                                      addOneEmpty.textContent = 'Университет ещё не подтвердил согласование';
                                      addOneEmpty.classList.add('cabinet__main-approve-false');
                                      bufferBaseProfileSection.appendChild(addOneEmpty);
                                    } else {
                                      const GenerateAddOneDoc = document.createElement('button');
                                      GenerateAddOneDoc.textContent = 'Скачать демо-версию приложение 1';
                                      GenerateAddOneDoc.classList.add('cabinet__main-generate-finaldoc');
                            
                                      GenerateAddOneDoc.addEventListener("click", async () => {
                                        try {
                                          const createDemoDocumentAddOne = await sendRequest(`http://localhost:5555/generate-demo-add-one-doc/${attachmentOne._id}`, 'GET', null, token, true);
                            
                                          if (createDemoDocumentAddOne.ok) {
                                            createDemoDocumentAddOne.blob().then((blob) => {
                                              var url = window.URL.createObjectURL(blob);
                                              var a = document.createElement("a");
                                              document.body.appendChild(a);
                                              a.style = "display: none";
                                              a.href = url;
                                              a.download = "demoaddone.docx";
                                              a.click();
                                              window.URL.revokeObjectURL(url);
                                            });
                                          } else {
                                            const errorData = await response.json();
                                            console.log(errorData);
                                          }
                                        } catch (error) {
                                          console.log(error);
                                        }
                                      });
                            
                                      const approveDocAddOneBtn = document.createElement('button');
                                      approveDocAddOneBtn.textContent = 'Согласовать документ';
                                      approveDocAddOneBtn.classList.add('cabinet__main-approve-doc');
                            
                                      approveDocAddOneBtn.addEventListener("click", async () => {
                                        try {
                                          const updateAddOneCompApproved = await sendRequest(`/update-add-one-contract-comp-approved/${attachmentOne._id}`, 'POST', null, token);
                                          approveDocAddOneBtn.remove();
                                          GenerateAddOneDoc.remove();
                                          
                                          handleAddOneApproval(); 
                                        } catch (error) {
                                          console.log(error);
                                        }
                                      });
                            
                                      containerAddOnesBtn.appendChild(GenerateAddOneDoc);
                                      containerAddOnesBtn.appendChild(approveDocAddOneBtn);
                                    }
                                  } catch (error) {
                                    console.error('Ошибка при выполнении запроса:', error);
                                  }
                                }
                              } catch (error) {
                                console.error('Ошибка при выполнении запроса:', error);
                              }
                            }
                            
                            // Вызов функции для первоначального выполнения
                            handleAddOneApproval();
                          });
                          // Добавление элемента списка в flex-список
                          attachmentOneList.appendChild(attachmentOneItem);
                        });

                        bufferBaseProfileSection.appendChild(attachmentOneList);

                      }
                    } catch (error) {
                      console.error(error);
                    }
                  }
                  
                  // перенести блок после проверки договора на странице компании

                  // Вызов функции для получения приложений 1
                  fetchAttachmentOnes();

                  GenerateFinalDoc.addEventListener("click", () => {
                    fetch(`/generate-final-doc/${companyDetails._id}`, {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                      },
                    })
                      .then((response) => {
                        if (!response.ok) {
                          throw new Error(response.status);
                        }
                        response.blob().then((blob) => {
                          var url = window.URL.createObjectURL(blob);
                          var a = document.createElement("a");
                          document.body.appendChild(a);
                          a.style = "display: none";
                          a.href = url;
                          a.download = "final.docx"; // название файла, который вы сгенерировали на бэкэнде
                          a.click();
                          window.URL.revokeObjectURL(url);
                        });
                      })
                      .catch((error) => {
                        console.error(error);
                        // здесь можно обработать ошибку
                      });
                  });

                  bufferBaseProfileSection.appendChild(GenerateFinalDoc);

                  const addOneDocLabel = document.createElement('div');
                  addOneDocLabel.innerText = "Приложение 1";
                  bufferBaseProfileSection.appendChild(addOneDocLabel);
                } else{
                  fetch(`/get-comp-approve-in-main-contract/${mainPartOfContract._id}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                  })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error('Ошибка запроса');
                    }
                    return response.json();
                  })
                  .then((checkCompanyApproval) => {
                    if(!checkCompanyApproval.companyApproved){
                      const CreateDemoDocBtn = document.createElement('button');
                      CreateDemoDocBtn.textContent = 'Скачать пробный документ';
                      CreateDemoDocBtn.classList.add('cabinet__main-generate-doc');
                      bufferBaseProfileSection.appendChild(CreateDemoDocBtn);

                      // обработчик кнопки
        
                      const editDataBtn = document.createElement('button');
                      editDataBtn.textContent = 'Редактировать данные';
                      editDataBtn.classList.add('cabinet__main-edit-data');
                      bufferBaseProfileSection.appendChild(editDataBtn);
        
                      editDataBtn.addEventListener('click', async function(){
                        const companyForm = document.createElement('form');
                        companyForm.classList.add('cabinet__main-edit-comp_form');
                        const editCompanyForm = editProfileSection.querySelector('.edit-company__form');
                          
                        const formElements = editCompanyForm.cloneNode(true);
                        const fileInputs = formElements.querySelectorAll('.edit-company__label-file');
                        fileInputs.forEach(input => input.remove());
                          
                        companyForm.innerHTML = formElements.innerHTML;
                        
                        const companyInputs = companyForm.querySelectorAll('.edit-company__input-text');
                        for (let i = 0; i < companyInputs.length; i++) {
                          const inputName = companyInputs[i].getAttribute('name');
                          if (inputName in companyDetails) {
                            companyInputs[i].value = companyDetails[inputName];
                          }
                        }
                      
                        const containerWithEditCompForms = document.createElement('div');
                        containerWithEditCompForms.appendChild(companyForm);
                        containerWithEditCompForms.classList.add('cabinet__main-container-editcomp');
        
                        editDataBtn.style.display = 'none';
        
                        const closeEditBtn = document.createElement('button');
                        closeEditBtn.textContent = 'Закрыть редактирование';
                        closeEditBtn.classList.add('cabinet__main-edit-data');
                        containerWithEditCompForms.appendChild(closeEditBtn);
        
                        closeEditBtn.addEventListener('click', () => {
                          editDataBtn.style.display = 'block';
                          containerWithEditCompForms.remove();
                        });
        
                        bufferBaseProfileSection.appendChild(containerWithEditCompForms);
        
                        companyForm.addEventListener('submit', async (event) => {
                          event.preventDefault();
                        
                          const formData = new FormData(event.target);
                          const data = Object.fromEntries(formData.entries());
                        
                          try {
                            const response = await fetch(`/update-data-of-company/${companyDetails._id}`, {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify(data),
                            });
                        
                            const updatedData = await response.json();
                            console.log(updatedData);
                            companyDetails = updatedData;
                          } catch (error) {
                            console.error(error);
                          }
                        });
                      });
        
                      // Кнопка "Согласовать документ"
                      const approveDocBtn = document.createElement('button');
                      approveDocBtn.textContent = 'Согласовать документ';
                      approveDocBtn.classList.add('cabinet__main-approve-doc');
                      bufferBaseProfileSection.appendChild(approveDocBtn);
        
                      approveDocBtn.addEventListener("click", () => {
                        console.log('asdasd');
                        fetch(`/update-comp-approve-in-main-contract/${mainPartOfContract._id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                          },
                        })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(response.status);
                          }
                          return response.json();
                        })
                        .then((compApprovedStatusTrue) => {
                          console.log(`Статус согласования на company: ${compApprovedStatusTrue.companyApproved}`);
                          
                          approveDocBtn.remove();
                          document.querySelector('.cabinet__main-generate-doc').remove();
                          editDataBtn.remove();
        
                          fetch(`/get-status-about-approved/${mainPartOfContract._id}`, {
                            method: 'GET',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                          })
                            .then(response => {
                              if (!response.ok) {
                                throw new Error(response.status);
                              }
                              return response.json();
                            })
                            .then(checkApproveStatus => {
                              if (checkApproveStatus.isApproved) {
                                const GenerateFinalDoc = document.createElement('button');
                                GenerateFinalDoc.textContent = 'Скачать главную часть договора';
                                GenerateFinalDoc.classList.add('cabinet__main-generate-finaldoc');

                                // обработчик кнопки

                                const addOneDocLabel = document.createElement('div');
                                addOneDocLabel.innerText = "Приложение 1";
                                bufferBaseProfileSection.appendChild(addOneDocLabel);

                                const GenerateAddOneDoc = document.createElement('button');
                                GenerateAddOneDoc.textContent = 'Перейти к созданию приложения 1';
                                GenerateAddOneDoc.classList.add('cabinet__main-generate-addonedoc');
        
                                GenerateFinalDoc.addEventListener("click", () => {
                                  fetch(`/generate-final-doc/${companyDetails._id}`, {
                                    method: "GET",
                                    headers: {
                                      "Content-Type": "application/json",
                                      'Authorization': `Bearer ${token}`
                                    },
                                  })
                                    .then((response) => {
                                      if (!response.ok) {
                                        throw new Error(response.status);
                                      }
                                      response.blob().then((blob) => {
                                        var url = window.URL.createObjectURL(blob);
                                        var a = document.createElement("a");
                                        document.body.appendChild(a);
                                        a.style = "display: none";
                                        a.href = url;
                                        a.download = "final.docx"; // название файла, который вы сгенерировали на бэкэнде
                                        a.click();
                                        window.URL.revokeObjectURL(url);
                                      });
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                      // здесь можно обработать ошибку
                                    });
                                });
        
                                bufferBaseProfileSection.appendChild(GenerateFinalDoc);
                                // логотип приложения 1
                                bufferBaseProfileSection.appendChild(GenerateAddOneDoc);
                              } else {
                                const CreateDemoDocBtn = document.createElement('button');
                                CreateDemoDocBtn.textContent = 'Скачать пробный документ';
                                CreateDemoDocBtn.classList.add('cabinet__main-generate-doc');
                                bufferBaseProfileSection.appendChild(CreateDemoDocBtn);
                                document.querySelector('.cabinet__main-generate-doc').addEventListener("click", () => {
                                  fetch(`/generate-demo-doc/${companyDetails._id}`, {
                                    method: "GET",
                                    headers: {
                                      "Content-Type": "application/json",
                                      'Authorization': `Bearer ${token}`
                                    },
                                  })
                                    .then((response) => {
                                      if (!response.ok) {
                                        throw new Error(response.status);
                                      }
                                      response.blob().then((blob) => {
                                        var url = window.URL.createObjectURL(blob);
                                        var a = document.createElement("a");
                                        document.body.appendChild(a);
                                        a.style = "display: none";
                                        a.href = url;
                                        a.download = "demo.docx"; // название файла, который вы сгенерировали на бэкэнде
                                        a.click();
                                        window.URL.revokeObjectURL(url);
                                      });
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                      // здесь можно обработать ошибку
                                    });
                                });
                                

                                const approveStatusFalse = document.createElement('p');
                                approveStatusFalse.textContent = 'Университет не подтвердил согласование';
                                approveStatusFalse.classList.add('cabinet__main-approve-false');
                                bufferBaseProfileSection.appendChild(approveStatusFalse);
                              }
                            })
                            .catch(error => {
                              console.error(error);
                              // обработать ошибку
                            });
                        })
                        .catch((error) => {
                          console.error(error);
                          // здесь можно обработать ошибку
                        });
                      });
        
                      document.querySelector('.cabinet__main-generate-doc').addEventListener("click", () => {
                        fetch(`/generate-demo-doc/${companyDetails._id}`, {
                          method: "GET",
                          headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                          },
                        })
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error(response.status);
                            }
                            response.blob().then((blob) => {
                              var url = window.URL.createObjectURL(blob);
                              var a = document.createElement("a");
                              document.body.appendChild(a);
                              a.style = "display: none";
                              a.href = url;
                              a.download = "demo.docx"; // название файла, который вы сгенерировали на бэкэнде
                              a.click();
                              window.URL.revokeObjectURL(url);
                            });
                          })
                          .catch((error) => {
                            console.error(error);
                            // здесь можно обработать ошибку
                          });
                      });
                    } else{
                      const CreateDemoDocBtn = document.createElement('button');
                      CreateDemoDocBtn.textContent = 'Скачать пробный документ';
                      CreateDemoDocBtn.classList.add('cabinet__main-generate-doc');
                      bufferBaseProfileSection.appendChild(CreateDemoDocBtn);
                      document.querySelector('.cabinet__main-generate-doc').addEventListener("click", () => {
                        fetch(`/generate-demo-doc/${companyDetails._id}`, {
                          method: "GET",
                          headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                          },
                        })
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error(response.status);
                            }
                            response.blob().then((blob) => {
                              var url = window.URL.createObjectURL(blob);
                              var a = document.createElement("a");
                              document.body.appendChild(a);
                              a.style = "display: none";
                              a.href = url;
                              a.download = "demo.docx"; // название файла, который вы сгенерировали на бэкэнде
                              a.click();
                              window.URL.revokeObjectURL(url);
                            });
                          })
                          .catch((error) => {
                            console.error(error);
                            // здесь можно обработать ошибку
                          });
                      });
                      

                      const approveStatusFalse = document.createElement('p');
                      approveStatusFalse.textContent = 'Университет не подтвердил согласование';
                      approveStatusFalse.classList.add('cabinet__main-approve-false');
                      bufferBaseProfileSection.appendChild(approveStatusFalse);
                    }
                  })
                }
              })
              .catch(error => {
                console.error(error);
              });
              })

              .catch(error => {
                console.error(error);
              });
            }
          } else {
            throw new Error('Ошибка получения деталей компании');
          }
        } catch (error) {
          console.error(error);
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'Заполните данные о предприятии';
          bufferBaseProfileSection.appendChild(errorMessage);
        }
      })();
    }
});