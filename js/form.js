/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

          ////////// ФОРМА СОЗДАНИЯ ОБЪЯВЛЕНИЯ //////////

(function() {
  //----------> Локальные переменные

  //Заголовок объявления
  var lodgingOfferTitle = document.getElementById("title");
  //Поле "Цена"
  var lodgingOfferPrice = document.getElementById("price");
  //Поле "Время заезда"
  var lodgingOfferTimein = document.getElementById("timein");
  //Поле "Время выезда"
  var lodgingOfferTimeout = document.getElementById("timeout");
  //Поле "Тип жилья"
  var lodgingOfferType = document.getElementById("type");
  //Поле "Количество комнат"
  var lodgingOfferRooms = document.getElementById("room_number");
  //Поле "Количество мест"
  var lodgingOfferCapacity = document.getElementById("capacity");
  //Кнопка сброса страницы к значениям по умолчанию
  var resetButton = document.querySelector(".form__reset");
  //Минимальная цена за ночь в зависимости от типа жилья
  var minPrice = [
    "0",
    "1000",
    "5000",
    "10000"
  ];

  //----------> Глобальные переменные

  window.form = {
    //Окно формы создания объявления
    lodgingOfferForm: document.querySelector(".notice__form"),
    //Шапка окна формы создания объявления
    formHeader: document.querySelector(".notice__header"),
    //Блоки формы создания объявления
    formBlocks: document.querySelectorAll(".form__element"),
    //Поле "Адрес"
    addressField: document.getElementById("address")
  };

  //---------> Состояние полей формы по умолчанию

  window.form.lodgingOfferForm.action = "https://js.dump.academy/keksobooking";
  window.form.formHeader.disabled = true;
  window.form.formBlocks.forEach(function(block) {
    block.disabled = true;
  });
  lodgingOfferTitle.required = true;
  lodgingOfferTitle.setAttribute("minlength", "30");
  lodgingOfferTitle.setAttribute("maxlength", "100");
  lodgingOfferPrice.required = true;
  lodgingOfferPrice.max = 1000000;
  window.form.addressField.value = "633" + ", 408";
  window.form.addressField.readOnly = true;
  lodgingOfferCapacity.children[0].removeAttribute("selected");
  lodgingOfferCapacity.children[0].classList.add("hidden");
  lodgingOfferCapacity.children[1].classList.add("hidden");
  lodgingOfferCapacity.children[2].setAttribute("selected", "");
  lodgingOfferCapacity.children[3].classList.add("hidden");

  //----------> Поведение полей формы

  //Установка минимальной цены в зависимости от типа жилья
  lodgingOfferType.addEventListener("change", function() {
    lodgingOfferPrice.min = minPrice[this.selectedIndex];
    lodgingOfferPrice.placeholder = minPrice[this.selectedIndex];
  });
  //Синхронизация полей времени Заезда и Выезда
  lodgingOfferTimein.addEventListener("change", function() {
    lodgingOfferTimeout.selectedIndex = this.selectedIndex;
  });
  lodgingOfferTimeout.addEventListener("change", function() {
    lodgingOfferTimein.selectedIndex = this.selectedIndex;
  });
  //Ограничение выбора гостей в зависимости от количества комнат
  lodgingOfferRooms.addEventListener("change", function() {
    if (this.selectedIndex === 0) {
      lodgingOfferCapacity.children[2].classList.remove("hidden");
      lodgingOfferCapacity.children[0].classList.add("hidden");
      lodgingOfferCapacity.children[1].classList.add("hidden");
      lodgingOfferCapacity.children[3].classList.add("hidden");
      lodgingOfferCapacity.selectedIndex = 2;
    } else if (this.selectedIndex === 1) {
      lodgingOfferCapacity.children[0].classList.add("hidden");
      lodgingOfferCapacity.children[1].classList.remove("hidden");
      lodgingOfferCapacity.children[2].classList.remove("hidden");
      lodgingOfferCapacity.children[3].classList.add("hidden");
      lodgingOfferCapacity.selectedIndex = 2;
    } else if (this.selectedIndex === 2) {
      lodgingOfferCapacity.children[0].classList.remove("hidden");
      lodgingOfferCapacity.children[1].classList.remove("hidden");
      lodgingOfferCapacity.children[2].classList.remove("hidden");
      lodgingOfferCapacity.children[3].classList.add("hidden");
      lodgingOfferCapacity.selectedIndex = 2;
    } else if (this.selectedIndex === 3) {
      lodgingOfferCapacity.children[0].classList.add("hidden");
      lodgingOfferCapacity.children[1].classList.add("hidden");
      lodgingOfferCapacity.children[2].classList.add("hidden");
      lodgingOfferCapacity.children[3].classList.remove("hidden");
      lodgingOfferCapacity.selectedIndex = 3;
    }
  });

  //----------> Деактивация страницы

  var deactivatePage = function() {
    //Сброс значений формы
    window.form.lodgingOfferForm.reset();
    //Деактивация полей формы объявления
    window.form.formHeader.disabled = true;
    window.form.formBlocks.forEach(function(block) {
      block.disabled = true;
    });
    //Деактивация карты
    window.map.lodgingOffersList.classList.add("map--faded");
    //Деактивация маркеров похожих объявлений
    for (var i = 2; i < window.pins.pinsList.children.length; i++) {
        window.pins.pinsList.children[i].classList.add("hidden");
      }
    //Отображение главного маркера
    window.pins.mainPin.classList.remove("hidden");
    //Положение главного маркера
    window.pins.mainPin.style.left = window.pins.mainPinX + "px";
    window.pins.mainPin.style.top = window.pins.mainPinY + "px";
    //Адрес главного маркера (без указателя)
    window.form.addressField.value = "" + (window.pins.mainPinX + 33) + ", " + "" + (window.pins.mainPinY + 33) + "";
    //Скрытие окна похожих объявлений
    window.map.lodgingOffersList.querySelector(".map__card").classList.add("hidden");
  };

  //---------> Отправка данных формы объявления

  //Отправка данных формы объявления с Успехом
  var onSuccess = function(success) {
    deactivatePage();
  };
  //Отправка данных формы объявления с Ошибкой
  var onError = function (errorMessage) {
    window.data.errorMessage(errorMessage);
  };
  //Отправка данных формы на сервер
  window.form.lodgingOfferForm.addEventListener("submit", function(evt) {
    window.backend.save(new FormData(window.form.lodgingOfferForm), onSuccess, onError);
    evt.preventDefault();
  });

  //----------> Cброс страницы к значениям по умолчанию

  //Сброс значений формы
  resetButton.addEventListener("click", deactivatePage);
})();
