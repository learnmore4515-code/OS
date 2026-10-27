#!/bin/sh
set -e
cd demo/healthy
export PORT=3000
exec node .next/standalone/server.js
