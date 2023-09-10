const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const port = 3000;

const cache = new NodeCache({ stdTTL: 3600 });
const YOUR_GNEWS_API_KEY = "PLEASE ENTER YOUR GNEWS_API_KEY HERE";

app.use(express.json());

// Fetch N news articles from GNews API
app.get('/articles/:count', async (req, res) => {
    console.log(req.params)
    const count = req.params.count;
    const cacheKey = `/articles/${count}`;

    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        res.json(cachedData);
    } else {
        try {
            const response = await axios.get(`https://gnews.io/api/v4/top-headlines?token=${YOUR_GNEWS_API_KEY}&country=us&limit=${count}`);
            const articles = response.data.articles;
            console.log(articles)
            // Cache the data for future requests
            cache.set(cacheKey, articles);

            res.json(articles);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error fetching articles' });
        }
    }
});

// Find a news article by title
app.get('/article/title/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const response = await axios.get(`https://gnews.io/api/v4/search?q=${encodeURIComponent(title)}&token=${YOUR_GNEWS_API_KEY}`);
        const articles = response.data.articles;

        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Error finding article by title' });
    }
});

// Find a news article by author
app.get('/article/author/:author', async (req, res) => {
    const author = req.params.author;

    try {
        const response = await axios.get(`https://gnews.io/api/v4/search?q=${encodeURIComponent(author)}&token=YOUR_GNEWS_API_KEY`);
        const articles = response.data.articles;

        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Error finding article by author' });
    }
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
