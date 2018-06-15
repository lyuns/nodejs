#!/bin/sh

date +%Y-%m-%d__%H:%M:%S >> ./log/log && nohup node server.js >> ./log/log 2>&1 &
