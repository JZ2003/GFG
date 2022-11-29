#!/bin/bash
echo "Loading sample data..."
cd ./backend/database
node import.js
echo "Sample data loaded."