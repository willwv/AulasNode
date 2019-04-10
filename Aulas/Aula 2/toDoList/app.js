const yargs = require('yargs')
const taskUtil = require('./util/taskUtil.js')

yargs.version('1.0.1')

yargs.command({
    command : 'criar',
    describe: 'criar nova tarefa',
    builder :{
        name : {
            describe: 'nome tarefa',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: 'descrição da tarefa',
            demandOption: true,
            type: 'string'
        }
    },
    handler : function(argv){
        taskUtil.addTask(argv.name, argv.description)
    }
})

yargs.command({
    command : 'deletar',
    describe: 'deletar tarefa por nome',
    builder :{
        name : {
            demandOption: true,
            describe: 'nome tarefa',
            type: 'string'
        }
    },
    handler : function(argv){
        console.log(argv.name)
    }
})

yargs.command({
    command : 'listar',
    describe: 'listar tarefa por nome',
    builder :{
        name : {
            demandOption: true,
            describe: 'nome tarefa',
            type: 'string'
        }
    },
    handler : function(argv){
        console.log(argv.name)
    }
})

yargs.command({
    command : 'listarAll',
    describe: 'listar todas as tarefas',
    handler : function(argv){
    }
})

yargs.parse()