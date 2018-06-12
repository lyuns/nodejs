#!/bin/sh

kill -9 `lsof -i:8888 | grep 'node' | awk '{print $2}'`
