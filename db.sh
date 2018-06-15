#!/bin/sh

date +%Y-%m-%d__%H:%M:%S >> ./log/dblog && nohup mongod --auth --port 27017 --dbpath /data/db  >> ./log/dblog 2>&1 &
