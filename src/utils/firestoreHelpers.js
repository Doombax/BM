import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../database/firebaseConfig';

export const guardarCompra = async (producto) => {
  try {
    await addDoc(collection(db, 'compras'), {
      id_producto: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
      fecha: Timestamp.now(),
      cliente: 'cliente@gmail.com',
      foto: producto.foto,
    });
    console.log('Compra guardada');
  } catch (error) {
    console.error('Error al guardar compra:', error);
  }
};