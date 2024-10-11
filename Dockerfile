# Base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install system dependencies required for whatsapp-web.js
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    nodejs \
    yarn \
    bash

# Set environment variable for Puppeteer to use Chromium from Alpine
ENV PUPPETEER_SKIP_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy package.json and yarn.lock to the container
COPY package.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the project files to the container
COPY . .

# Expose the port that your WhatsApp bot will run on, if applicable
EXPOSE 4433

# Start the bot
CMD ["yarn", "dev"]
