const myForm = document.querySelector('#form');

const sendButton = document.querySelector('.send-btn');

const modalText = document.querySelector('.popup-form__text');

const popupForm = document.querySelector('.popup-form');

const closePopupForm = document.querySelector('.popup-form__close');

const overlayForm = document.querySelector('.overlay-form');

sendButton.addEventListener('click', function (event) {
  event.preventDefault();
  if (validateForm(myForm)) {
      let name = myForm.elements.name.value;

      let email = myForm.elements.email.value;

      let tel = myForm.elements.tel.value;

      let formData = new FormData();

      formData.append('name', name);
      formData.append('email', email);
      formData.append('tel', tel);

      let url = 'https://webdev-api.loftschool.com/sendmail';

      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("POST", url);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.send(formData);
      xhr.addEventListener('load', e => {

          if (xhr.status == 200) {

              popupForm.classList.add('opened');
              modalText.innerText = 'Отправить письмо не удалось, повторите запрос позже.';

          } else if (xhr.status != 200) {

              popupForm.classList.add('opened');
              modalText.innerText = 'Сообщение отправлено';
              
          }
              closePopupForm.addEventListener('click', e => {
                  e.preventDefault();
                  popupForm.classList.remove('opened');
              });
              overlayForm.addEventListener("click", e => {
                  if (e.target === overlayForm) {
                      closePopupForm.click();
                  }
              })
          
          return xhr;

      })
  }
});


function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
      valid = false;
  }
  if (!validateField(form.elements.email)) {
      valid = false;
  }
  if (!validateField(form.elements.tel)) {
      valid = false;
  }
  return valid;
};

function validateField(field) {

  if (!field.checkValidity()) {
      field.nextElementSibling.textContent = field.validationMessage;
      return false;
  } else {
      field.nextElementSibling.textContent = '';
      return true;
  }

};