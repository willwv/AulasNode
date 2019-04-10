var fs = require('fs')
var path = 'objetoTask.json'

const addTask = function(name, description){
    debugger
    const tasks = loadTasks()
    const taskDuplicada = tasks.find((task)=>{task.name === name})

    if(!taskDuplicada){
        const novaTask = {name, description}
        tasks.push(novaTask)
        saveTask(tasks)
    }    
}
const saveTask = function(task){
    const taskJson = JSON.stringify(task)
    fs.writeFileSync(path,taskJson)
}
const loadTasks = function(){
    try{
        let listaArquivos = fs.readFileSync(path)
        return JSON.parse(listaArquivos.toString());
    }catch(err){
        return []
    }
}

module.exports = {
    addTask
}