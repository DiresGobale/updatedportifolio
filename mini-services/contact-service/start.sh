#!/bin/bash
# Watchdog script that keeps the contact service running
cd /home/z/my-project/mini-services/contact-service

while true; do
  echo "[$(date)] Starting contact service..."
  bun index.ts
  echo "[$(date)] Service exited with code $?, restarting in 2s..."
  sleep 2
done
