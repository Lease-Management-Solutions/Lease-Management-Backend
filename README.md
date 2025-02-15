# Lease Management Backend

## Project Setup

This project requires the following configuration files to ensure proper setup and execution.

### Configuration Files

`package.json` & `package-lock.json`

- Defines project dependencies and scripts.

- Ensures package versions remain consistent across environments.

`Dockerfile`

- Specifies the backend container setup.

- Includes installation of dependencies and environment setup.

`tsconfig.json`

- Defines TypeScript compiler options.

- Ensures consistent type checking and transpilation settings.

`.dockerignore`

- Specifies files and directories to be excluded from the Docker build context.

- Prevents unnecessary files from being included in the image.

`.env.example`

- Provides a template for required environment variables.

- Helps developers configure their local .env file correctly.

### Next Steps

After cloning the repository, set up your `.env` file based on `.env.example`, install dependencies by running:

```bash
npm install
```
### Database Configuration
By default, the API is set up to connect to MongoDB inside a Docker container. If running the database in a container, keep the following .env configuration:

```bash
MONGO_URL=mongodb://admin:secret@mongodb:27017/lease-management?authSource=admin
```

However, if you are running MongoDB locally (outside Docker), update the .env file to:]

```bash
MONGO_URL=mongodb://admin:secret@localhost:27017/lease-management?authSource=admin
```