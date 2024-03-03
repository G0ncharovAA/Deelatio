"use strict";

self.addEventListener("install", (event) => {
  console.log("Установлен");
});

self.addEventListener("activate", (event) => {
  console.log("Активирован");
  setTimeout(() => {
    console.log("прошло 3 сек");
  }, 3000);
});

self.addEventListener("fetch", (event) => {
  console.log("Происходит запрос на сервер");
});
