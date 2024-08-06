## Installation

- install postgresql
- install redis
- open project and run:

```bash
$ npm i
```

## Running the app

```bash
# ts-node
$ npm run start

# devlopement + nodemon
$ npm run dev

# production mode
$ npm run build

# for eslint check and fix
$ npm run lint

# for run test
$ npm run test

# for run test windows
$ npm run test:w
```

## App cli Scripts

- create Module :

```bash
app-cli module <name>
```

## Sequilize Scripts

- [sequelize Migration , Model , Seed Docs](https://sequelize.org/master/manual/migrations.html)
- Create Database sellers
- Run Migration

```bash
npx sequelize-cli db:migrate
```

- Run Seed :

```bash
npx sequelize-cli db:seed:all
```

## create new migration

    $npx sequelize-cli migration:create --name {tableName}

## create new seeder

```
npx sequelize-cli seed:generate --name default-register-request
```
