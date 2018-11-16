/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

////////// Карта Токио с объявлениями о сдаче жилья //////////

(function() {
  ///// Локальные переменные /////

  //Блок с фильтром объявлений
  var lodgingOfferFilter = document.querySelector(".map__filters-container");
  //Шаблон маркера объявления
  var pinTemplate = document.querySelector("template").content.querySelector(".map__pin");
  //Шаблон объявления
  var offerTemplate = document.querySelector("template").content.querySelector(".map__card");

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
    offerElement: offerTemplate.cloneNode(true)
  };





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


  ///// Данные /////


  //Заголовки объявлений
  var offerTitles = [
    "Большая уютная квартира",
    "Маленькая неуютная квартира",
    "Огромный прекрасный дворец",
    "Маленький ужасный дворец",
    "Красивый гостевой домик",
    "Некрасивый негостеприимный домик",
    "Уютное бунгало далеко от моря",
    "Неуютное бунгало по колено в воде"
  ];

  //Тип жилья
  var longingTypes = [
    "palace",
    "flat",
    "house",
    "bungalo"
  ];

  //Время заезда
  var checkinTime = [
    "12:00",
    "13:00",
    "14:00"
  ];

  //Время выезда
  var checkoutTime = [
    "12:00",
    "13:00",
    "14:00"
  ];

  //Список удобств
  var longingFeatures = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner"
  ];

  //Фотографии жилья
  var lodgingPhotos = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  ];


  ///// Шаблоны /////


  //Объявления
  var lodgingOffers = [
    {
      author: {
        avatar: "img/avatars/user0" + Math.round(getRandom(1, 8)) + ".png"
      },
      offer: {
        title: offerTitles[Math.floor(getRandom(0, 8))],
        address: "" + Math.ceil(getRandom(1, 1000)) + ", " + Math.ceil(getRandom(1, 1000)) + "",
        price: Math.ceil(getRandom(1, 1000000)),
        type: longingTypes[Math.floor(getRandom(0, 4))],
        rooms: Math.round(getRandom(1, 5)),
        guests: Math.round(getRandom(1, 10)),
        checkin: checkinTime[Math.floor(getRandom(0, 3))],
        checkout: checkoutTime[Math.floor(getRandom(0, 3))],
        features: getRandomLength(cloneArray(longingFeatures), 0, 6),
        description: "",
        photos: shuffle(cloneArray(lodgingPhotos))
      },
      location: {
        x: Math.ceil(getRandom(33, 1169)),
        y: Math.ceil(getRandom(130, 630))
      }
    },
    {
      author: {
        avatar: "img/avatars/user0" + Math.ceil(getRandom(1, 8)) + ".png"
      },
      offer: {
        title: offerTitles[Math.floor(getRandom(0, 8))],
        address: "" + Math.ceil(getRandom(1, 1000)) + ", " + Math.ceil(getRandom(1, 1000)) + "",
        price: Math.ceil(getRandom(1, 1000000)),
        type: longingTypes[Math.floor(getRandom(0, 4))],
        rooms: Math.round(getRandom(1, 5)),
        guests: Math.round(getRandom(1, 10)),
        checkin: checkinTime[Math.floor(getRandom(0, 3))],
        checkout: checkoutTime[Math.floor(getRandom(0, 3))],
        features: getRandomLength(cloneArray(longingFeatures), 0, 6),
        description: "",
        photos: shuffle(cloneArray(lodgingPhotos))
      },
      location: {
        x: Math.ceil(getRandom(33, 1169)),
        y: Math.ceil(getRandom(130, 630))
      }
    },
    {
      author: {
        avatar: "img/avatars/user0" + Math.ceil(getRandom(1, 8)) + ".png"
      },
      offer: {
        title: offerTitles[Math.floor(getRandom(0, 8))],
        address: "" + Math.ceil(getRandom(1, 1000)) + ", " + Math.ceil(getRandom(1, 1000)) + "",
        price: Math.ceil(getRandom(1, 1000000)),
        type: longingTypes[Math.floor(getRandom(0, 4))],
        rooms: Math.round(getRandom(1, 5)),
        guests: Math.round(getRandom(1, 10)),
        checkin: checkinTime[Math.floor(getRandom(0, 3))],
        checkout: checkoutTime[Math.floor(getRandom(0, 3))],
        features: getRandomLength(cloneArray(longingFeatures), 0, 6),
        description: "",
        photos: shuffle(cloneArray(lodgingPhotos))
      },
      location: {
        x: Math.ceil(getRandom(33, 1169)),
        y: Math.ceil(getRandom(130, 630))
      }
    },
    {
      author: {
        avatar: "img/avatars/user0" + Math.ceil(getRandom(1, 8)) + ".png"
      },
      offer: {
        title: offerTitles[Math.floor(getRandom(0, 8))],
        address: "" + Math.ceil(getRandom(1, 1000)) + ", " + Math.ceil(getRandom(1, 1000)) + "",
        price: Math.ceil(getRandom(1, 1000000)),
        type: longingTypes[Math.floor(getRandom(0, 4))],
        rooms: Math.round(getRandom(1, 5)),
        guests: Math.round(getRandom(1, 10)),
        checkin: checkinTime[Math.floor(getRandom(0, 3))],
        checkout: checkoutTime[Math.floor(getRandom(0, 3))],
        features: getRandomLength(cloneArray(longingFeatures), 0, 6),
        description: "",
        photos: shuffle(cloneArray(lodgingPhotos))
      },
      location: {
        x: Math.ceil(getRandom(33, 1169)),
        y: Math.ceil(getRandom(130, 630))
      }
    },
    {
      author: {
        avatar: "img/avatars/user0" + Math.ceil(getRandom(1, 8)) + ".png"
      },
      offer: {
        title: offerTitles[Math.floor(getRandom(0, 8))],
        address: "" + Math.ceil(getRandom(1, 1000)) + ", " + Math.ceil(getRandom(1, 1000)) + "",
        price: Math.ceil(getRandom(1, 1000000)),
        type: longingTypes[Math.floor(getRandom(0, 4))],
        rooms: Math.round(getRandom(1, 5)),
        guests: Math.round(getRandom(1, 10)),
        checkin: checkinTime[Math.floor(getRandom(0, 3))],
        checkout: checkoutTime[Math.floor(getRandom(0, 3))],
        features: getRandomLength(cloneArray(longingFeatures), 0, 6),
        description: "",
        photos: shuffle(cloneArray(lodgingPhotos))
      },
      location: {
        x: Math.ceil(getRandom(33, 1169)),
        y: Math.ceil(getRandom(130, 630))
      }
    },
    {
      author: {
        avatar: "img/avatars/user0" + Math.ceil(getRandom(1, 8)) + ".png"
      },
      offer: {
        title: offerTitles[Math.floor(getRandom(0, 8))],
        address: "" + Math.ceil(getRandom(1, 1000)) + ", " + Math.ceil(getRandom(1, 1000)) + "",
        price: Math.ceil(getRandom(1, 1000000)),
        type: longingTypes[Math.floor(getRandom(0, 4))],
        rooms: Math.round(getRandom(1, 5)),
        guests: Math.round(getRandom(1, 10)),
        checkin: checkinTime[Math.floor(getRandom(0, 3))],
        checkout: checkoutTime[Math.floor(getRandom(0, 3))],
        features: getRandomLength(cloneArray(longingFeatures), 0, 6),
        description: "",
        photos: shuffle(cloneArray(lodgingPhotos))
      },
      location: {
        x: Math.ceil(getRandom(33, 1169)),
        y: Math.ceil(getRandom(130, 630))
      }
    },
    {
      author: {
        avatar: "img/avatars/user0" + Math.ceil(getRandom(1, 8)) + ".png"
      },
      offer: {
        title: offerTitles[Math.floor(getRandom(0, 8))],
        address: "" + Math.ceil(getRandom(1, 1000)) + ", " + Math.ceil(getRandom(1, 1000)) + "",
        price: Math.ceil(getRandom(1, 1000000)),
        type: longingTypes[Math.floor(getRandom(0, 4))],
        rooms: Math.round(getRandom(1, 5)),
        guests: Math.round(getRandom(1, 10)),
        checkin: checkinTime[Math.floor(getRandom(0, 3))],
        checkout: checkoutTime[Math.floor(getRandom(0, 3))],
        features: getRandomLength(cloneArray(longingFeatures), 0, 6),
        description: "",
        photos: shuffle(cloneArray(lodgingPhotos))
      },
      location: {
        x: Math.ceil(getRandom(33, 1169)),
        y: Math.ceil(getRandom(130, 630))
      }
    },
    {
      author: {
        avatar: "img/avatars/user0" + Math.ceil(getRandom(1, 8)) + ".png"
      },
      offer: {
        title: offerTitles[Math.floor(getRandom(0, 8))],
        address: "" + Math.ceil(getRandom(1, 1000)) + ", " + Math.ceil(getRandom(1, 1000)) + "",
        price: Math.ceil(getRandom(1, 1000000)),
        type: longingTypes[Math.floor(getRandom(0, 4))],
        rooms: Math.round(getRandom(1, 5)),
        guests: Math.round(getRandom(1, 10)),
        checkin: checkinTime[Math.floor(getRandom(0, 3))],
        checkout: checkoutTime[Math.floor(getRandom(0, 3))],
        features: getRandomLength(cloneArray(longingFeatures), 0, 6),
        description: "",
        photos: shuffle(cloneArray(lodgingPhotos))
      },
      location: {
        x: Math.ceil(getRandom(33, 1169)),
        y: Math.ceil(getRandom(130, 630))
      }
    }
  ];

  //Добавление недостающих классов в шаблон объявления
  window.map.offerElement.querySelector("h3").classList.add("popup__title");
  window.map.offerElement.querySelector("p:first-of-type").classList.add("popup__text--address");
  window.map.offerElement.querySelector("p:nth-of-type(2)").classList.add("popup__text--price");
  window.map.offerElement.querySelector("h4").classList.add("popup__type");
  window.map.offerElement.querySelector("p:nth-of-type(3)").classList.add("popup__text--capacity");
  window.map.offerElement.querySelector("p:nth-of-type(4)").classList.add("popup__text--time");
  window.map.offerElement.querySelector("p:last-of-type").classList.add("popup__description");
  window.map.offerElement.querySelector("ul:last-of-type").classList.add("popup__photos");

  //Заполнение шаблона объявления подготовленными данными
  var makeLodgingOffer = function (index) {
    window.map.offerElement.querySelector(".popup__title").textContent = lodgingOffers[index].offer.title;
    window.map.offerElement.querySelector(".popup__text--address").children[0].textContent = lodgingOffers[index].offer.address;
    window.map.offerElement.querySelector(".popup__text--price").textContent = lodgingOffers[index].offer.price + "₽/ночь";
    if (lodgingOffers[index].offer.type === "flat") {
      window.map.offerElement.querySelector(".popup__type").textContent = "Квартира";
      } else if (lodgingOffers[index].offer.type === "bungalo") {
          window.map.offerElement.querySelector(".popup__type").textContent = "Бунгало";
      } else if (lodgingOffers[index].offer.type === "house") {
          window.map.offerElement.querySelector(".popup__type").textContent = "Дом";
      } else if (lodgingOffers[index].offer.type === "palace") {
          window.map.offerElement.querySelector(".popup__type").textContent = "Дворец";
      }
    window.map.offerElement.querySelector(".popup__text--capacity").textContent = lodgingOffers[index].offer.rooms + " комнаты для " + lodgingOffers[index].offer.guests + " гостей";
    window.map.offerElement.querySelector(".popup__text--time").textContent = "Заезд после " + lodgingOffers[index].offer.checkin + ", выезд до " + lodgingOffers[index].offer.checkout;

    if (lodgingOffers[index].offer.features.length === 5) {
      window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
    } else if (lodgingOffers[index].offer.features.length === 4) {
      window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
      window.map.offerElement.querySelector(".feature--elevator").style.display = "none";
    } else if (lodgingOffers[index].offer.features.length === 3) {
      window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
      window.map.offerElement.querySelector(".feature--elevator").style.display = "none";
      window.map.offerElement.querySelector(".feature--washer").style.display = "none";
    } else if (lodgingOffers[index].offer.features.length === 2) {
      window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
      window.map.offerElement.querySelector(".feature--elevator").style.display = "none";
      window.map.offerElement.querySelector(".feature--washer").style.display = "none";
      window.map.offerElement.querySelector(".feature--parking").style.display = "none";
    } else if (lodgingOffers[index].offer.features.length === 1) {
      window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
      window.map.offerElement.querySelector(".feature--elevator").style.display = "none";
      window.map.offerElement.querySelector(".feature--washer").style.display = "none";
      window.map.offerElement.querySelector(".feature--parking").style.display = "none";
      window.map.offerElement.querySelector(".feature--dishwasher").style.display = "none";
    } else if (lodgingOffers[index].offer.features.length === 0) {
      window.map.offerElement.querySelector(".feature--conditioner").style.display = "none";
      window.map.offerElement.querySelector(".feature--elevator").style.display = "none";
      window.map.offerElement.querySelector(".feature--washer").style.display = "none";
      window.map.offerElement.querySelector(".feature--parking").style.display = "none";
      window.map.offerElement.querySelector(".feature--dishwasher").style.display = "none";
      window.map.offerElement.querySelector(".feature--wifi").style.display = "none";
    }
    window.map.offerElement.querySelector(".popup__description").textContent = lodgingOffers[index].offer.description;
    for (var i = 0; i < lodgingOffers[index].offer.photos.length; i++) {
      var photosElement = window.map.offerElement.querySelector(".popup__photos").children[0].cloneNode(true);
      photosElement.querySelector("img").src = lodgingOffers[index].offer.photos[i];

      window.map.offerElement.querySelector(".popup__photos").append(photosElement);
    }
    window.map.offerElement.querySelector(".popup__photos").removeChild(window.map.offerElement.querySelector(".popup__photos").children[0]);
    window.map.offerElement.querySelector(".popup__avatar").src = lodgingOffers[index].author.avatar;

    //Отображение объявления на странице
      window.map.lodgingOffersList.insertBefore(window.map.offerElement, lodgingOfferFilter);


    var ESC_KEYCODE = 27;
    var closePopupButton = window.map.offerElement.querySelector(".popup__close");
    var onPopupEscPress = function(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeLodgingOfferPopup();
      }
    };

    //Закрытие окна похожего объявления
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
  for (var j = 0; j < lodgingOffers.length; j++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = "" + lodgingOffers[j].location.x + "px";
    pinElement.style.top = "" + lodgingOffers[j].location.y + "px";
    pinElement.querySelector("img").src = lodgingOffers[j].author.avatar;
    pinElement.querySelector("img").alt = lodgingOffers[j].offer.title;
    pinElement.classList.add("hidden");
    window.map.pinsList.appendChild(pinElement);
  }








  ///// Страница в неактивном состоянии /////


  window.form.formHeader.disabled = true;
  for (var i = 0; i < window.form.formBlocks.length; i++) {
    window.form.formBlocks[i].disabled = true;
  }
  //Адрес главного маркера (без указателя)
  window.form.addressField.placeholder = "633" + ", 408";


  ///// Страница в активном состоянии /////

  window.map.mainPin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();
    var startCoodrs = {
      x: evt.clientX,
      y: evt.clientY
    };

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
      window.form.addressField.placeholder = "" + (window.map.mainPin.offsetLeft + 33) + "" + ", " + (window.map.mainPin.offsetTop + 65 + 22) + "";
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

      //Координаты острого конца главного маркера
      window.form.addressField.placeholder = "" + (window.map.mainPin.offsetLeft + 33) + "" + ", " + (window.map.mainPin.offsetTop + 65 + 22) + "";

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
          makeLodgingOffer(0);
        } else if (target === window.map.pinsList.children[3]) {
          makeLodgingOffer(1);
        } else if (target === window.map.pinsList.children[4]) {
          makeLodgingOffer(2);
        } else if (target === window.map.pinsList.children[5]) {
          makeLodgingOffer(3);
        } else if (target === window.map.pinsList.children[6]) {
          makeLodgingOffer(4);
        } else if (target === window.map.pinsList.children[7]) {
          makeLodgingOffer(5);
        } else if (target === window.map.pinsList.children[8]) {
          makeLodgingOffer(6);
        } else if (target === window.map.pinsList.children[9]) {
          makeLodgingOffer(7);
        }
      }
      target = target.parentNode;
    }
  });
})();
