/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

////////// Форма создания объявления //////////

(function() {
  ///// Глобальные переменные /////

  window.form = {
    //Окно формы создания объявления
    lodgingOfferForm: document.querySelector(".notice__form"),
    //Блоки формы создания объявления
    formBlocks: document.querySelectorAll(".form__element"),
    //Поле "Адрес"
    addressField: document.getElementById("address"),
    //Шапка окна формы создания объявления
    formHeader: document.querySelector(".notice__header")
  };

  ///// Локальные переменные /////

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
  var resetButton =
  window.form.lodgingOfferForm.querySelector(".form__reset");
  //Минимальная цена за ночь в зависимости от типа жилья
  var minPrice = [
    "0",
    "1000",
    "5000",
    "10000"
  ];

  ///// Состояние полей формы по умолчанию /////

  window.form.lodgingOfferForm.action = "https://js.dump.academy/keksobooking";
  window.form.formHeader.disabled = true;
  for (var i = 0; i < window.form.formBlocks.length; i++) {
    window.form.formBlocks[i].disabled = true;
  }
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

  ///// Поведение полей формы /////

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

  ///// Отправка данных формы создания объявления /////

  //Отправка данных формы создания объявления с Успехом
  var onSuccess = function(success) {
    //Сброс значений формы
    window.form.lodgingOfferForm.reset();
    //Деактивация полей формы объявления
    window.form.formHeader.disabled = true;
    for (var i = 0; i < window.form.formBlocks.length; i++) {
      window.form.formBlocks[i].disabled = true;
    }
    //Деактивация карты
    window.map.lodgingOffersList.classList.add("map--faded");
    //Деактивация маркеров похожих объявлений
    for (var j = 0; j < window.map.pinsList.children.length; j++) {
      if (window.map.pinsList.children[j].hasAttribute("style")) {
        window.map.pinsList.children[j].classList.add("hidden");
      }
    }
    //Отображение главного маркера
    window.map.mainPin.classList.remove("hidden");
    //Положение главного маркера
    window.map.mainPin.style.left = window.map.mainPinX + "px";
    window.map.mainPin.style.top = window.map.mainPinY + "px";
    //Адрес главного маркера (без указателя)
    window.form.addressField.value = "" + (window.map.mainPinX + 33) + ", " + "" + (window.map.mainPinY + 33) + "";
    //Скрытие окна похожих объявлений
    window.map.offerElement.classList.add("hidden");
  };

  //Отправка данных формы создания объявления с Ошибкой
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

  //Отправка данных заполненной формы объявления на сервер и сброс полей формы к значениям по умолчанию при успешной отправке
  window.form.lodgingOfferForm.addEventListener("submit", function(evt) {
  //Отправка данных формы создания объявления
  window.backend.save(new FormData(window.form.lodgingOfferForm), onSuccess, onError);
    evt.preventDefault();
  });

  ///// Cброс страницы к значениям по умолчанию /////

  //Сброс значений формы при нажатии на кнопку Reset
  resetButton.addEventListener("click", function() {
    //Сброс значений формы
    window.form.lodgingOfferForm.reset();
    //Деактивация полей формы объявления
    window.form.formHeader.disabled = true;
    for (var i = 0; i < window.form.formBlocks.length; i++) {
      window.form.formBlocks[i].disabled = true;
    }
    //Деактивация карты
    window.map.lodgingOffersList.classList.add("map--faded");
    //Деактивация маркеров похожих объявлений
    for (var j = 0; j < window.map.pinsList.children.length; j++) {
      if (window.map.pinsList.children[j].hasAttribute("style")) {
        window.map.pinsList.children[j].classList.add("hidden");
      }
    }
    //Отображение главного маркера
    window.map.mainPin.classList.remove("hidden");
    //Положение главного маркера
    window.map.mainPin.style.left = window.map.mainPinX + "px";
    window.map.mainPin.style.top = window.map.mainPinY + "px";
    //Адрес главного маркера (без указателя)
    window.form.addressField.value = "" + (window.map.mainPinX + 33) + ", " + "" + (window.map.mainPinY + 33) + "";
    //Скрытие окна похожих объявлений
    window.map.offerElement.classList.add("hidden");
  });
})();
