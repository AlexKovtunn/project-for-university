document.addEventListener("DOMContentLoaded", function() {
  const buttonRegistration = document.querySelector('.button__reg');
  const registrationWindow = document.querySelector('.choice__container-reg');
  const mainCabinetWindow = document.querySelector('.choice__container');
  
  buttonRegistration.addEventListener('click', function() {
    mainCabinetWindow.classList.add('none');
    registrationWindow.classList.remove('none');
  })

  const buttonEntry = document.querySelector('.button__entry');
  const entryWindow = document.querySelector('.choice__container-entry');

  buttonEntry.addEventListener('click', function() {
    mainCabinetWindow.classList.add('none');
    entryWindow.classList.remove('none');
  })

  
  const fromRegToWindow = document.querySelectorAll('.window-reg__exit');
  
  fromRegToWindow.forEach(fromRegToWindow => {
    fromRegToWindow.addEventListener('click', function() {
      mainCabinetWindow.classList.remove('none');
      registrationWindow.classList.add('none');
      entryWindow.classList.add('none');
    })
  });
  
  
  const select = document.querySelector('.window-reg__custom-select');
  const selectSelected = select.querySelector('.window-reg__select-selected');
  const selectOptions = select.querySelectorAll('.window-reg__select-option');
  const selectedValue = select.querySelector('.window-reg__real-select');
  
  // Обработчик клика по выпадающему списку
  selectSelected.addEventListener('click', function() {
    select.classList.toggle('open');
  });
  
  // Обработчик выбора варианта
  for (const option of selectOptions) {
    option.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      selectSelected.textContent = this.textContent;
      selectSelected.style.color = "black";
      selectedValue.value = value;
      select.classList.remove('open');
    });
  } 



  const registrationForm = document.querySelector('.window-reg');

  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(registrationForm);
    const userData = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('http://localhost:5555/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        localStorage.setItem('token', user.token);
        localStorage.setItem('userRole', user.userRole);
        // перенаправление на страницу личного кабинета
        window.location.href = '../cabinet.html';
      } else {
        const errors = await response.json();
        console.log(errors);
      }
    } catch (error) {
      console.log(error);
    }
  });

  const entryForm = document.querySelector('.window-entry');

  entryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('asdas');
      
    const formData = new FormData(entryForm);
    const userData = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('http://localhost:5555/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        localStorage.setItem('token', user.token);
        localStorage.setItem('userRole', user.userRole);
        // перенаправление на страницу личного кабинета
        window.location.href = '../cabinet.html';
      } else {
        const errors = await response.json();
        console.log(errors);
      }
    } catch (error) {
      console.log(error);
    }
  });
});
