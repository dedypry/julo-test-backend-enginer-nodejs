###Git Clone
```json
https://github.com/dedypry/julo-test-backend-enginer-nodejs.git
```

###NPM Install

After cloning the repository, navigate into the project directory and run npm install to install the dependencies listed in the package.json file:

### .ENV
coppy .env.example to .env

```bash
cd repository
npm install
```
This will install all the required Node.js packages and their dependencies.

###Knex Migrate
To run database migrations using Knex, you can use the following command:
```bash
npx knex migrate:latest
```
This command will execute all the pending migrations, updating the database schema to the latest version.


###Knex Seed
To seed the database with data using Knex, use the following command:
```bash
npx knex seed:run
```

This command will execute all the seed files, populating the database with initial data.

Make sure you have configured Knex correctly with your database settings in the knexfile.js.
