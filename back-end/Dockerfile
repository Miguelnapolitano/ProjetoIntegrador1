FROM node:22-alpine

RUN apk add --no-cache libc6-compat openssl openssl-dev

# Set the working directory (home directory of the user)
WORKDIR /home/node/app

RUN chown -R node:node /home/node/app;

# Set the user to the non-root user created
USER node

# Copy package.json and package-lock.json (if available) to the container
COPY --chown=node:node package*.json .

RUN npm install

# Copy the rest of the application files to the container
COPY --chown=node:node . .

# Rebuild Prisma client after schema changes
RUN npx prisma generate

# Expose the port the app runs on (you can modify if needed)
EXPOSE 3000

# Command to run the Node.js application
CMD ["node", "src/app.js"]