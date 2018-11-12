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

//Список маркеров объявлений
var pinsList = document.querySelector(".map__pins");

//Маркер объявления (шаблон)
var pinTemplate = document.querySelector("template").content.querySelector(".map__pin");

for (var i = 0; i < lodgingOffers.length; i++) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = "" + lodgingOffers[i].location.x + "px";
  pinElement.style.top = "" + lodgingOffers[i].location.y + "px";
  pinElement.querySelector("img").src = lodgingOffers[i].author.avatar;
  pinElement.querySelector("img").alt = lodgingOffers[i].offer.title;

  pinsList.appendChild(pinElement);
}

//Список объявлений
var lodgingOffersList = document.querySelector(".map");

//Блок с фильтром объявлений
var lodgingOfferFilter = document.querySelector(".map__filters-container");

//Шаблон объявления
var offerTemplate = document.querySelector("template").content.querySelector(".map__card");

//Независимая копия шаблона объявления
var offerElement = offerTemplate.cloneNode(true);

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
offerElement.querySelector(".popup__title").textContent = lodgingOffers[0].offer.title;
offerElement.querySelector(".popup__text--address").children[0].textContent = lodgingOffers[0].offer.address;
offerElement.querySelector(".popup__text--price").textContent = lodgingOffers[0].offer.price + "₽/ночь";
if (lodgingOffers[0].offer.type === "flat") {
  offerElement.querySelector(".popup__type").textContent = "Квартира";
  } else if (lodgingOffers[0].offer.type === "bungalo") {
      offerElement.querySelector(".popup__type").textContent = "Бунгало";
  } else if (lodgingOffers[0].offer.type === "house") {
      offerElement.querySelector(".popup__type").textContent = "Дом";
  } else if (lodgingOffers[0].offer.type === "palace") {
      offerElement.querySelector(".popup__type").textContent = "Дворец";
  }
offerElement.querySelector(".popup__text--capacity").textContent = lodgingOffers[0].offer.rooms + " комнаты для " + lodgingOffers[0].offer.guests + " гостей";
offerElement.querySelector(".popup__text--time").textContent = "Заезд после " + lodgingOffers[0].offer.checkin + ", выезд до " + lodgingOffers[0].offer.checkout;

if (lodgingOffers[0].offer.features.length === 5) {
  offerElement.querySelector(".feature--conditioner").style.display = "none";
} else if (lodgingOffers[0].offer.features.length === 4) {
  offerElement.querySelector(".feature--conditioner").style.display = "none";
  offerElement.querySelector(".feature--elevator").style.display = "none";
} else if (lodgingOffers[0].offer.features.length === 3) {
  offerElement.querySelector(".feature--conditioner").style.display = "none";
  offerElement.querySelector(".feature--elevator").style.display = "none";
  offerElement.querySelector(".feature--washer").style.display = "none";
} else if (lodgingOffers[0].offer.features.length === 2) {
  offerElement.querySelector(".feature--conditioner").style.display = "none";
  offerElement.querySelector(".feature--elevator").style.display = "none";
  offerElement.querySelector(".feature--washer").style.display = "none";
  offerElement.querySelector(".feature--parking").style.display = "none";
} else if (lodgingOffers[0].offer.features.length === 1) {
  offerElement.querySelector(".feature--conditioner").style.display = "none";
  offerElement.querySelector(".feature--elevator").style.display = "none";
  offerElement.querySelector(".feature--washer").style.display = "none";
  offerElement.querySelector(".feature--parking").style.display = "none";
  offerElement.querySelector(".feature--dishwasher").style.display = "none";
} else if (lodgingOffers[0].offer.features.length === 0) {
  offerElement.querySelector(".feature--conditioner").style.display = "none";
  offerElement.querySelector(".feature--elevator").style.display = "none";
  offerElement.querySelector(".feature--washer").style.display = "none";
  offerElement.querySelector(".feature--parking").style.display = "none";
  offerElement.querySelector(".feature--dishwasher").style.display = "none";
  offerElement.querySelector(".feature--wifi").style.display = "none";
}
offerElement.querySelector(".popup__description").textContent = lodgingOffers[0].offer.description;

for (var i = 0; i < lodgingOffers[0].offer.photos.length; i++) {
  var photosElement = offerElement.querySelector(".popup__photos").children[0].cloneNode(true);
  photosElement.querySelector("img").src = lodgingOffers[0].offer.photos[i];

  offerElement.querySelector(".popup__photos").append(photosElement);
}
offerElement.querySelector(".popup__photos").removeChild(offerElement.querySelector(".popup__photos").children[0]);
offerElement.querySelector(".popup__avatar").src = lodgingOffers[0].author.avatar;


//Добавление готового шаблона объявления на страницу
lodgingOffersList.insertBefore(offerElement, lodgingOfferFilter);
