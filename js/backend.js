/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

(function() {
  var URL = "https://js.dump.academy/keksobooking/data";
  //
  window.backend = {
    load: function(onLoad, onError) {
      //Создание нового запроса
      var xhr = new XMLHttpRequest();
      //Инициализация запроса
      xhr.open("GET", URL);
      //Указание формата ответа
      xhr.responseType = "json";
      //Выполнить, при получениии ответа
      xhr.addEventListener("load", function() {
        if (xhr.status === 200) {
          onLoad(xhr.response);
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
    save: function(data, onLoad, onError) {
      var URL = "https://js.dump.academy/keksobooking";
      //Создание нового запроса
      var xhr = new XMLHttpRequest();
      //Инициализация запроса
      xhr.open("POST", URL);
      //Указание формата ответа
      xhr.responseType = "json";
      //Выполнить, при получениии ответа
      xhr.addEventListener("load", function() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
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
      xhr.send(data);
    }
  };
})();
