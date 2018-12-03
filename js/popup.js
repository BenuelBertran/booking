/* jshint node: true */
/* jshint browser: true */
/* global window */
"use strict";

(function() {
            ////////// СОДЕРЖАНИЕ ОБЪЯВЛЕНИЯ //////////

  //----------> Локальные переменные

  //Шаблон окна с содержанием объявления
  var offerTemplate = document.querySelector("template").content.querySelector(".map__card");

  //----------> Глобальные переменные

  window.popup = {
    //Отрисовка окна с содержанием объявления на странице
    renderPopup: function() {
      var fragment = document.createDocumentFragment();
      window.data.offersList.forEach(function(offersItem) {
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
        //Наполнение объявлений данными сервера
        offerElement.querySelector(".popup__title").textContent = offersItem.offer.title;
        offerElement.querySelector(".popup__text--address").children[0].textContent = offersItem.offer.address;
        offerElement.querySelector(".popup__text--price").textContent = offersItem.offer.price + "₽/ночь";
        if (offersItem.offer.type === "flat") {
          offerElement.querySelector(".popup__type").textContent = "Квартира";
          } else if (offersItem.offer.type === "bungalo") {
              offerElement.querySelector(".popup__type").textContent = "Бунгало";
          } else if (offersItem.offer.type === "house") {
              offerElement.querySelector(".popup__type").textContent = "Дом";
          } else if (offersItem.offer.type === "palace") {
              offerElement.querySelector(".popup__type").textContent = "Дворец";
          }
        offerElement.querySelector(".popup__text--capacity").textContent = offersItem.offer.rooms + " комнаты для " + offersItem.offer.guests + " гостей";
        offerElement.querySelector(".popup__text--time").textContent = "Заезд после " + offersItem.offer.checkin + ", выезд до " + offersItem.offer.checkout;
        //Список удобств
        var featuresTemplate = offerElement.querySelector(".popup__features").children[0].cloneNode(true);
        for (var i = 0; i < 6; i++) {
          var featuresElement = offerElement.querySelector(".popup__features").children[0];
          offerElement.querySelector(".popup__features").removeChild(featuresElement);
        }
        for (var j = 0; j < offersItem.offer.features.length; j++) {
          var newFeature = featuresTemplate.cloneNode(true);
          newFeature.removeAttribute("class");
          newFeature.setAttribute("class", "feature " + "feature--" + offersItem.offer.features[j]);
          offerElement.querySelector(".popup__features").appendChild(newFeature);
        }
//        //Описание жилья (временно отключено)
//        offerElement.querySelector(".popup__description").textContent = offersItem.offer.description;
//        //Фотографии жилья
//        var photosElement = offerElement.querySelector(".popup__photos").children[0];
//        var photosTemplate = photosElement.cloneNode(true);
//        offerElement.querySelector(".popup__photos").removeChild(photosElement);
//        for (var k = 0; k < offersItem.offer.photos.length; k++) {
//          var newPhoto = photosTemplate.cloneNode(true);
//          newPhoto.querySelector("img").src = offersItem.offer.photos[k];
//          offerElement.querySelector(".popup__photos").appendChild(newPhoto);
//        }
        //Аватар автора объявления
        offerElement.querySelector(".popup__avatar").src = offersItem.author.avatar;
        //Скрытие окна с содержанием объявления по умолчанию
        offerElement.classList.add("hidden");
        //Добавление объявления во фрагмент
        fragment.appendChild(offerElement);
        //Отображение объявления на странице
        window.map.lodgingOffersList.insertBefore(fragment, window.map.lodgingOfferFilter);
      });
    }
   };
})();
