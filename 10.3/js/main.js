//Задание 3
//Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
//Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
//При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
//Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:
//Добавить в чат механизм отправки гео-локации:
//При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на 
//https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер,
//не выводить.

const wsUri = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
  const communication = document.querySelector(".communication");
  const overflow = document.querySelector(".overflow");
  const input = document.querySelector(".input");
  const btn = document.querySelector(".btn");
  
const status = document.querySelector('.status');
const link = document.querySelector('.link');
const btnGeo = document.querySelector('.btn-geo');
  let socket = new WebSocket(wsUri);


  


// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  link.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  link.textContent = 'Ссылка на карту';
}

btnGeo.addEventListener('click', () => {
  link.href = '';
  link.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
 
  socket.onopen = () => {
communication.innerHTML = `<p class="communication-text">Соединение установлено....</p>`;
  }
  
  socket.onmessage = (event) => {
      writeMessage(`<span class="text-bold">admin: </span><br>  ${event.data}`, true);
  }
  
  socket.onerror = () => {
   communication.innerHTML = `<p class="communication-text">Соединение не установлено....</p>`;
  }
  
  btn.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
   socket.send(input.value);
   writeMessage(input.value, false);
    input.value === "";

  }
  
  function writeMessage(message, isRecieved) {
    let messageText = `<p class="${isRecieved? "admin" : "user"}">${message}</p>`;
    overflow.innerHTML += messageText;
  }



}    

document.addEventListener("DOMContentLoaded", pageLoaded);

