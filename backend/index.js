const express = require("express")

const app = express()

app.get("/", (req, res) => {
	res.send({"name": "bro"})
})

app.listen(3000, () => {
	console.log("3000")
})

