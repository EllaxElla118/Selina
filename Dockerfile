# Base image
FROM node:slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install system dependencies required for whatsapp-web.js
RUN sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

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
