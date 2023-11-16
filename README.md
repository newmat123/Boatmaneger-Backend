# MYBoat-Backend

Backend in express with drizzle

# Useful commands

Start development backend
$ yarn start

Generate database migrations
$ yarn run generate
And uncomment the lines for migration in ./src/postgresql/index.ts

View database with drizzle studio
$ yarn drizzle-kit studio --host 127.0.0.1

## .env file

PORT="som port"
PGSQL_URI="postgres://"
LOCAL_IP="IPv4"
