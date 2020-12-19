import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInput from 'react-native-paper/src/components/TextInput/TextInput';
import Header from '../componets/Header';
import Container from '../componets/ContainerMain';


const MainScreen = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState('');
  const [addOrremove, setAddOrRemove] = useState(false);
  const [type, setType] = useState('');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  var dia = date.getDate();
  var mes = (date.getMonth() + 1);
  var ano = date.getFullYear();
  var dataBR = dia + '/' + mes + '/' + ano;

  const data = [70, 40, 20, 80, 50, 90, 70, 80]; //Min 20, Max 90

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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#3FCC4D' />
      <Header data={data} />
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
            <View style={styles.selectButton}>
              <Text style={styles.addButtonText}>
                Selecione
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
          <Text>
            Selecione o tipo de gasto
            </Text>
          <TouchableNativeFeedback
            onPress={showAndHideModal}>
            <View style={styles.dateButton}>
              <Text style={styles.addButtonText}>
                Fechar Modal
              </Text>
            </View>
          </TouchableNativeFeedback>
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
          onPress={() => { navigation.goBack(); }}>
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
  modalButton: {
    backgroundColor: '#78FF86',
    borderRadius: 20,
  },
  modalView: {
    margin: 20,
    marginTop: '50%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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