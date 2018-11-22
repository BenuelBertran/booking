/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

(function() {
          ////////// ВЗАИМОДЕЙСТВИЕ С СЕРВЕРОМ //////////

  //----------> Локальные переменные

  //Сервер с данными
  var URL;

  //----------> Глобальные переменные

  window.backend = {
    //Запрос данных с сервера
    load: function(onLoad, onError) {
      //Адрес запроса
      URL = "https://js.dump.academy/keksobooking/data";
      //Создание нового запроса
      var xhr = new XMLHttpRequest();
      //Инициализация запроса
      xhr.open("GET", URL);
      //Указание формата ответа
      xhr.responseType = "json";
      //Выполнить при получениии ответа
      xhr.addEventListener("load", function() {
        //Успешный ответ
        if (xhr.status === 200) {
          onLoad(xhr.response);
          //Ошибка
        } else {
          onError("<Error: 'Client'> Ошибка " + "#" + xhr.status + " " + xhr.statusText);
        }
      });
      xhr.addEventListener("error", function() {
          onError("<Error: 'Server'> Произошла ошибка соединения");
      });
      xhr.addEventListener("timeout", function() {
          onError("<Error: 'Timeout'> Запрос не успел выполниться за " + xhr.timeout + "мс");
      });
      //Отправка запроса
      xhr.send();
    },
    //Отправка данных на сервер
    save: function(data, onLoad, onError) {
      //Адрес отправки данных
      URL = "https://js.dump.academy/keksobooking";
      //Создание нового запроса
      var xhr = new XMLHttpRequest();
      //Инициализация запроса
      xhr.open("POST", URL);
      //Указание формата ответа
      xhr.responseType = "json";
      //Выполнить при получениии ответа
      xhr.addEventListener("load", function() {
      //Упешный ответ
      if (xhr.status === 200) {
        onLoad(xhr.response);
        //Ошибка
      } else {
        onError("<Error: 'Client'> Ошибка " + "#" + xhr.status + " " + xhr.statusText);
      }
      });
      xhr.addEventListener("error", function() {
          onError("<Error: 'Server'> Произошла ошибка соединения");
      });
      xhr.addEventListener("timeout", function() {
          onError("<Error: 'Timeout'> Запрос не успел выполниться за " + xhr.timeout + "мс");
      });
      //Отправка данных
      xhr.send(data);
    }
  };
})();
