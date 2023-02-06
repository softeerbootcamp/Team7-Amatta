FROM openjdk:11-jdk-slim
EXPOSE 8080
COPY build/libs/amatta_server-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]