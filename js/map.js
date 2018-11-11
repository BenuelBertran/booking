/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

//Временно включаем активный режим окна выбора жилья
document.querySelector(".map").classList.remove("map--faded");


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
      features: getRandomLength(cloneArray(longingFeatures), 1, 6),
      description: "",
      photos: shuffle(cloneArray(lodgingPhotos))
    },
    location: {
      x: Math.ceil(getRandom(1, 1200)),
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
      features: getRandomLength(cloneArray(longingFeatures), 1, 6),
      description: "",
      photos: shuffle(cloneArray(lodgingPhotos))
    },
    location: {
      x: Math.ceil(getRandom(1, 1200)),
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
      features: getRandomLength(cloneArray(longingFeatures), 1, 6),
      description: "",
      photos: shuffle(cloneArray(lodgingPhotos))
    },
    location: {
      x: Math.ceil(getRandom(1, 1200)),
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
      features: getRandomLength(cloneArray(longingFeatures), 1, 6),
      description: "",
      photos: shuffle(cloneArray(lodgingPhotos))
    },
    location: {
      x: Math.ceil(getRandom(1, 1200)),
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
      features: getRandomLength(cloneArray(longingFeatures), 1, 6),
      description: "",
      photos: shuffle(cloneArray(lodgingPhotos))
    },
    location: {
      x: Math.ceil(getRandom(1, 1200)),
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
      features: getRandomLength(cloneArray(longingFeatures), 1, 6),
      description: "",
      photos: shuffle(cloneArray(lodgingPhotos))
    },
    location: {
      x: Math.ceil(getRandom(1, 1200)),
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
      features: getRandomLength(cloneArray(longingFeatures), 1, 6),
      description: "",
      photos: shuffle(cloneArray(lodgingPhotos))
    },
    location: {
      x: Math.ceil(getRandom(1, 1200)),
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
      features: getRandomLength(cloneArray(longingFeatures), 1, 6),
      description: "",
      photos: shuffle(cloneArray(lodgingPhotos))
    },
    location: {
      x: Math.ceil(getRandom(1, 1200)),
      y: Math.ceil(getRandom(130, 630))
    }
  }
];
console.log (lodgingOffers);
