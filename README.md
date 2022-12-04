## Overview

NodeJS CLI program to fetch some digital coins values (which called portfolio ) depending on some parameters such as token type and date.
Download this [CSV file](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip) which includes the digital tokens data.

## Features

- get the latest portfolio value per token in USD (given no params)
- get the latest portfolio value for that token in USD (given token)
- get the portfolio value per token in USD on that date (given date)
- get the portfolio value of that token in USD on that date (given token & date)

## Architecture

- I had tried to load CSV file into memory directly during runtime but found heap limit allocation failed due to the size of the data in CSV (Almost 30000000 record).
- So tried another approah which is loading (importing) the CSV file into DB then do the calculations which will be much easier especially using the advantage of mongo queries and filters.
- picked MongoDB over relational DBs because of 2 factors:
  - SQL would be better choice for ACID and relational data.
  - NoSQL is more flexible & allowing scaling-out for large volumes of data which will be helpful in this case .

### Prerequisites

- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/home)
- [MongoDB CLI Database tools](https://www.mongodb.com/try/download/database-tools)

## MongoDB configuration

- add .env file with same provided values in .env.example
- Use MongoCompass GUI to import the data from the [CSV file](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip).
- Or you can use Mongo CLI to import the data:
  after downloading [MongoDB CLI Database tools](https://www.mongodb.com/try/download/database-tools), go into the CSV file directory and then run this command in terminal

```sh
$ mongoimport --type csv -d database -c portfolio --headerline --drop transactions.csv
```

## Installation

```sh
npm i
```

## Running for development

```sh
npm run start:dev
```

## Running for production

```sh
npm run start
```

## Stay in touch

- Author - [Mahmoud Magdy](mahmoudmagdymahmoud1@gmail.com)
