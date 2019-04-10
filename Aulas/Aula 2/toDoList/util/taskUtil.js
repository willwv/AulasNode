var fs = require('fs')
var path = 'objetoTask.json'

const addTask = function(name, description){
    debugger
    const tasks = loadTasks()
    const taskDuplicada = tasks.find((task)=>{return task.name === name})

    if(!taskDuplicada){
        const novaTask = {name, description}
        tasks.push(novaTask)
        saveTask(tasks)
        console.log(`Task ${name} adicionada.`)
    }    
}

const removerTask = function(name){
    const tasks = loadTasks()
    const copiaTasks = tasks

    copiaTasks.forEach((task, indice) =>{
        if(task.name == name){
            tasks.splice(indice,1)
            console.log(`Task ${name} removida.`)
        }
    })
    saveTask(tasks)
}

const listarPorNome = function(name){
    debugger
    const tasks = loadTasks()
    const taskListada = tasks.find((task)=>{return task.name === name})
    
    if(taskListada)
        console.log(`Nome da Task ${taskListada.name}   Descrição: ${taskListada.description}`)
    else
        console.log('Nenhuma task encontrada com esse nome')
}

const listarTasks = function(){
    const tasks = loadTasks()

    tasks.forEach(task => {
        console.log(task.name)
    });
    console.log('Todas as tarefas foram listadas.')
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
    addTask, listarTasks, removerTask, listarPorNome
}