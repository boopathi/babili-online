#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

mkdir -p $DIR/../dist/static

rsync -rva $DIR/../assets/ $DIR/../dist/
