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

### Use
Go to [http://localhost:3000/](http://localhost:3000/)
