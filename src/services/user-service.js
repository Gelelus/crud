
const fs = require("fs");

const add = async function (req) {
    if (req.name && req.age) {
        var userName = req.name;
        var userAge = req.age;
        var user = { name: userName, age: userAge };

        var data = fs.readFileSync("users.json", "utf8");
        var users = JSON.parse(data);

        // находим максимальный id
        var id = Math.max.apply(Math, users.map(function (o) { return o.id; }))
        // увеличиваем его на единицу
        user.id = id + 1;
        // добавляем пользователя в массив
        users.push(user);
        var data = JSON.stringify(users);
        // перезаписываем файл с новыми данными
        fs.writeFileSync("users.json", data);
        return user;

    } else {
        throw new Error('incorrect data');
    }
}

const get = async function (req) {

    var id = req; // получаем id
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    var user = null;
    // находим в массиве пользователя по id
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if (user) {
        return user;
    }
    else {
        throw new Error('user not found');
    }
}

const update = async function (req) {

    var userId = req.id;
    var userName = req.name;
    var userAge = req.age;

    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var user;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if (user) {
        user.age = userAge;
        user.name = userName;
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        return user;
    }
    else {
        throw new Error('user not found');
    }
}


const del = async function (req) {

    var id = req;
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var index = -1;
    // находим индекс пользователя в массиве
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        // удаляем пользователя из массива по индексу
        var user = users.splice(index, 1)[0];
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        // отправляем удаленного пользователя

        return user
    }
    else {
        throw new Error('user not found');
    }

}


module.exports = {
    add,
    get,
    update,
    del
}