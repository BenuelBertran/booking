/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

////////// КАРТА С ОБЪЯВЛЕНИЯМИ //////////

(function() {
  //----------> Локальные переменные

  //Фильтр по типу жилья
  var typeFilter = document.getElementById("housing-type");
  //Фильтр по цене
  var priceFilter = document.getElementById("housing-price");
  //Фильтр по количеству комнат
  var roomsFilter = document.getElementById("housing-rooms");
  //Фильтр по количеству жильцов
  var capacityFilter = document.getElementById("housing-guests");
  //Фильтр по виду удобств
  var featuresFilter = document.getElementById("housing-features");

  //----------> Глобальные переменные

  window.map = {
    //Карта жилья
    lodgingOffersList: document.querySelector(".map"),
    //Блок с фильтром объявлений
    lodgingOfferFilter: document.querySelector(".map__filters-container")
  };

  //----------> Активация страницы

  window.pins.mainPin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();
    var startCoodrs = {
      x: evt.clientX,
      y: evt.clientY
    };
    //Координаты острого конца главного маркера
    window.form.addressField.value = "" + (window.pins.mainPin.offsetLeft + 33) + "" + ", " + (window.pins.mainPin.offsetTop + 65 + 22) + "";
    //Активация карты
    window.map.lodgingOffersList.classList.remove("map--faded");
    var onMouseMove = function (evt) {
      evt.preventDefault();
      window.pins.mainPin.querySelector("img").draggable = true;
      var shift = {
        x: startCoodrs.x - evt.clientX,
        y: startCoodrs.y - evt.clientY
      };
      startCoodrs = {
        x: evt.clientX,
        y: evt.clientY
      };
      if (window.pins.mainPin.offsetLeft - shift.x >= 33 && window.pins.mainPin.offsetLeft - shift.x <= 1169) {
        window.pins.mainPin.style.left = window.pins.mainPin.offsetLeft - shift.x + "px";
      }
      if (window.pins.mainPin.offsetTop - shift.y >= 130 && window.pins.mainPin.offsetTop - shift.y <= 630) {
        window.pins.mainPin.style.top = window.pins.mainPin.offsetTop - shift.y + "px";
      }
      window.pins.mainPin.style.left = window.pins.mainPin.offsetLeft + "px";
      window.pins.mainPin.style.top = window.pins.mainPin.offsetTop + "px";
      //Координаты острого конца главного маркера
      window.form.addressField.value = "" + (window.pins.mainPin.offsetLeft + 33) + "" + ", " + (window.pins.mainPin.offsetTop + 65 + 22) + "";
    };
    var onMouseUp = function (evt) {
      evt.preventDefault();
      window.pins.mainPin.querySelector("img").draggable = false;
      //Активация поля формы объявления
      window.form.lodgingOfferForm.classList.remove("notice__form--disabled");
      window.form.formHeader.disabled = false;
      window.form.formBlocks.forEach(function(block) {
        block.disabled = false;
      });
      //Отображение маркеров похожих объявлений
      for (var i = 2; i < window.pins.pinsList.children.length; i++) {
          window.pins.pinsList.children[i].classList.remove("hidden");
        }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  //----------> Открытие окна содержания объявления

  window.pins.pinsList.addEventListener("click", function(evt) {
    //Отображение содержания объявления по клику
    if (evt.target.parentNode.classList.contains("map__pin") && !evt.target.parentNode.classList.contains("map__pin--main")) {
      var target = evt.target.parentNode;
      for (var i = 2; i < window.pins.pinsList.children.length; i++) {
        if (window.pins.pinsList.children[i] === target) {
          window.map.lodgingOffersList.children[i - 1].classList.remove("hidden");
          window.map.lodgingOffersList.children[i - 1].classList.add("map__pin--active");
          window.map.lodgingOffersList.addEventListener("click", onPopupCrossPress);
          document.addEventListener("keydown", onPopupEscPress);
        } else {
          window.map.lodgingOffersList.children[i - 1].classList.add("hidden");
          window.map.lodgingOffersList.children[i - 1].classList.remove("map__pin--active");
        }
      }
    }
  });

  //----------> Закрытие окна содержания объявления

  //Закрытие окна
  var closePopup = function() {
    var openedPopup = window.map.lodgingOffersList.querySelector(".map__pin--active");
    openedPopup.classList.add("hidden");
    openedPopup.classList.remove("map__pin--active");
    window.map.lodgingOffersList.removeEventListener("click", onPopupCrossPress);
    document.removeEventListener("keydown", onPopupEscPress);
  };
  //Закрытие по клику на крестик
  var onPopupCrossPress = function(evt) {
    var target = evt.target;
    if (target.classList.contains("popup__close")) {
      closePopup();
    }
  };
  //Закрытие по нажатию ESC
  var ESC_KEYCODE = 27;
  var onPopupEscPress = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  //----------> Фильтрация похожих объявлений

  //Значения фильтра по умолчанию
  var defaultPinList = function() {
    for (var i = 2; i < window.pins.pinsList.children.length; i++) {
      window.pins.pinsList.children[i].classList.remove("hidden");
    }
  };

  //Отображение маркеров объявлений по типу жилья
  var changePinsByType = function(fieldClass, value) {
    for (var i = 2; i < window.pins.pinsList.children.length; i++) {
      if (window.map.lodgingOffersList.children[i - 1].querySelector(fieldClass).textContent === value) {
        window.pins.pinsList.children[i].classList.remove("hidden");
      } else {
          window.pins.pinsList.children[i].classList.add("hidden");
        }
    }
  };
  //Выбор типа жилья
  typeFilter.addEventListener("change", function() {
    if (window.map.lodgingOffersList.querySelector(".map__pin--active")) {
      closePopup();
    }
    if (this.selectedIndex === 0) {
      defaultPinList();
    } else if (this.selectedIndex === 1) {
        changePinsByType(".popup__type", "Квартира");
      } else if (this.selectedIndex === 2) {
          changePinsByType(".popup__type", "Дом");
        } else if (this.selectedIndex === 3) {
            changePinsByType(".popup__type", "Бунгало");
          }
  });

  //Отображение маркеров объявлений по цене
  var changePinsByPrice = function(fieldClass, value1, value2) {
    for (var i = 2; i < window.pins.pinsList.children.length; i++) {
      if (parseInt(window.map.lodgingOffersList.children[i - 1].querySelector(fieldClass).textContent, 10) >= value1 && parseInt(window.map.lodgingOffersList.children[i - 1].querySelector(fieldClass).textContent, 10) <= value2) {
        window.pins.pinsList.children[i].classList.remove("hidden");
      } else {
          window.pins.pinsList.children[i].classList.add("hidden");
        }
    }
  };
  //Выбор цены
  priceFilter.addEventListener("change", function() {
    if (window.map.lodgingOffersList.querySelector(".map__pin--active")) {
      closePopup();
    }
    if (this.selectedIndex === 0) {
      defaultPinList();
    } else if (this.selectedIndex === 1) {
        changePinsByPrice(".popup__price", 10000, 50000);
      } else if (this.selectedIndex === 2) {
          changePinsByPrice(".popup__price", 0, 10000);
        } else if (this.selectedIndex === 3) {
            changePinsByPrice(".popup__price", 50000, 10000000);
          }
  });

  //Отображение маркеров объявлений по количеству комнат
  var changePinsByRooms = function(fieldClass, value) {
    for (var i = 2; i < window.pins.pinsList.children.length; i++) {
      if (parseInt(window.map.lodgingOffersList.children[i - 1].querySelector(fieldClass).textContent, 10) === value) {
        window.pins.pinsList.children[i].classList.remove("hidden");
      } else {
          window.pins.pinsList.children[i].classList.add("hidden");
        }
    }
  };
  //Выбор количества комнат
  roomsFilter.addEventListener("change", function() {
    if (window.map.lodgingOffersList.querySelector(".map__pin--active")) {
      closePopup();
    }
    if (this.selectedIndex === 0) {
      defaultPinList();
    } else if (this.selectedIndex === 1) {
        changePinsByRooms(".popup__text--capacity", 1);
      } else if (this.selectedIndex === 2) {
          changePinsByRooms(".popup__text--capacity", 2);
        } else if (this.selectedIndex === 3) {
            changePinsByRooms(".popup__text--capacity", 3);
          }
  });

  //Отображение маркеров объявлений по количеству спальных мест
  var changePinsByCapacity = function(fieldClass, value) {
    for (var i = 2; i < window.pins.pinsList.children.length; i++) {
      if (parseInt(window.map.lodgingOffersList.children[i - 1].querySelector(fieldClass).textContent.substring(14), 10) === value) {
        window.pins.pinsList.children[i].classList.remove("hidden");
      } else {
          window.pins.pinsList.children[i].classList.add("hidden");
        }
    }
  };
  //Выбор количества спальных мест
  capacityFilter.addEventListener("change", function() {
    if (window.map.lodgingOffersList.querySelector(".map__pin--active")) {
      closePopup();
    }
    if (this.selectedIndex === 0) {
      defaultPinList();
    } else if (this.selectedIndex === 1) {
        changePinsByCapacity(".popup__text--capacity", 1);
      } else if (this.selectedIndex === 2) {
          changePinsByCapacity(".popup__text--capacity", 2);
        }
  });

})();

//////////////////////////////////
//Раскраска похожих волшебников
//var getSimilarColor = function(color1, color2) {
//  wizardList.forEach(function(wizard) {
//    if (wizard.colorCoat === color1) {
//      wizard.score += 2;
//      if (wizard.colorEyes === color2) {
//        wizard.score += 1;
//      }
//    } else if (wizard.colorEyes === color2) {
//        wizard.score += 1;
//    }
//  });
//  wizardList.sort(function(first, second) {
//    if (first.score < second.score) {
//      return 1;
//    } else if (first.score > second.score) {
//      return -1;
//    }
//    return 0;
//  });
//  for (var j = 0; j < 4; j++) {
//    var similarElement = similarListElement.children[0];
//    similarListElement.removeChild(similarElement);
//  }
//  for (var i = 0; i < 4; i++) {
//    var wizardElement = similarWizardTemplate.cloneNode(true);
//    wizardElement.querySelector(".wizard-coat").style.fill = wizardList[i].colorCoat;
//
//    wizardElement.querySelector(".wizard-eyes").style.fill = wizardList[i].colorEyes;
//
//    wizardElement.querySelector(".setup-similar-label").textContent = wizardList[i].name;
//
//    fragment.appendChild(wizardElement);
//  }
//  similarListElement.appendChild(fragment);
//  wizardList.forEach(function(wizard) {
//    wizard.score = 0;
//  });
//};

///////////////////////////////////
////Устранение дребезга
//var lastTimeout;/

//if (lastTimeout) {
//    window.clearTimeout(lastTimeout);
//  }
//  lastTimeout = window.setTimeout(function() {
//    getSimilarColor(currentCoatColor, currentEyesColor);
//  }, 500);
//});
///////////////////////////////////
