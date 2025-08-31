#!/bin/sh
# Usage: /entrypoint.sh /project /out
PROJECT_DIR=$1
OUT_DIR=$2
TYPE=$3 # maven or gradle
BUILD_TIMEOUT=300
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
find . -name "*-SNAPSHOT.jar" -o -name "*-all.jar" -o -name "*.jar" -maxdepth 4 -type f -print -exec cp {} "$OUT_DIR" \;
