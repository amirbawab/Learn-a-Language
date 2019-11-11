# Learn A Language

## Docker
### Build
```
sudo docker build -t learn-a-language:latest .
```
### Run
```
sudo docker run --name example -p 3000:3000 -p 3001:3001 -v $PWD/server/data:/usr/src/app/server/data -it learn-a-language:latest
```

### Data Files
To access the data files, make sure to share the volume "server/data/" between the host and the container as
shown in the [Run](#run) section

## Manually
### Build and Start Fontend
```
cd application
npm install
npm start
```

### Build and Start Backend
```
cd server
npm install
npm start
```

### Data Files
By default, data files are stored under "server/data/"

## Use
Go to [http://localhost:3000/](http://localhost:3000/)

## Import/Export Data Files
Simply copy the JSON files in "server/data/" into another project or for backup

## Custom properties
To change server properties, create `server.properties` file inside the `server/` directory:
```
port=3001           # default is 3001
data_dir=/tmp/data  # default is './data'
```
