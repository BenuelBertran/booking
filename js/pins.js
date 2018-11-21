/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

(function() {
            ////////// МАРКЕРЫ ПОХОЖИХ ОБЪЯВЛЕНИЙ //////////

  //----------> Локальные переменные

  //Шаблон маркера объявления
  var pinTemplate = document.querySelector("template").content.querySelector(".map__pin");

  //----------> Глобальные переменные

  window.pins = {
    //Список маркеров похожих объявлений
    pinsList: document.querySelector(".map__pins"),
    //Главный маркер
    mainPin: document.querySelector(".map__pin--main"),
    //Положение главного маркера по горизонтали
    mainPinX: document.querySelector(".map__pin--main").offsetLeft,
    //Положение главного маркера по вертикали
    mainPinY: document.querySelector(".map__pin--main").offsetTop,
    //Отрисовка маркеров на странице
    renderPins: function() {
    var fragment = document.createDocumentFragment();
    window.offersList.forEach(function(offer) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = "" + offer.location.x + "px";
      pinElement.style.top = "" + offer.location.y + "px";
      pinElement.querySelector("img").src = offer.author.avatar;
      pinElement.querySelector("img").alt = offer.offer.title;
      pinElement.classList.add("hidden");
      fragment.appendChild(pinElement);
    });
    window.pins.pinsList.appendChild(fragment);
    }
  };
})();
