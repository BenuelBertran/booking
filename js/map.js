/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

////////// Карта Токио с объявлениями о сдаче жилья //////////

(function() {
    ///// Глобальные переменные /////

  window.map = {
    //Карта жилья
    lodgingOffersList: document.querySelector(".map"),
    //Блок с фильтром объявлений
    lodgingOfferFilter: document.querySelector(".map__filters-container")
  };

  ///// Локальные переменные /////


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

//      //Закрытие окна похожего объявления
//      var ESC_KEYCODE = 27;
//      var closePopupButton = window.map.offerElement.querySelector(".popup__close");
//      var onPopupEscPress = function(evt) {
//        if (evt.keyCode === ESC_KEYCODE) {
//          closeLodgingOfferPopup();
//        }
//      };
//      var closeLodgingOfferPopup = function () {
//        window.map.offerElement.classList.add("hidden");
//        document.removeEventListener("keydown", onPopupEscPress);
//        closePopupButton.removeEventListener("click", closeLodgingOfferPopup);
//      };
//      //Открытие окна похожего объявления
//      window.map.offerElement.classList.remove("hidden");
//      document.addEventListener("keydown", onPopupEscPress);
//      closePopupButton.addEventListener("click", closeLodgingOfferPopup);
//    };

  ///// Страница в активном состоянии /////

  window.pins.mainPin.addEventListener("mousedown", function(evt) {
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
      for (var j = 0; j < 7; j++) {
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
      window.pins.pinsList.addEventListener("click", function(evt) {
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
//
////Устранение дребезга
//var lastTimeout;/

////////////////////////////

//if (lastTimeout) {
//    window.clearTimeout(lastTimeout);
//  }
//  lastTimeout = window.setTimeout(function() {
//    getSimilarColor(currentCoatColor, currentEyesColor);
//  }, 500);
//});
///////////////////////////////////
