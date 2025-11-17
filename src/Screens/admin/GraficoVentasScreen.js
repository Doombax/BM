import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "../../database/firebaseConfig";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function GraficoVentasScreen() {
    const [chartData, setChartData] = useState(null);
    const [productosMasVendidos, setProductosMasVendidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const procesarDatosVentas = async () => {
            try {
                setLoading(true);
                const snapshot = await getDocs(collectionGroup(db, "compras"));
                
                const ventasPorMes = {};
                const conteoProductos = {};

                snapshot.docs.forEach((doc) => {
                    const compra = doc.data();
                    if (compra.fecha && compra.total) {
                        const fecha = compra.fecha.toDate();
                        const mes = fecha.toLocaleString('es-NI', { month: 'short', year: '2-digit' });

                        if (!ventasPorMes[mes]) {
                            ventasPorMes[mes] = { total: 0, pedidos: 0 };
                        }
                        ventasPorMes[mes].total += compra.total;
                        ventasPorMes[mes].pedidos += 1;

                        compra.productos?.forEach(producto => {
                            if (producto.nombre && producto.cantidad) {
                                conteoProductos[producto.nombre] = (conteoProductos[producto.nombre] || 0) + producto.cantidad;
                            }
                        });
                    }
                });

                const labels = Object.keys(ventasPorMes).reverse();
                const dataTotal = labels.map(mes => ventasPorMes[mes].total);
                
                if (labels.length > 0) {
                    setChartData({
                        labels,
                        datasets: [
                            {
                                data: dataTotal,
                                color: (opacity = 1) => `rgba(217, 108, 159, ${opacity})`,
                                strokeWidth: 2,
                            },
                        ],
                        legend: ["Ingresos por Mes (C$)"],
                    });
                }

                const productosOrdenados = Object.entries(conteoProductos)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5); // Top 5 productos
                setProductosMasVendidos(productosOrdenados);

            } catch (err) {
                console.error("Error procesando datos de ventas:", err);
                setError("No se pudieron cargar los datos para el gráfico.");
            } finally {
                setLoading(false);
            }
        };

        procesarDatosVentas();
    }, []);

    if (loading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#D96C9F" /></View>;
    }

    if (error) {
        return <View style={styles.centered}><Text style={styles.errorText}>{error}</Text></View>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.titulo}>Análisis de Ventas</Text>

                {chartData ? (
                    <View>
                        <Text style={styles.subtitulo}>Ingresos Mensuales</Text>
                        <LineChart
                            data={chartData}
                            width={screenWidth - 32}
                            height={220}
                            yAxisLabel="C$"
                            yAxisInterval={1}
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                        />
                    </View>
                ) : (
                    <Text style={styles.infoText}>No hay datos de ventas para mostrar en el gráfico.</Text>
                )}

                <View style={styles.productosContainer}>
                    <Text style={styles.subtitulo}>Top 5 Productos Más Vendidos</Text>
                    {productosMasVendidos.length > 0 ? (
                        productosMasVendidos.map(([nombre, cantidad], index) => (
                            <View key={index} style={styles.productoItem}>
                                <Text style={styles.productoNombre}>{index + 1}. {nombre}</Text>
                                <Text style={styles.productoCantidad}>Vendidos: {cantidad}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.infoText}>No hay datos de productos vendidos.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const chartConfig = {
    backgroundColor: "#1E1E1E",
    backgroundGradientFrom: "#1E1E1E",
    backgroundGradientTo: "#1E1E1E",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#D96C9F",
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        margin: 16,
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        marginLeft: 16,
        marginBottom: 8,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
        alignSelf: 'center',
    },
    productosContainer: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    productoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1E1E1E',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    productoNombre: {
        color: '#fff',
        fontSize: 16,
    },
    productoCantidad: {
        color: '#D96C9F',
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoText: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});