#!/bin/bash -x

REMOTE_DIR=react-build/

ssh_webpage.sh "mkdir -m 775 $REMOTE_DIR"
rsync -ravz --exclude '.env'  --exclude '.git/' --exclude 'node_modules/' ./build/ webpage:$REMOTE_DIR
ssh_webpage.sh "find $REMOTE_DIR -type d -exec sudo chmod 775 {} \;"
ssh_webpage.sh "find $REMOTE_DIR -type f -exec sudo chmod 644 {} \;"
