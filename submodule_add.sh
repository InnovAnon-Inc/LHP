#! /usr/bin/env bash
set -exu

# add a new submodule

(( $# != 0 )) || exit 1

for k in $@ ; do
	git submodule add $k
done

./submodule_checkout.sh

