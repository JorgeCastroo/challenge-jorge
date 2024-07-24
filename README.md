## Project Startup

- **Create a [`.env`] file in the root directory of the project.** Copy the contents from `.env.example` (if available) or use the following template:

```plaintext
DATABASE_URL="postgresql://docker:docker@localhost:5432/dbname?schema=public"
JWT_KEY='challenge-jorge-api'
```

Ensure to replace `dbname` with your actual database name and adjust other values as necessary.

- Install dependencies:

```zsh
npm install
```

- Start the project:

```zsh
docker compose up -d
npx prisma migrate dev
npm run dev
```

## Project Structure and Folder Organization

```
|-- node_modules  # Installed modules/libraries
|-- prisma
     |-- migrations  # Migration files
     schema.prisma   # Prisma schema file
|-- src  # Source code
    |-- @types  # TypeScript type declarations
    |-- database  # Database access and models
    |-- interfaces  # TypeScript interfaces for data models
    |-- repositories  # Data access layer, often interfaces for database operations
    |-- routes  # API routes/endpoints
    |-- types  # Custom TypeScript types or enums
    |-- usecases # Business logic implementations
    |-- utils  # Utility functions and helpers


  .env            # Environment variables
  .gitignore      # Specifies intentionally untracked files to ignore
  docker-compose.yml  # Docker compose configuration
  package-lock.json   # Automatically generated for any operations where npm modifies either the node_modules tree, or package.json
  package.json    # Project metadata and dependencies
  README.md       # Project overview and documentation
  tsconfig.json   # TypeScript compiler configuration

```






