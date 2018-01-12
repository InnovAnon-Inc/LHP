#! /bin/sh
set -ex

# add a new submodule

test $# -ne 0 || exit 1

for k in $@ ; do
	git submodule add $k
done

./submodule_checkout.sh
