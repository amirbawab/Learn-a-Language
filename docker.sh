#!/bin/bash

########################################
# THIS SCRIPT IS USED BY DOCKER.       #
# IF YOU ARE NOT USING DOCKER,         #
# THEN IGNORE THIS FILE AND FOLLOW     #
# THE INSTRUCTIONS IN THE README FILE  #
########################################

cd server/ && (npm start &)
cd ../application/ && npm start
