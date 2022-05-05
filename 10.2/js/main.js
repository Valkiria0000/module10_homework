//Задание 2.
//Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 
const btn = document.querySelector('.btn');

btn.addEventListener ('click', () => {
   let screenWidth = window.screen.width;
   let screenHeight = window.screen.height;
alert(`Ширина  вашего экрана: ${screenWidth}px, а высота вашего экрана: ${screenHeight}px`);
})
