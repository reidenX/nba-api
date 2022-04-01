const Joi = require("joi")
const { application } = require("express")
const express = require("express")
const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

const players = [
  {
    id: 1,
    name: "Lebron James",
    img: "//i.insider.com/5c1a95eed4beaf15e5742875?width=1136&format=jpeg",
  },
  {
    id: 2,
    name: "Stephen Curry",
    img: "https://i.insider.com/604801ae9942cf001865d746?width=1136&format=jpeg",
  },
  {
    id: 3,
    name: "Kevin Durant",
    img: "https://manofmany.com/wp-content/uploads/2021/02/1-Highest-Paid-NBA-Players-2021-Kevin-Durant.jpg",
  },
  {
    id: 4,
    name: "James Harden",
    img: "https://cdn.nba.com/manage/2021/09/GettyImages-1235557499-scaled-e1632855716179.jpg",
  },
  {
    id: 5,
    name: "Damian Lillard",
    img: "https://static01.nyt.com/images/2020/06/12/sports/12nba-return/merlin_168451203_493eb598-93f6-47dc-9140-c8bd94b620da-superJumbo.jpg",
  },
]

//CREATE==============
app.post("/api", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    img: Joi.required(),
  })

  const { error } = schema.validate({
    name: req.body.name,
    img: req.body.img,
  })

  if (!error) {
    const player = {
      id: players.length + 1,
      name: req.body.name,
      img: req.body.img,
    }
    players.push(player)
    res.send(player)
    return
  }
  res.send(error)
})

//READ===================
app.get("/", (req, res) => {
  res.send("Sample")
})

app.get("/api", (req, res) => {
  res.send(players)
})

app.get("/api/:id", (req, res) => {
  const player = players.find((c) => c.id === parseInt(req.params.id))
  if (!player) res.status(404).send("Not Found")
  res.send(player)
})

//UPDATE========================
app.put("/api/:id", (req, res) => {
  const player = players.find((c) => c.id === parseInt(req.params.id))
  if (!player) res.status(404).send("Not Found")

  res.send(player)
})

// DELETE=====================
app.delete("/api/:id", (req, res) => {
  const player = players.find((c) => c.id === parseInt(req.params.id))
  if (!player) res.status(404).send("Not Found")

  const index = players.indexOf(player)
  players.splice(index, 1)

  res.send(player)
})

app.listen(port, () => console.log(`listening on port ${port}....`))
