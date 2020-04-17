
import symbol from 'log-symbols';
import chalk from 'chalk';
import ora from 'ora';

const { notExitFlod, prompt, downloadTemplate, updateJsonFile } = require('./util');

async function create(projectName) {
  if (projectName === undefined) {
    console.log(symbol.error, chalk.red('创建项目的时候，请输入项目名'));
  } else {
    notExitFlod(projectName).then(() => {
      // 询问用户
      prompt().then(answer => {
        if (answer.frame === 'react') {
          console.log(symbol.warning, chalk.yellow('react模板还没建设完....'))
          process.exit(1)
        }
        //  根据用户输入匹配下载模板
        // 下载时添加一个进度条
        const loading = ora('模板下载中...')
        loading.start('模板下载着呢 ...')
        let Api = ''
        switch (answer.frame) {
          case 'vue':
            Api = 'direct:https://github.com/For-Article/vue-temlate.git';
            break;
          case 'react':
            Api = 'direct:https://github.com/LuoYangYY/react-template.git';
            break;

          default:
            break;
        }
        console.log(Api)
        downloadTemplate(projectName, Api).then(() => {
          loading.succeed('模板下载完成');
          // 下载完成后更新配置文件
          const fileName = `${projectName}/package.json`;
          answer.name = projectName;
          updateJsonFile(fileName, answer).then(() => chalk.green('配置文件更新完成！'))
        }, () => loading.fail('模板下载失败！'));
      })
    },)
  }
}


module.exports = create