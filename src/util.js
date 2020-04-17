const fs = require('fs');
const symbol = require('log-symbols');
const chalk = require('chalk');
const inquirer = require('inquirer')
const downloadGit = require('download-git-repo')

// 文件名是否存在
function notExitFlod(name) {
  return new Promise(resolve => {
    if (fs.existsSync(name)) {
      console.log(
        symbol.error,
        chalk.red('文件夹名已被占用，请更换名字重新创建')
      );
    } else {
      resolve();
    }
  });
}

// cli询问用户配置
const promptList = [
  {
    type: 'list',
    name: 'frame',
    message: '请选择项目模板: ',
    choices: ['vue', 'react']
  },
  {
    type: 'input',
    name: 'description',
    message: '请输入项目描述: '
  },
  {
    type: 'input',
    name: 'author',
    message: '请输入作者名: '
  }
];

// 用户输入交互
const prompt = () => {
  return new Promise(resolve => {
    inquirer.prompt(promptList).then(answer => {
      resolve(answer);
    });
  });
};

// 模板下载方法
const downloadTemplate = async (projectName, api) => {
  return new Promise((resolve, reject) => {
    downloadGit(api, projectName, {clone: true}, err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

// 更新json文件
const updateJsonFile = (filename, obj) => {
  return new Promise(resolve => {
    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename).toString();
      let json = JSON.parse(data);
      for (const [key, value] of Object.entries(obj)) {
        json[key] = value
      }
      fs.writeFileSync(filename, JSON.stringify(json, null, '\t'), 'utf-8')
      resolve()
    }
  })
}


module.exports = {
  notExitFlod,
  prompt,
  downloadTemplate,
  updateJsonFile
};