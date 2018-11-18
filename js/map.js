/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

////////// Карта Токио с объявлениями о сдаче жилья //////////

(function() {
    ///// Глобальные переменные /////

  window.map = {
    //Карта с объявлениями
    lodgingOffersList: document.querySelector(".map"),
    //Список маркеров похожих объявлений
    pinsList: document.querySelector(".map__pins"),
    //Главный маркер
    mainPin: document.querySelector(".map__pin--main"),
    //Положение главного маркера по горизонтали
    mainPinX: document.querySelector(".map__pin--main").offsetLeft,
    //Положение главного маркера по вертикали
    mainPinY: document.querySelector(".map__pin--main").offsetTop,
    //Независимая копия шаблона объявления
    offerElement: document.querySelector("template").content.querySelector(".map__card").cloneNode(true)
  };

  ///// Локальные переменные /////

  //Блок с фильтром объявлений
  var lodgingOfferFilter = document.querySelector(".map__filters-container");
  //Шаблон маркера объявления
  var pinTemplate = document.querySelector("template").content.querySelector(".map__pin");

  ///// Функции /////

  //Случайное число в диапазоне
  var getRandom = function (min, max) {
    return Math.random() * (max - min) + min;
  };
  //Случайная длина массива в диапазоне
  var getRandomLength = function (array, min, max) {
    array.length = Math.round(getRandom(min, max));

    return array;
  };
  //Перемешивание элементов массива
  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  };
  //Создание независимой копии массива (без дочерних "объектов")
  var cloneArray = function(array) {
    var clone = array.slice(0);
    return clone;
  };

  //Добавление недостающих классов в шаблон объявления
  window.map.offerElement.querySelector("h3").classList.add("popup__title");
  window.map.offerElement.querySelector("p:first-of-type").classList.add("popup__text--address");
  window.map.offerElement.querySelector("p:nth-of-type(2)").classList.add("popup__text--price");
  window.map.offerElement.querySelector("h4").classList.add("popup__type");
  window.map.offerElement.querySelector("p:nth-of-type(3)").classList.add("popup__text--capacity");
  window.map.offerElement.querySelector("p:nth-of-type(4)").classList.add("popup__text--time");
  window.map.offerElement.querySelector("p:last-of-type").classList.add("popup__description");
  window.map.offerElement.querySelector("ul:last-of-type").classList.add("popup__photos");

  //Получение данных похожего объявления с Успехом
  var onSuccess = function (offer) {
    //Заполнение шаблона объявления подготовленными данными
    window.makeLodgingOffer = function (index) {
      window.map.offerElement.querySelector(".popup__title").textContent = offer[index].offer.title;
      window.map.offerElement.querySelector(".popup__text--address").children[0].textContent = offer[index].offer.address;
      window.map.offerElement.querySelector(".popup__text--price").textContent = offer[index].offer.price + "₽/ночь";
      if (offer[index].offer.type === "flat") {
        window.map.offerElement.querySelector(".popup__type").textContent = "Квартира";
        } else if (offer[index].offer.type === "bungalo") {
            window.map.offerElement.querySelector(".popup__type").textContent = "Бунгало";
        } else if (offer[index].offer.type === "house") {
            window.map.offerElement.querySelector(".popup__type").textContent = "Дом";
        } else if (offer[index].offer.type === "palace") {
            window.map.offerElement.querySelector(".popup__type").textContent = "Дворец";
        }
      window.map.offerElement.querySelector(".popup__text--capacity").textContent = offer[index].offer.rooms + " комнаты для " + offer[index].offer.guests + " гостей";
      window.map.offerElement.querySelector(".popup__text--time").textContent = "Заезд после " + offer[index].offer.checkin + ", выезд до " + offer[index].offer.checkout;
      if (offer[index].offer.features.length === 5) {
        window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
      } else if (offer[index].offer.features.length === 4) {
        window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
        window.map.offerElement.querySelector(".feature--elevator").style.display = "none";
      } else if (offer[index].offer.features.length === 3) {
        window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
        window.map.offerElement.querySelector(".feature--elevator").style.display = "none";
        window.map.offerElement.querySelector(".feature--washer").style.display = "none";
      } else if (offer[index].offer.features.length === 2) {
        window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
        window.map.offerElement.querySelector(".feature--elevator").style.display = "none";
        window.map.offerElement.querySelector(".feature--washer").style.display = "none";
        window.map.offerElement.querySelector(".feature--parking").style.display = "none";
      } else if (offer[index].offer.features.length === 1) {
        window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
        window.map.offerElement.querySelector(".feature--elevator").style.display = "none";
        window.map.offerElement.querySelector(".feature--washer").style.display = "none";
        window.map.offerElement.querySelector(".feature--parking").style.display = "none";
        window.map.offerElement.querySelector(".feature--dishwasher").style.display = "none";
      } else if (offer[index].offer.features.length === 0) {
        window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
        window.map.offerElement.querySelector(".feature--elevator").style.display = "none";
        window.map.offerElement.querySelector(".feature--washer").style.display = "none";
        window.map.offerElement.querySelector(".feature--parking").style.display = "none";
        window.map.offerElement.querySelector(".feature--dishwasher").style.display = "none";
        window.map.offerElement.querySelector(".feature--wifi").style.display = "none";
      }
      window.map.offerElement.querySelector(".popup__description").textContent = offer[index].offer.description;
      for (var i = 0; i < offer[index].offer.photos.length; i++) {
        var photosElement = window.map.offerElement.querySelector(".popup__photos").children[0].cloneNode(true);
        photosElement.querySelector("img").src = offer[index].offer.photos[i];
        window.map.offerElement.querySelector(".popup__photos").append(photosElement);
      }
      window.map.offerElement.querySelector(".popup__photos").removeChild(window.map.offerElement.querySelector(".popup__photos").children[0]);
      window.map.offerElement.querySelector(".popup__avatar").src = offer[index].author.avatar;
      //Добавление объявления во фрагмент
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.map.offerElement);
      //Отображение объявления на странице
      window.map.lodgingOffersList.insertBefore(fragment, lodgingOfferFilter);
      //Закрытие окна похожего объявления
      var ESC_KEYCODE = 27;
      var closePopupButton = window.map.offerElement.querySelector(".popup__close");
      var onPopupEscPress = function(evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          closeLodgingOfferPopup();
        }
      };
      var closeLodgingOfferPopup = function () {
        window.map.offerElement.classList.add("hidden");
        document.removeEventListener("keydown", onPopupEscPress);
        closePopupButton.removeEventListener("click", closeLodgingOfferPopup);
      };
      //Открытие окна похожего объявления
      window.map.offerElement.classList.remove("hidden");
      document.addEventListener("keydown", onPopupEscPress);
      closePopupButton.addEventListener("click", closeLodgingOfferPopup);
    };

    //Отрисовка маркеров на странице
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < offer.length; j++) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = "" + offer[j].location.x + "px";
      pinElement.style.top = "" + offer[j].location.y + "px";
      pinElement.querySelector("img").src = offer[j].author.avatar;
      pinElement.querySelector("img").alt = offer[j].offer.title;
      pinElement.classList.add("hidden");
      fragment.appendChild(pinElement);
    }
    window.map.pinsList.appendChild(fragment);
  };

  //Получение данных похожего объявления с Ошибкой
  var onError = function (errorMessage) {
    //Всплывающее сообщение об ошибке
    var message = document.createElement("div");
    message.style = "z-index: 100; width: 30%; margin: 0 auto; padding: 20px; border: 5px solid black; box-sizing: border-box; text-align: center; background-color: red; color: black";
    message.style.position = "fixed";
    message.style.top = "50%";
    message.style.left = 0;
    message.style.right = 0;
    message.style.fontSize = "30px";
    message.textContent = errorMessage;
    document.body.insertAdjacentElement("afterBegin", message);
  };

  //Наполнение шаблонов волшебника данными с сервера
  window.backend.load(onSuccess, onError);

  ///// Страница в активном состоянии /////

  window.map.mainPin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();
    var startCoodrs = {
      x: evt.clientX,
      y: evt.clientY
    };
    //Координаты острого конца главного маркера
    window.form.addressField.value = "" + (window.map.mainPin.offsetLeft + 33) + "" + ", " + (window.map.mainPin.offsetTop + 65 + 22) + "";
    //Активация карты
    window.map.lodgingOffersList.classList.remove("map--faded");
    var onMouseMove = function (evt) {
      evt.preventDefault();
      window.map.mainPin.querySelector("img").draggable = true;
      var shift = {
        x: startCoodrs.x - evt.clientX,
        y: startCoodrs.y - evt.clientY
      };
      startCoodrs = {
        x: evt.clientX,
        y: evt.clientY
      };
      if (window.map.mainPin.offsetLeft - shift.x >= 33 && window.map.mainPin.offsetLeft - shift.x <= 1169) {
        window.map.mainPin.style.left = window.map.mainPin.offsetLeft - shift.x + "px";
      }
      if (window.map.mainPin.offsetTop - shift.y >= 130 && window.map.mainPin.offsetTop - shift.y <= 630) {
        window.map.mainPin.style.top = window.map.mainPin.offsetTop - shift.y + "px";
      }
      window.map.mainPin.style.left = window.map.mainPin.offsetLeft + "px";
      window.map.mainPin.style.top = window.map.mainPin.offsetTop + "px";
      //Координаты острого конца главного маркера
      window.form.addressField.value = "" + (window.map.mainPin.offsetLeft + 33) + "" + ", " + (window.map.mainPin.offsetTop + 65 + 22) + "";
    };

    var onMouseUp = function (evt) {
      evt.preventDefault();
      window.map.mainPin.querySelector("img").draggable = false;
      //Активация поля формы объявления
      window.form.lodgingOfferForm.classList.remove("notice__form--disabled");
      window.form.formHeader.disabled = false;
      for (var i = 0; i < window.form.formBlocks.length; i++) {
        window.form.formBlocks[i].disabled = false;
      }
      //Отображение маркеров похожих объявлений
      for (var j = 0; j < window.map.pinsList.children.length; j++) {
        if (window.map.pinsList.children[j].hasAttribute("style")) {
          window.map.pinsList.children[j].classList.remove("hidden");
        }
      }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  //Показ похожего объявления по клику
      window.map.pinsList.addEventListener("click", function(evt) {
        var target = evt.target;
        while (target != this) {
          if (target.hasAttribute("style")) {
            if (target === window.map.pinsList.children[2]) {
              window.makeLodgingOffer(0);
            } else if (target === window.map.pinsList.children[3]) {
              window.makeLodgingOffer(1);
            } else if (target === window.map.pinsList.children[4]) {
              window.makeLodgingOffer(2);
            } else if (target === window.map.pinsList.children[5]) {
              window.makeLodgingOffer(3);
            } else if (target === window.map.pinsList.children[6]) {
              window.makeLodgingOffer(4);
            } else if (target === window.map.pinsList.children[7]) {
              window.makeLodgingOffer(5);
            } else if (target === window.map.pinsList.children[8]) {
              window.makeLodgingOffer(6);
            } else if (target === window.map.pinsList.children[9]) {
              window.makeLodgingOffer(7);
            } else if (target === window.map.pinsList.children[10]) {
              window.makeLodgingOffer(8);
            } else if (target === window.map.pinsList.children[11]) {
              window.makeLodgingOffer(9);
            }
          }
          target = target.parentNode;
        }
      });
})();
