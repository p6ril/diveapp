# -a, --archive is equivalent to -rlptgoD
# -E, --executability preserve executability
# -g, --group preserve group
# -l, --links copy symlinks as symplinks
# -o, --owner preserve owner (super-user only)
# -p, --perms, preserve permissions
# -r, --recursive recurse into directories
# -t, --times preserve modification times
# -v, --verbose
# -X --xattrs preserve extended attributes
rsync -aXEv --delete \
      --exclude=.git \
      --exclude=.gitignore \
      --exclude=node_modules \
      --exclude=LICENSE \
      --exclude=README.md \
      ./ ../pub

cd ../pub
rm -rf docs
mv build docs
cd docs
sed -i -e 's/href="\//href=".\//g' -e 's/src="\//src=".\//g' index.html
cd ..
