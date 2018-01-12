#! /bin/sh
set -ex

# update the submodules
#
# achtung! api or significant abi changes
# can break functionality in our code

git submodule foreach git pull origin master

