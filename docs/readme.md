# Documentación de la API de Gestión de Eventos

## Descripción General

Esta documentación ofrece una visión detallada de la API de Gestión de Eventos, incluyendo todos los endpoints disponibles, parámetros de solicitud y formatos de respuesta.

## Swagger UI

Para visualizar e interactuar con la API, puedes utilizar [Swagger UI](https://swagger.io/tools/swagger-ui/). Simplemente aloja el archivo `swagger.yaml` en un servidor web o usa una instalación local de Swagger UI.

## Ejecutar Swagger UI Localmente

1. Instala [Swagger UI](https://swagger.io/tools/swagger-ui/).
2. Coloca el archivo `swagger.yaml` en el directorio de `swagger-ui`.
3. Actualiza el parámetro `url` en `index.html` de Swagger UI para que apunte a `swagger.yaml`.
4. Abre `index.html` en tu navegador.

## Usando Docker

También puedes usar Docker para ejecutar Swagger UI con el siguiente comando:

```bash
docker run -p 8080:8080 -e SWAGGER_JSON=/swagger.yaml -v $(pwd)/swagger.yaml:/swagger.yaml swaggerapi/swagger-ui
