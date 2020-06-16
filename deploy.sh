#!/bin/bash
docker kill appserver appdb > /dev/null 2>&1
docker rm appserver appdb > /dev/null 2>&1
docker-compose up -d