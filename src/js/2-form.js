const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

// 1. Підставляємо дані з localStorage при завантаженні сторінки
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  } catch (error) {
    console.error('Помилка при парсі збережених даних:', error);
  }
}

// 2. Слухаємо input і оновлюємо formData + localStorage
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 3. Слухаємо submit
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  // Очищаємо форму, локальне сховище та formData
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});
