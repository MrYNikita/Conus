import express from "express";
import bodyParser from "body-parser";
import { readFile } from "fs";
import { calculateConeMesh } from "./triangulation.mjs";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {

    res.send(readFile('./public/index.html'))

});

app.post('/triangulate', (req, res) => {

    const { height, radius, segments } = req.body;

    res.send(JSON.stringify(calculateConeMesh(+height, +radius, +segments)));

});

const port = 3000;

app.listen(port, () => {

    console.log(`Сервер запущен на порту ${port}`);

});