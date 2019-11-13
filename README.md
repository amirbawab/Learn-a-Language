# Learn a Language [![Build Status](https://travis-ci.org/amirbawab/Learn-a-Language.svg?branch=master)](https://travis-ci.org/amirbawab/Learn-a-Language)

## Live Demo
[Demo Link](https://amirbawab.github.io/Learn-a-Language/application/)  
**Note:** All data are cleared upon refresh

## Table of Contents
- [Manually](#manually)
  - [Build](#build)
    - [Front-end](#front-end)
    - [Back-end](#back-end)
  - [Run](#run)
    - [Front-end](#front-end-1)
    - [Back-end](#back-end-1)
  - [Data Files](#data-files)
- [Docker](#docker)
  - [Build](#build-1)
  - [Run](#run-1)
  - [Data Files](#data-files-1)
- [Usage](#usage)
- [Import/Export Data Files](#importexport-data-files)
- [Custom Properties](#custom-properties)
  - [Server](#server)

## Manually
### Build
#### Front-end
```
cd $REPO/application
npm install
npm run build
```
#### Back-end
```
cd $REPO/server
npm install
```
### Run
#### Front-end
Open `$REPO/application/build/index.html` page in your browser.  

#### Back-end
```
cd $REPO/server
npm start
```
### Data Files
By default, data files are stored under "$REPO/server/data/". For more info check [Custom Properties](#custom-properties).

## Docker
### Build
```
sudo docker build -t learn-a-language:latest .
```
### Run
```
sudo docker run --name example -p 3000:3000 -p 3001:3001 -v $REPO/server/data:/usr/src/app/server/data -it learn-a-language:latest
```
### Data Files
To access the data files, make sure to share the volume "server/data/" between the host and the container as
shown in the [Run](#run-1) section.

## Usage
Go to [http://localhost:3000/](http://localhost:3000/)

## Import/Export Data Files
Simply copy the JSON data files into another project or for backup.

## Custom Properties
### Server
To change server properties, create `server.properties` file inside the `$REPO/server/` directory:
```
port=3001           # default is 3001
data_dir=/tmp/data  # default is './data'
```
