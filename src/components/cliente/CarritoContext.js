import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const data = await AsyncStorage.getItem("carrito");
        if (data) {
          setCarrito(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error cargando carrito:", error);
      }
    };
    cargarCarrito();
  }, []);

 
  useEffect(() => {
    const guardarCarrito = async () => {
      try {
        await AsyncStorage.setItem("carrito", JSON.stringify(carrito));
      } catch (error) {
        console.error("Error guardando carrito:", error);
      }
    };
    guardarCarrito();
  }, [carrito]);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const index = prev.findIndex((p) => p.id === producto.id);
      if (index !== -1) {
        const nuevo = [...prev];
        nuevo[index].cantidad += 1;
        nuevo[index].subtotal = nuevo[index].cantidad * nuevo[index].precio;
        return nuevo;
      }
      return [...prev, { ...producto, cantidad: 1, subtotal: producto.precio }];
    });
  };

  const actualizarCantidad = (id, cantidad) => {
    setCarrito((prev) =>
      prev.map((p) => {
        const nuevaCantidad = Math.max(1, cantidad);
        return p.id === id
          ? { ...p, cantidad: nuevaCantidad, subtotal: p.precio * nuevaCantidad }
          : p;
      })
    );
  };

  const limpiarCarrito = async () => {
    setCarrito([]);
    await AsyncStorage.removeItem("carrito");
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarProducto, actualizarCantidad, limpiarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};