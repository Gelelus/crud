
const fs = require("fs");

let dataGeneral = fs.readFileSync("users.json", "utf8");
let users = JSON.parse(dataGeneral);

const add = async function (req) {
      
    if (req.name && req.age) {
        const userName = req.name;
        const userAge = req.age;
        const user = { name: userName, age: userAge };
        
        // находим максимальный id
        const id = Math.max(...users.map(o => o.id))
        // увеличиваем его на единицу
        user.id = id + 1;
        // добавляем пользователя в массив
        users.push(user);
        let data = JSON.stringify(users);
        // перезаписываем файл с новыми данными
        fs.writeFileSync("users.json", data);
        return user;

    } else {
        throw new Error('incorrect data');
    }
}

const get = async function (req) {

    const id = req; // получаем id
    let user = null;
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

const getAll =  async function () {
return users
}

const update = async function (req) {
    //console.log(req)
    if (req.name && req.age && req.age) {

        const userId = req.id;
        const userName = req.name;
        const userAge = req.age;


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
            let data = JSON.stringify(users);
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
   
    let index = -1;
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
        let data = JSON.stringify(users);
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
    del,
    getAll
}