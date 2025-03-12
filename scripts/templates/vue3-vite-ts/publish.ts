export default ({ packageName }: { packageName: string }): string => {
  return `#!/bin/bash

echo "[${packageName}]Enter publish version: "
read VERSION

read -p "Publishing - are you sure? (y/n)" -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # build
  # git checkout master
  npm run build
  BRANCH=$(git symbolic-ref --short HEAD)

  # Offer a menu to choose the NPM tag
  options=("latest" "next")
  echo "Select the package version mode"
  select TAG in "\${options[@]}"
  do
    case $TAG in
      "latest")
        echo "Publishing \$VERSION ..."

        echo "Changing NPM ver to \$VERSION"
        npm version \$VERSION

        echo "Publishing to NPM with 'latest' tag"
        npm publish --tag \$TAG
        break
        ;;
      "next")
        # Parse the current 'next' version
        CURRENT_NEXT_VERSION=\$(npm view ${packageName}@next version)

        # Extract the numeric part of the current 'next' version
        CURRENT_NEXT_VERSION_NUMERIC=\$(echo \$CURRENT_NEXT_VERSION | awk -F'.' '{print \$NF}')

        # Increment the numeric part
        NEXT_VERSION=\$((\$CURRENT_NEXT_VERSION_NUMERIC + 1))

        # Create the new 'next' version
        VERSION="\$VERSION-\$TAG.\$NEXT_VERSION"

        echo "Changing NPM ver to \$VERSION"
        npm version \$VERSION

        echo "Publishing \$VERSION ..."

        echo "Publishing to NPM with \$TAG tag"
        npm publish --tag \$TAG
        break
        ;;
      *)
        echo "Invalid option"
        ;;
    esac
  done

  echo "Add files to Git"
  git add *

  echo "Going to commit"
  git commit -m "v\$VERSION"

  echo "Going to tagging"
  git tag -a v\$VERSION -m "v\$VERSION"

  echo "Now push to Git"
  git push origin $BRANCH

  echo "Push tag to remote"
  git push origin "v\$VERSION"
fi
`;
};
