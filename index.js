const fetch = require("node-fetch");

const getRandomFloat = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const URL = "http://arch.homework";

let data = [];

const selectRandomItem = () => {
  const max = data.length;

  if (max === 0) {
    console.log("Not Item");
    return null;
  }

  const radnomIndex = getRandomFloat(0, max - 1);
  return data[radnomIndex];
};

// Добавление
const add = async () => {
  try {
    const response = await fetch(URL + "/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ name: "Nadejda", surname: "Belousova" }),
    });

    const result = await response.json();
    data.push(result);
    console.log("Add Ok!");
  } catch (ex) {
    console.log("Add Error!");
  }
};

// Изенение
const update = async () => {
  const item = selectRandomItem();

  if (!item) {
    return;
  }

  try {
    const response = await fetch(URL + "/api/user/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: item.id, name: "Nady1", surname: "Belousova1" }),
    });

    const result = await response.json();
    console.log("Update Ok!");
  } catch (ex) {
    console.log("Update Error!");
  }
};

// Получение по идентификатору
const getId = async () => {
  const item = selectRandomItem();

  if (!item) {
    return;
  }

  try {
    const response = await fetch(URL + `/api/user/${item.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    const result = await response.json();
    console.log("GetId Ok!");
  } catch (ex) {
    console.log("GetId Error!");
  }
};

// Удаление записи
const del = async () => {
  const item = selectRandomItem();

  if (!item) {
    return;
  }

  try {
    const response = await fetch(URL + `/api/user/${item.id}/`, {
      method: "DELETE",
    });

    //const result = await response.json();

    data = data.filter((t) => t.id !== item.id);

    console.log("Delete Ok!");
  } catch (ex) {
    console.log("Delete Error!", ex);
  }
};

const getAll = async () => {
  try {
    const response = await fetch(URL + "/api/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    console.log("GetAll Ok!");
  } catch (ex) {
    console.log("GetAll Error!");
  }
};

const go = async () => {
  for (let i = 0; i < 100000; i++) {
    const idRandom = getRandomFloat(1, 5);
    //console.log("Random:", idRandom);
    switch (idRandom) {
      case 1:
        // Добавление
        await add();
        break;
      case 2:
        // Изменение
        await update();
        break;
      case 3:
        // Получнеие по идентификатору
        await getId();
        break;
      case 4:
        // Удаление
        await del();
        break;
      case 5:
        // Получение всех записей
        getAll();
        break;
    }
  }

  console.log("The End");
};

go();
