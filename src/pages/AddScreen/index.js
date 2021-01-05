import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInput from 'react-native-paper/src/components/TextInput/TextInput';

import Header from '../../componets/Header';
import Container from '../../componets/ContainerMain';
import defaultData from '../../data/default';


const MainScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState('');
  const [addOrremove, setAddOrRemove] = useState(false);
  const [categorieSelected, setCategorieSelected] = useState('');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  var dia = date.getDate();
  var mes = date.getMonth();
  var ano = date.getFullYear();
  var dataBR = dia + '/' + (mes + 1) + '/' + ano;

  const categories = defaultData.categories;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDate = () => {
    showMode('date');
  };

  const positiveOrNegative = () => {
    if (addOrremove)
      setAddOrRemove(false);
    else
      setAddOrRemove(true);
  }

  const showAndHideModal = () => {
    if (showModal)
      setShowModal(false);
    else
      setShowModal(true);
  }

  const selectCategorie = (categorie) => {
    setCategorieSelected(categorie);
    setShowModal(false);
  }

  const getStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@itensData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      alert('Houve um erro ao receber os dados!');
    }
  }

  const saveInStorage = async (valueForSave) => {
    try {
      const jsonValue = JSON.stringify(valueForSave)
      await AsyncStorage.setItem('@itensData', jsonValue);
    } catch (e) {
      alert('Houve um erro ao salvar os dados!');
    }
  }

  const saveData = async () => {
    let finalValue = value;

    if (value <= 0 && addOrremove) {
      finalValue = (finalValue *= -1);
    } else if (value >= 0 && addOrremove === false) {
      finalValue = (finalValue *= -1);
    }

    const getData = await getStorage();

    let dataInfo = await (getData != null ? getData : []);

    dataInfo.push({
      name,
      date: dataBR,
      value: Number(finalValue),
      categoria: categorieSelected,
    });

    saveInStorage(dataInfo);

    console.log(dataInfo, finalValue);

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#3FCC4D' />
      <Header />
      <Container
        style={styles.formContainer}
      >
        <TextInput
          theme={{
            colors: {
              primary: 'grey',
              underlineColor: 'transparent',
            }
          }}
          style={styles.textInput}
          label="Nome"
          mode='outlined'
          value={name}
          onChangeText={text => setName(text)}
        />
        <View style={styles.buttonsRowContainer}>
          <TouchableNativeFeedback
            onPress={showDate}>
            <View style={styles.dateButton}>
              <Text style={styles.addButtonText}>
                {dataBR}
              </Text>
            </View>
          </TouchableNativeFeedback>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <TextInput
            theme={{
              colors: {
                primary: 'grey',
                underlineColor: 'transparent',
              }
            }}
            style={styles.valueInput}
            label={addOrremove ? 'R$ +' : 'R$ -'}
            mode='outlined'
            value={value}
            keyboardType='numeric'
            onChangeText={text => setValue(text)}
          />
        </View>
        <View style={styles.buttonsRowContainer}>
          <TouchableNativeFeedback
            onPress={positiveOrNegative}>
            {
              addOrremove ? (
                <View style={styles.positiveOrNegativeButton}>
                  <Text style={styles.addButtonText}>
                    R$ +
                  </Text>
                </View>) : (
                  <View style={[styles.positiveOrNegativeButton,
                  { backgroundColor: '#FF8A8A' }]}>
                    <Text style={styles.addButtonText}>
                      R$ -
                    </Text>
                  </View>)
            }
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={showAndHideModal}>
            <View style={[styles.selectButton,
            categorieSelected !== '' ?
              { backgroundColor: defaultData.colorsMainPage[categorieSelected] } : '']}>
              <Text style={styles.addButtonText}>
                {categorieSelected !== '' ?
                  categorieSelected : 'Selecione'}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Container>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.titleModal}>
            Categoria do gasto
            </Text>
          {categories.map(categorie => {
            return (
              <TouchableNativeFeedback
                key={`${categorie.name}-${categorie.color}`}
                onPress={() => selectCategorie(categorie.name)}>
                <View style={[
                  styles.modalButton,
                  { backgroundColor: categorie.color }
                ]}>
                  <Text style={styles.addButtonText}>
                    {categorie.name}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            )
          })}
        </View>
      </Modal>
      <View style={styles.buttons}>
        <TouchableNativeFeedback
          onPress={() => { navigation.goBack(); }}>
          <View style={[styles.button, { backgroundColor: '#FF0000' }]}>
            <Text style={styles.addButtonText}>
              Cancelar
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={saveData}>
          <View style={[styles.button, { backgroundColor: '#00CD15' }]}>
            <Text style={styles.addButtonText}>
              Adicionar
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  formContainer: {
    height: 280,
    alignItems: 'center'
  },
  textInput: {
    width: '90%',
    maxWidth: 300,
    backgroundColor: '#FFF',
  },
  dateButton: {
    width: '35%',
    height: 55,
    maxWidth: 200,
    backgroundColor: '#78FF86',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 8,
    alignItems: 'center'
  },
  valueInput: {
    width: '50%',
    maxWidth: 300,
    backgroundColor: '#FFF'
  },
  selectButton: {
    width: '50%',
    height: 45,
    backgroundColor: '#78FF86',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    height: '90%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15
  },
  titleModal: {
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalButton: {
    height: 45,
    width: '90%',
    borderRadius: 13,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positiveOrNegativeButton: {
    width: '30%',
    height: 45,
    backgroundColor: '#78FF86',
    borderRadius: 10,
    marginLeft: '2%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsRowContainer: {
    marginTop: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttons: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    height: 45,
    width: 120,
    borderRadius: 13,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 9,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MainScreen;