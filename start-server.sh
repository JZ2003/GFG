#!/bin/bash
cd backend
# Start the database
brew services start mongodb-community@6.0
# Start the node server
node backend