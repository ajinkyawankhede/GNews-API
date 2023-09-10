# GNews-API

## Getting Started

These instructions will help you set up and run the GNews API Service on your local machine.

1. **Clone the repository**:

   git clone https://github.com/ajinkyawankhede/GNews-API
   npm install
   node server.js

const YOUR_GNEWS_API_KEY = "PLEASE ENTER YOUR GNEWS_API_KEY HERE"; // Add your API key over here by activating your account

API Endpoints
1. Fetch N News Articles
    Endpoint: /articles/:count
    Method: GET
    Parameters: count (number of articles to fetch)
    Description: Fetches the latest N news articles.
2. Find Article by Title
    Endpoint: /article/title/:title
    Method: GET
    Parameters: title (title of the article)
    Description: Finds a news article by its title.
3. Find Article by Author
    Endpoint: /article/author/:author
    Method: GET
    Parameters: author (name of the author)
    Description: Finds news articles by a specific author.



Caching
To improve performance and reduce unnecessary API requests, the News API Service includes a caching mechanism. Articles retrieved from the external news API are cached for a certain period, ensuring that subsequent requests for the same data are served from the cache.


Examples
GET http://localhost:3000/articles/10
GET http://localhost:3000/article/title/Example-Title
GET http://localhost:3000/article/author/John-Doe
