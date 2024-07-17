import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [value, setValue] = useState(null)

const fetchLineas = async () => {
  const response = await globalThis.fetch('http://192.168.0.30:3000/api/numbers')
  const data = await response.json()
  setValue(data)
}

  useEffect(() => {
    fetchLineas()
  },[])

  const getInitial = (str) => {
    if (str && typeof str === 'string' && str.length > 0) {
      return str.charAt(0).toUpperCase();
    }
    return '';
  };

  console.log(value)

  const renderItem = ({ item }) => (
    <>
    <View style={styles.itemContainer}>
      <View style={styles.rowContainer}>
          <Text style={styles.inicial}>{getInitial(item.funcionarioData.nombre)}{getInitial(item.funcionarioData.apellido)}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.linea}>Línea: {item.linea}</Text>
          <Text style={styles.funcionario}>Funcionario: {item.funcionarioData.nombre} {item.funcionarioData.apellido}</Text>
          <Text style={styles.cliente}>Modelo: {item.modelo}</Text>
          <Text style={styles.formaContratacion}>Plan: {item.planData.nombre}</Text>
        </View>
      </View>
    </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={value}
        renderItem={renderItem}
        keyExtractor={item => item.linea}
      />
      <Text style={styles.from}>By - Nico</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: 'black',
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    marginVertical: 2,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inicial:{
    fontSize: 20,
    marginLeft: 20,
    color:'#0000ff'
  },
  infoContainer: {
    flex: 1,
    marginLeft: 30,
  },
  linea: {
    fontWeight: 'bold',
  },
  cuit: {
    fontWeight: 'bold',
    color: 'blue',
  },
  funcionario: {
  },
  cliente: {
  },
  formaContratacion: {
  },
  from: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
