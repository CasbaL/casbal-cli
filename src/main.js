import program from 'commander';

const create = require('./create')
const dev = require('./dev')
const build = require('./build');

// 命令列表
const action_map =  {
  // 创建项目
  create: {
    description: "创建一个项目",
    usages: [
      'casbal-cli create ProjectName',
      'cc create ProjectName'
    ],
    alias: 'c'
  },
  // 项目初始化
  init: {
    description: '初始化项目',
    usages: [
      'casbal-cli init',
      'cc init'
    ],
    alias: 'i'
  },
  // 启动项目
  dev: {
    description: '本地启动项目',
    usages: [
      'casbal-cli dev',
      'cc dev'
    ],
    options: [{
      flags: '-p --port <port>',
      description: '端口',
      defaultValue: 3000
    }],
    alias: 'd'
  },
  // 打包项目
  build: {
    description: '生产环境打包项目',
    usages: [
      'casbal-cli build',
      'cc build',
    ],
    options: [{
      flags: '-u --username <port>',
      description: 'github 用户名',
      defaultValue: ''
    }, {
      flags: '-t --token <port>',
      description: 'github 创建的token',
      defaultValue: ''
    }],
    alias: 'b'
  }
}


// 添加create/init/dev/build 命令
Object.keys(action_map).forEach(action => {
  if (action_map[action].options) {
    Object.keys(action_map[action].options).forEach(opt => {
      const obj = action_map[action].options[opt];
      program.option(obj.flags, obj.description, obj.defaultValue)
    })
  }


  program
    .command(action)
    .description(action_map[action].description)
    .alias(action_map[action].alias)
    .action(() => {
      switch (action) {
        case 'create':
          console.log(process.argv)
          create(...process.argv.slice(3));
          break;

        case 'init':
          console.log('init');
          break;

        case 'dev':
          console.log('dev', program.port);
          dev(program.port);
          break;

        case 'build':
          console.log('building...');
          build()
          break;

        default:
          break;
      }
    })

})

// 猜测: 必须 parse 进程参数才能出信息 bingo!!!
program
  .version(require('../package.json').version, '-v --version')
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}