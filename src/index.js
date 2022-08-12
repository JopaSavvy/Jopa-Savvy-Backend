const app = require("./app")

const PORT = process.PORT || 5000

app.listen(PORT,()=> {
  console.log(`server is running on port ${PORT}`)
})