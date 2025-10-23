import React, { useState } from 'react';
import {Modal,View,Text,TouchableOpacity,FlatList,StyleSheet,} from 'react-native';

export default function ModalSelector({ label, value, options, onSelect }) {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setVisible(true)}>
        <Text style={styles.selectorText}>
          {value || 'Seleccionar categoría'}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  selector: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
  },
  selectorText: {
    color: '#fff',
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingVertical: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  optionText: {
    color: '#fff',
    fontSize: 15,
  },
});