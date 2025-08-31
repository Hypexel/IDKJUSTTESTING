#!/bin/sh
# Usage: /entrypoint.sh /project /out maven|gradle
PROJECT_DIR=$1
OUT_DIR=$2
TYPE=$3
cd "$PROJECT_DIR" || exit 1
if [ "$TYPE" = "maven" ]; then
mvn -B -U -DskipTests package
elif [ "$TYPE" = "gradle" ]; then
chmod +x gradlew || true
./gradlew --no-daemon build
else
echo "unknown build type"
exit 2
fi
# copy jars to out
find . -name "*.jar" -type f -print -exec cp {} "$OUT_DIR" \;
