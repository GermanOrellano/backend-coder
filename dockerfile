#definimos que tipo de aplicación vamos a definir
FROM node

#definimos donde se va a guardar el proyecto/imagen 
WORKDIR /appcoder

#copio/muevo el package de la aplicación desde el servidor hacia el contenedor
COPY package*.json ./

#instalo paquetes
RUN npm install

#copiamos el resto de los archivos del server al contenedor
COPY . .

#configuramos puerto de exposición
EXPOSE 9000

#configurar el comando de ejecución del servidor
CMD ["npm","start"]