# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests -U

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/portal-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 10000
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
