#!/bin/bash

cd server/ && (npm start &) && echo "Server started"
cd ../application/ && (npm start &) && echo "Client started"
