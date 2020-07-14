"use sctrict";

const input1 = document.getElementById("input1"),
  input2 = document.getElementById("input2"),
  button = document.querySelector("button");

const DBService = class {
  constructor() {
    this.SERVER = "https://translate.yandex.net/api/v1.5";
    this.API_KEY =
      "trnsl.1.1.20190225T091515Z.06bde7bd52a8c1a7.0749f827a8a0474bf52a18b3b47f827f339c781a";
  }

  getTranslation = (text) => {
    const english = /^[A-Za-z0-9]*$/;
    let language = "ru-en";

    if (english.test(text)) {
      language = "en-ru";
    }

    const url = `${this.SERVER}/tr.json/translate?key=${this.API_KEY}&text=${text}&lang=${language}`;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};

const dbService = new DBService();

button.addEventListener("click", () => {
  dbService
    .getTranslation(input1.value)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("status network is not 200");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      input2.value = data.text[0];
    })
    .catch((error) => console.log(error));
});
