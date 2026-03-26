const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Для обработки JSON в запросах
app.use(express.static('public')); // Раздача файлов из папки public

// Исходные данные (6 товаров)
let products = [
    { id: 1111, name: 'iPhone 16 Pro', cost: '88 000р.', desc: 'Флагманский смартфон от Apple с продвинутой камерой и процессором A18 Pro', img: 'images/goods16pro.png' },
    { id: 2222, name: 'iPhone 17 Pro', cost: '115 000р.', desc: 'Новейший iPhone с революционной камерой и процессором A19 Pro', img: 'images/goods17pro.png' },
    { id: 3333, name: 'iPhone 17 Air', cost: '86 000р.', desc: 'Облегченная версия флагмана с премиальным дизайном', img: 'images/goods17air.png' },
    { id: 4444, name: 'iPhone 16', cost: '68 000р.', desc: 'Базовая модель с отличным соотношением цены и качества', img: 'images/goods16.png' },
    { id: 5555, name: 'iPhone 17', cost: '78 000р.', desc: 'Новая модель с отличным соотношением цены и качества', img: 'images/goods17.png' },
    { id: 6666, name: 'iPhone 16e', cost: '54 000р.', desc: 'Самая дешевая модель с базовой характеристикой', img: 'images/goods16e.png' }
];

// CRUD МАРШРУТЫ

// Получить все товары (Read)
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Просмотр товара по ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Товар не найден" });
    }
});

// Добавить товар (Create)
app.post('/api/products', (req, res) => {
    const { name, cost, desc, img } = req.body;

    // Генерируем ID и проверяем, нет ли такого уже в списке
    let newId;
    do {
        newId = Math.floor(1000 + Math.random() * 9000);
    } while (products.some(p => p.id === newId));

    const newProduct = { id: newId, name, cost, desc: desc || "Новый товар", img: img || 'images/default.png' };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Редактировать товар (Update)
app.patch('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        const { name, cost, desc, img } = req.body;
        if (name) product.name = name;
        if (cost) product.cost = cost;
        if (desc) product.desc = desc;
        if (img) product.img = img;
        res.json(product);
    } else {
        res.status(404).send('Товар не найден');
    }
});

// Удалить товар (Delete)
app.delete('/api/products/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.send('Товар удален');
});

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});