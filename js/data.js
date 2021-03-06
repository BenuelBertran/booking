/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

(function() {
            ////////// ПОЛУЧЕНИЕ И ОТПРАВКА ДАННЫХ //////////

  //----------> Глобальные переменные

  window.data = {
    //Список похожих объявлений
    offersList: [],
    errorMessage: function(dataText) {
      //Всплывающее сообщение об ошибке
      var message = document.createElement("div");
      message.style = "z-index: 100; width: 30%; margin: 0 auto; padding: 20px; border: 5px solid black; box-sizing: border-box; text-align: center; background-color: red; color: black";
      message.style.position = "fixed";
      message.style.top = "50%";
      message.style.left = 0;
      message.style.right = 0;
      message.style.fontSize = "30px";
      message.textContent = dataText;
      document.body.insertAdjacentElement("afterBegin", message);
    }
  };

  //----------> Запрос данных с сервера

  //Получение данных похожего объявления с Успехом
  var onSuccess = function (data) {
    window.data.offersList = data;
    //Отрисовка маркеров похожих объявлений на странице
    window.pins.renderPins();
    //Отрисовка окна с содержанием объявления на странице
    window.popup.renderPopup();
  };
  //Получение данных похожего объявления с Ошибкой
  var onError = function (messageText) {
    window.data.errorMessage(messageText);
  };
  //Запрос списка похожих объявлений
  window.backend.load(onSuccess, onError);
})();
