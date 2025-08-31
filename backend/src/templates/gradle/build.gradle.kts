plugins {
java
}


java { toolchain { languageVersion.set(JavaLanguageVersion.of(21)) } }


repositories {
mavenCentral()
maven("https://repo.papermc.io/repository/maven-public/")
}


dependencies {
compileOnly("io.papermc.paper:paper-api:1.21.5-R0.1-SNAPSHOT")
}


tasks.withType<JavaCompile> {
options.encoding = "UTF-8"
}
