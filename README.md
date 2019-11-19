# Learn a Language

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

## Import/Export Data Files
Simply copy the JSON data files into another project or for backup.

## Custom Properties
### Server
To change server properties, create `server.properties` file inside the `$REPO/server/` directory:
```
port=3001           # default is 3001
data_dir=/tmp/data  # default is './data'
```
