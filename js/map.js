/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";


///// Переменные /////


//Список объявлений
var lodgingOffersList = document.querySelector(".map");
//Список маркеров объявлений
var pinsList = document.querySelector(".map__pins");
//Главный маркер
var mainPin = lodgingOffersList.querySelector(".map__pin--main");
//Шаблон маркера объявления
var pinTemplate = document.querySelector("template").content.querySelector(".map__pin");
//Форма объявления
var lodgingOfferForm = document.querySelector(".notice__form");
//Шапка формы объявлений
var formHeader = lodgingOfferForm.querySelector(".notice__header");
//Блоки формы объявлений
var formBlocks = lodgingOfferForm.querySelectorAll(".form__element");
//Поле Адрес формы объявления
var addressField = document.getElementById("address");
//Блок с фильтром объявлений
var lodgingOfferFilter = document.querySelector(".map__filters-container");
//Шаблон объявления
var offerTemplate = document.querySelector("template").content.querySelector(".map__card");
//Независимая копия шаблона объявления
var offerElement = offerTemplate.cloneNode(true);


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
      x: Math.ceil(getRandom(21, 1174)),
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
      x: Math.ceil(getRandom(21, 1174)),
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
      x: Math.ceil(getRandom(21, 1174)),
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
      x: Math.ceil(getRandom(21, 1174)),
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
      x: Math.ceil(getRandom(21, 1174)),
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
      x: Math.ceil(getRandom(21, 1174)),
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
      x: Math.ceil(getRandom(21, 1174)),
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
      x: Math.ceil(getRandom(21, 1174)),
      y: Math.ceil(getRandom(130, 630))
    }
  }
];

//Добавление недостающих классов в шаблон объявления
offerElement.querySelector("h3").classList.add("popup__title");
offerElement.querySelector("p:first-of-type").classList.add("popup__text--address");
offerElement.querySelector("p:nth-of-type(2)").classList.add("popup__text--price");
offerElement.querySelector("h4").classList.add("popup__type");
offerElement.querySelector("p:nth-of-type(3)").classList.add("popup__text--capacity");
offerElement.querySelector("p:nth-of-type(4)").classList.add("popup__text--time");
offerElement.querySelector("p:last-of-type").classList.add("popup__description");
offerElement.querySelector("ul:last-of-type").classList.add("popup__photos");

//Заполнение шаблона объявления подготовленными данными
var makeLodgingOffer = function (index) {
  offerElement.querySelector(".popup__title").textContent = lodgingOffers[index].offer.title;
  offerElement.querySelector(".popup__text--address").children[0].textContent = lodgingOffers[index].offer.address;
  offerElement.querySelector(".popup__text--price").textContent = lodgingOffers[index].offer.price + "₽/ночь";
  if (lodgingOffers[index].offer.type === "flat") {
    offerElement.querySelector(".popup__type").textContent = "Квартира";
    } else if (lodgingOffers[index].offer.type === "bungalo") {
        offerElement.querySelector(".popup__type").textContent = "Бунгало";
    } else if (lodgingOffers[index].offer.type === "house") {
        offerElement.querySelector(".popup__type").textContent = "Дом";
    } else if (lodgingOffers[index].offer.type === "palace") {
        offerElement.querySelector(".popup__type").textContent = "Дворец";
    }
  offerElement.querySelector(".popup__text--capacity").textContent = lodgingOffers[index].offer.rooms + " комнаты для " + lodgingOffers[index].offer.guests + " гостей";
  offerElement.querySelector(".popup__text--time").textContent = "Заезд после " + lodgingOffers[index].offer.checkin + ", выезд до " + lodgingOffers[index].offer.checkout;

  if (lodgingOffers[index].offer.features.length === 5) {
    offerElement.querySelector(".feature--conditioner").style.display = "none";
  } else if (lodgingOffers[index].offer.features.length === 4) {
    offerElement.querySelector(".feature--conditioner").style.display = "none";
    offerElement.querySelector(".feature--elevator").style.display = "none";
  } else if (lodgingOffers[index].offer.features.length === 3) {
    offerElement.querySelector(".feature--conditioner").style.display = "none";
    offerElement.querySelector(".feature--elevator").style.display = "none";
    offerElement.querySelector(".feature--washer").style.display = "none";
  } else if (lodgingOffers[index].offer.features.length === 2) {
    offerElement.querySelector(".feature--conditioner").style.display = "none";
    offerElement.querySelector(".feature--elevator").style.display = "none";
    offerElement.querySelector(".feature--washer").style.display = "none";
    offerElement.querySelector(".feature--parking").style.display = "none";
  } else if (lodgingOffers[index].offer.features.length === 1) {
    offerElement.querySelector(".feature--conditioner").style.display = "none";
    offerElement.querySelector(".feature--elevator").style.display = "none";
    offerElement.querySelector(".feature--washer").style.display = "none";
    offerElement.querySelector(".feature--parking").style.display = "none";
    offerElement.querySelector(".feature--dishwasher").style.display = "none";
  } else if (lodgingOffers[index].offer.features.length === 0) {
    offerElement.querySelector(".feature--conditioner").style.display = "none";
    offerElement.querySelector(".feature--elevator").style.display = "none";
    offerElement.querySelector(".feature--washer").style.display = "none";
    offerElement.querySelector(".feature--parking").style.display = "none";
    offerElement.querySelector(".feature--dishwasher").style.display = "none";
    offerElement.querySelector(".feature--wifi").style.display = "none";
  }
  offerElement.querySelector(".popup__description").textContent = lodgingOffers[index].offer.description;
  for (var i = 0; i < lodgingOffers[index].offer.photos.length; i++) {
    var photosElement = offerElement.querySelector(".popup__photos").children[0].cloneNode(true);
    photosElement.querySelector("img").src = lodgingOffers[index].offer.photos[i];

    offerElement.querySelector(".popup__photos").append(photosElement);
  }
  offerElement.querySelector(".popup__photos").removeChild(offerElement.querySelector(".popup__photos").children[0]);
  offerElement.querySelector(".popup__avatar").src = lodgingOffers[index].author.avatar;

  //Отображение объявления на странице
    lodgingOffersList.insertBefore(offerElement, lodgingOfferFilter);
};

//Отрисовка маркеров на странице
for (var j = 0; j < lodgingOffers.length; j++) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = "" + lodgingOffers[j].location.x + "px";
  pinElement.style.top = "" + lodgingOffers[j].location.y + "px";
  pinElement.querySelector("img").src = lodgingOffers[j].author.avatar;
  pinElement.querySelector("img").alt = lodgingOffers[j].offer.title;
  pinElement.classList.add("hidden");
  pinsList.appendChild(pinElement);
}


///// Страница в неактивном состоянии /////


//Состояние неактивной страницы
formHeader.disabled = true;
for (var i = 0; i < formBlocks.length; i++) {
  formBlocks[i].disabled = true;
}
//Адрес главного маркера (без указателя)
addressField.placeholder = "600" + ", 375";


///// Страница в активном состоянии /////


//Состояние активной страницы
var onPinMoved = function() {
  //Отключение невидимости полей
  lodgingOffersList.classList.remove("map--faded");
  lodgingOfferForm.classList.remove("notice__form--disabled");
  formHeader.disabled = false;
  for (var i = 0; i < formBlocks.length; i++) {
    formBlocks[i].disabled = false;
  }
  for (var j = 0; j < pinsList.children.length; j++) {
    if (pinsList.children[j].hasAttribute("style")) {
      pinsList.children[j].classList.remove("hidden");
    }
  }
  //Адрес главного маркера с указателем
  addressField.placeholder = "600" + ", 428";
};

//Активация страницы
mainPin.addEventListener("mouseup", onPinMoved);

//Показ похожего объявления по клику
pinsList.addEventListener("click", function(evt) {
  var target = evt.target;
  while (target != this) {
    if (target.hasAttribute("style")) {
      if (target === pinsList.children[2]) {
        makeLodgingOffer(0);
      } else if (target === pinsList.children[3]) {
        makeLodgingOffer(1);
      } else if (target === pinsList.children[4]) {
        makeLodgingOffer(2);
      } else if (target === pinsList.children[5]) {
        makeLodgingOffer(3);
      } else if (target === pinsList.children[6]) {
        makeLodgingOffer(4);
      } else if (target === pinsList.children[7]) {
        makeLodgingOffer(5);
      } else if (target === pinsList.children[8]) {
        makeLodgingOffer(6);
      } else if (target === pinsList.children[9]) {
        makeLodgingOffer(7);
      }
    }
    target = target.parentNode;
  }
});


//===========================================

var lodgingOfferTitle = document.getElementById("title");
var lodgingOfferPrice = document.getElementById("price");
var lodgingOfferTimein = document.getElementById("timein");
var lodgingOfferTimeout = document.getElementById("timeout");
var lodgingOfferType = document.getElementById("type");

lodgingOfferForm.action = "https://js.dump.academy/keksobooking";

lodgingOfferTitle.required = true;
lodgingOfferTitle.setAttribute("minlength", "30");
lodgingOfferTitle.setAttribute("maxlength", "100");

lodgingOfferPrice.required = true;
lodgingOfferPrice.max = 1000000;

addressField.disabled = true;

//var minPrice = [
//  "0",
//  "1000",
//  "5000",
//  "10000"
//];
//for (var i = 0; i < lodgingOfferType.children.length; i++) {
//  if (lodgingOfferType.children[i].hasAttribute("selected")) {
//    lodgingOfferType.min = minPrice[i];
//    lodgingOfferType.placeholder = minPrice[i];
//  }
//}
