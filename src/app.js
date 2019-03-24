const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

exports.lambdaHandler = async (event, context) => {
  let result = null
  let browser = null

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    })

    let page = await browser.newPage()

    await page.goto(event.url || 'https://example.com')

    result = await page.title()
  } catch (error) {
    return context.fail(error)
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }

  return context.succeed(result)
}
