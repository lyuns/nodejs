#!/bin/sh

date +%Y-%m-%d__%H:%M:%S >> log && nohup node server.js >> log 2>&1 &
