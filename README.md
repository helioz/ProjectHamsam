Local Setup
=============

Local npm install: `npm install`

Setup MongoDB:
----------------
`brew tap mongodb/brew`
`brew install mongodb-community`
`sudo mkdir -p /System/Volumes/Data/data/db`
```sudo chown -R `id -un` /System/Volumes/Data/data/db```
Start MongoDB: `brew services run mongodb-community` -> alias
Check status: `brew services list` -> alias
Stop MongoDB: `brew services stop mongodb-community` -> alias

Mongo shell: `mongo`

Install mongoDB compass if you dont prefer command line. (i don't for db)

Start mongodb-community
Open mongoDB compass
localhost:27017 by default
Connect to see the db and use in compass

Start node server: `npm start`

Deployment:

Create a PR to master.
Once PR is merged

ssh into the ec2 instance

`ssh -i "alohasharedkeypair.pem" ubuntu@ec2-54-174-190-38.compute-1.amazonaws.com`

delete existing docker container

```
docker ps
docker docker stop <container ID>
docker rm <container ID>
docker run -p 3000:3000 -d docker.io/soorejjones/aloha1:<commit-id>
````

Access your deployment at : 54.174.190.38:3000

