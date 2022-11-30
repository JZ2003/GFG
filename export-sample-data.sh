#!/bin/bash
echo "Exporting sample data..."
cd ./backend/database
node export.js
echo "Sample data exported."