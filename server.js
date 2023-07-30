const http = require("http")
const chalk = require("chalk")
const app = require("./app")

const SERVER_PORT = process.env["SERVER_PORT"] ?? 3000
const server = http.createServer(app)

server.listen(SERVER_PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on PORT:"),
    chalk.yellow(SERVER_PORT),
    chalk.blueBright("Get your routine on!")
  )
})
