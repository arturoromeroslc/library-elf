const { exec } = require('child_process')
const path = require('path')
const spinner = require('ora')('packaging application...').start()

const { dir: ROOT_FOLDER } = path.parse(process.env.PWD)
const S3_BUCKET = 'library-login'

exec(
  `sam package --template-file ${ROOT_FOLDER}/template.yaml --output-template-file ${ROOT_FOLDER}/package.yaml --s3-bucket ${S3_BUCKET}`,
  (err, stdout) => {
    if (err) return spinner.fail(err)

    return spinner.succeed(`
      ${stdout}
      or run:
      npm run deploy
    `)
  }
)
