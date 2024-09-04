# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install --production

# Copia el resto del código de la aplicación
COPY . .

# Compila el código TypeScript
RUN npm run build

# Etapa 2: Imagen final
FROM node:18-alpine

# Establece el directorio de trabajo en la imagen final
WORKDIR /usr/src/app

# Copia las dependencias instaladas de la etapa de construcción
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copia el código compilado y otros archivos necesarios
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Establece la variable de entorno NODE_ENV en producción
ENV NODE_ENV=production

# Comando para ejecutar la aplicación
CMD ["node", "dist/main/server.js"]
