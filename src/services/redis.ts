"use server";
// Redis es una base de datos en memoria que se utiliza para almacenar datos en caché
// Sirve para guardar temporalmente los códigos de confirmación para las solicitudes.

import { createClient } from "redis";

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: Number(process.env.REDIS_PORT),
    }
});

client.on('error', (err) => {
  console.error('Error al conectar con Redis:', err);
});

client.on('connect', () => {
  console.log('Conexión exitosa con Redis');
});



async function initializeRedis() {
    if (!client.isOpen) {
      await client.connect();
    }
}

export async function guardarAux(titulo: string, codigo: string) {
    await initializeRedis();
    const key = `${titulo}`;
  try {
    // Guarda el código en Redis con una expiración de 48 horas (172800 segundos)
    await client.setEx(key, 172800, codigo);
    console.log(`AUX guardado en Redis: ${key} = ${codigo}`);
  } catch (err) {
    console.error('Error al guardar el AUX en Redis:', err);
  }
}