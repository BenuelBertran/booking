/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

//Временно включаем активный режим окна выбора жилья
document.querySelector(".map").classList.remove("map--faded");


//Получение случайного числа от 1 до 8
var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

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

//longingFeatures.length = Math.ceil(getRandom(1, 6));

//Объявления
var lodgingOffers = [
  {
    author: {
      avatar: "img/avatars/user0" + Math.ceil(getRandom(1, 8)) + ".png"
    },
    offer: {
      title: offerTitles[Math.floor(getRandom(1, 8))],
      address: "" + Math.ceil(getRandom(1, 1000)) + ", " + Math.ceil(getRandom(1, 1000)) + "",
      price: Math.ceil(getRandom(0.1, 1000000) + 999),
      type: longingTypes[Math.floor(getRandom(1, 4))],
      rooms: Math.ceil(getRandom(1, 5)),
      guests: Math.ceil(getRandom(1, 10)),
      checkin: checkinTime[Math.floor(getRandom(1, 3))],
      checkout: checkoutTime[Math.floor(getRandom(1, 3))],
      features: longingFeatures
    },
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {}
];
console.log (lodgingOffers);
