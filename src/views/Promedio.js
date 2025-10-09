import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { db } from "../database/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import TituloPromedio from "../components/TituloPromedio.js";
import TablaPromedio from "../components/TablaPromedio.js";
import FormularioPromedio from "../components/FormularioPromedio.js";

const Promedio = () => {
    const [data, setData] = useState([]);
    const [promedioCalculado, setPromedioCalculado] = useState(null);

    const cargarDatos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "edades"));
            const lista = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            
            setData(lista);
            if (lista.length > 0) {
                const edadesNumeros = lista
                    .map(item => parseInt(item.edad || 0))
                    .filter(num => !isNaN(num));
                
                if (edadesNumeros.length > 0) {
                    const promedioLocal = edadesNumeros.reduce((acc, val) => acc + val, 0) / edadesNumeros.length;
                    setPromedioCalculado(promedioLocal);
                    
                    try {
                        await calcularPromedioAPI(edadesNumeros);
                    } catch (apiError) {
                        // Ignora error de API, usa local
                    }
                } else {
                    setPromedioCalculado(null);
                }
            } else {
                setPromedioCalculado(null);
            }
        } catch (error) {
            console.error("Error al obtener documentos: ", error);
        }
    };

    const eliminarPromedio = async (id) => {
        try {
            await deleteDoc(doc(db, "edades", id));
            cargarDatos();
        } catch (error) {
            console.error("Error al eliminar: ", error);
        }
    };

    const calcularPromedioAPI = async (listaEdades) => {
        try {
            const response = await fetch("https://njm21lriyg.execute-api.us-east-2.amazonaws.com/calcularpromedio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ edades: listaEdades }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.promedio !== null && !isNaN(result.promedio)) {
                setPromedioCalculado(parseFloat(result.promedio));
            }
        } catch (error) {
            // Ignora error, mantiene local
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <View style={styles.container}>
            <TituloPromedio promedio={promedioCalculado} />
            <FormularioPromedio cargarDatos={cargarDatos} />
            <TablaPromedio 
                promedio={data}
                eliminarPromedio={eliminarPromedio} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default Promedio;