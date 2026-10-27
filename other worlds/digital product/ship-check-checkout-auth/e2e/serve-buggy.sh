#!/bin/sh
set -e
cd demo/buggy
export PORT=3001
exec node .next/standalone/server.js
