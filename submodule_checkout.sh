#! /bin/sh
set -ex

# run this script if you forgot to do a recursive clone

git submodule update --init --recursive

