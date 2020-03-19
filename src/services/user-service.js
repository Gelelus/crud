
const fs = require("fs");

const add = async function (req) {
    if (req.name && req.age) {
        const userName = req.name;
        const userAge = req.age;
        const user = { name: userName, age: userAge };

        let data = fs.readFileSync("users.json", "utf8");
        const users = JSON.parse(data);

        // находим максимальный id
        const id = Math.max.apply(Math, users.map(function (o) { return o.id; }))
        // увеличиваем его на единицу
        user.id = id + 1;
        // добавляем пользователя в массив
        users.push(user);
        data = JSON.stringify(users);
        // перезаписываем файл с новыми данными
        fs.writeFileSync("users.json", data);
        return user;

    } else {
        throw new Error('incorrect data');
    }
}

const get = async function (req) {

    const id = req; // получаем id
    const content = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(content);
    const user = null;
    // находим в массиве пользователя по id
    for (let i = 0; i < users.length; i++) {
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
    if (req.name && req.age && req.age) {

        const userId = req.id;
        const userName = req.name;
        const userAge = req.age;

        let data = fs.readFileSync("users.json", "utf8");
        const users = JSON.parse(data);
        let user;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == userId) {
                user = users[i];
                break;
            }
        }
        // изменяем данные у пользователя
        if (user) {
            user.age = userAge;
            user.name = userName;
            data = JSON.stringify(users);
            fs.writeFileSync("users.json", data);
            return user;
        }
        else {
            throw new Error('user not found');
        }
    }
    else {
        throw new Error('incorrect data');
    }
}


const del = async function (req) {

    const id = req;
    let data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const index = -1;
    // находим индекс пользователя в массиве
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        // удаляем пользователя из массива по индексу
        const user = users.splice(index, 1)[0];
        data = JSON.stringify(users);
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