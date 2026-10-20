#!/bin/bash
# Start the production server in a fully detached background process.
# Uses setsid + nohup + redirect to ensure the server keeps running
# even after the parent shell exits.

cd /home/z/my-project

# Kill any existing server on port 3000
existing_pid=$(ss -tlnp 2>/dev/null | grep ":3000" | grep -oP 'pid=\K[0-9]+' | head -1)
if [ -n "$existing_pid" ]; then
  echo "Killing existing server on port 3000 (PID $existing_pid)"
  kill -9 "$existing_pid" 2>/dev/null
  sleep 1
fi

# Start the production server
PORT=3000 NODE_ENV=production \
  setsid nohup node .next/standalone/server.js \
  > /home/z/my-project/server.log 2>&1 < /dev/null &
SERVER_PID=$!
disown $SERVER_PID 2>/dev/null

# Wait a moment and verify
sleep 3
echo "Started server. PID: $SERVER_PID"
ps -p $SERVER_PID 2>/dev/null
ss -tlnp 2>/dev/null | grep ":3000"
