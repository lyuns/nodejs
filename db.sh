#!/bin/sh

date +%Y-%m-%d__%H:%M:%S >> ./log/dblog && nohup mongod >> ./log/dblog 2>&1 &
