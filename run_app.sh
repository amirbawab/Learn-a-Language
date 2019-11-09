#!/bin/bash

cd server/ && (npm start &)
cd ../application/ && npm start
