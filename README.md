# Return policy eligibility API

This is a simple Node.js API for checking return policy of a product. It uses Express.js for handling HTTP requests and MySQL for database operations.

## Setup

1. Install Node.js on your system.
2. Clone this repository.
3. Run `npm install` to install the necessary dependencies.

## Environment Variables

You need to set up the following environment variables in a `.env` file:

- `DB_HOST`: Your MySQL host
- `DB_USER`: Your MySQL user
- `DB_PASS`: Your MySQL password
- `DB_NAME`: Your MySQL database name

You can use the `dotenv` package to load these variables into your application. This is already done in the `app.js` file:

javascript
require('dotenv').config();

const db = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME
});


## Database Setup

You need to create a MySQL database and tables as shown in the `Cloud setup.txt` file. This includes creating a `Products` table and an `Orders` table, and inserting some initial data.

## API Endpoints

The API has the following endpoints:

- `GET /checkLastProductReturnEligibility/:CustomerID`: Fetches retun eligibility of the last purchased product for a specific customer ID.

## Running the Server

The server listens on port 3000 and accepts traffic from anywhere. You can start it with `node app.js`. Once the server is running, you can test your API at `http://localhost:3000`.
```javascript
app.listen(port, () => {
console.log(Server running on http://localhost:${port});
});
```
## Dependencies

The application has the following dependencies:

- `dotenv`: Loads environment variables from a `.env` file.
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `mysql`: A pure node.js JavaScript Client implementing the MySQL protocol.

```json
{
"dependencies": {
"dotenv": "^16.3.1",
"express": "^4.18.2",
"mysql": "^2.18.1"
}
}
```
## Docker Build and Run Steps
This project includes a `Dockerfile` for containerization. Below are the steps to build and run the Docker container.

## Build the Docker Image
```bash
docker build -t your-image-name .
```
## Run the Docker Container
```bash
docker run --env-file .env -p 3000:3000 your-image-name
```
This will map port 3000 inside the Docker container to port 3001 on your host machine. Now, the application should be accessible at `http://localhost:3000`.

