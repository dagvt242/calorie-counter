const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Помилка читання файлу");
        res.send(JSON.parse(data));
    });
});

app.post('/api/meals', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Помилка читання");

        const db = JSON.parse(data);
        db.meals.push(req.body);

        fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2), (err) => {
            if (err) return res.status(500).send("Помилка запису");
            res.status(201).send({ message: "Запис додано успішно" });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});