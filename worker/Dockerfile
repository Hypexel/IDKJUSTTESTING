# Build runner image: JDK 21 + maven + gradle
FROM eclipse-temurin:21-jdk-alpine
RUN apk add --no-cache bash curl tar gzip
# Install maven
ARG MAVEN_VERSION=3.9.4
RUN mkdir -p /opt && \
curl -fsSL https://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz | tar -xz -C /opt && \
ln -s /opt/apache-maven-$MAVEN_VERSION/bin/mvn /usr/bin/mvn
# Install gradle (optional)
ARG GRADLE_VERSION=8.6
RUN wget https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -P /tmp && \
unzip /tmp/gradle-${GRADLE_VERSION}-bin.zip -d /opt && \
ln -s /opt/gradle-${GRADLE_VERSION}/bin/gradle /usr/bin/gradle
WORKDIR /work
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
