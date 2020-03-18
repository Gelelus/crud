
const fs = require("fs");

const add = async function (req) {
    return 'добавленно'
}

const get = async function(req){
    var id = req; // получаем id
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    var user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        return user;
    }
    else{
        return 'user not found';
    }
}

const update = async function(req){
    return 'обновленно'
}


const del = async function(req){

    var id = req;
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        var user = users.splice(index, 1)[0];
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        // отправляем удаленного пользователя
        
        return user
    }
    else{
        return 'user not found'
    }
    
}


module.exports = {
    add,
    get,
    update,
    del
}