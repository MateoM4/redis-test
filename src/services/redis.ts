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

// El código es válido por 2 días (172800 segundos)
const duracion = 172800;

async function initializeRedis() {
    if (!client.isOpen) {
      await client.connect();
    }
}

export async function guardarAux(titulo: string, codigo: string) {
    await initializeRedis();
    const key = `confirmacion:${titulo}`;
  try {
    await client.setEx(key, 172800, codigo);
    console.log(`Código de confirmación guardado para ${titulo} con expiración de ${duracion} segundos.`);
  } catch (err) {
    console.error('Error al guardar el código de confirmación en Redis:', err);
  }
}