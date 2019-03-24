const { exec } = require('child_process')
const path = require('path')
const spinner = require('ora')('deploying application...').start()

const { dir: ROOT_FOLDER } = path.parse(process.env.PWD)

exec(
  `sam deploy --template-file ${ROOT_FOLDER}/package.yaml --stack-name sam-app --capabilities CAPABILITY_IAM`,
  (err, stdout) => {
    if (err) return spinner.fail(err)

    return spinner.succeed(`
      ${stdout}
    `)
  }
)
