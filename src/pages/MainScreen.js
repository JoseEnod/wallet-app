import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  StatusBar,
  ScrollView,
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { useNavigation } from '@react-navigation/native';

import Header from '../componets/Header';
import Container from '../componets/ContainerMain';

const MainScreen = () => {
  const navigation = useNavigation();

  const colors = {
    Comida: '#8DEDFF',
    Internet: '#FCFF5A',
    Energia: '#FF26E6',
    Outros: '#78FF86',
  }

  const dataItens = [
    {
      key: 'Comida',
      name: 'Pastelzim',
      value: 13.5,
      date: '10/02/2021'
    },
    {
      key: 'Internet',
      name: 'Boleto da net',
      value: 95.1,
      date: '15/05/2020'
    },
    {
      key: 'Energia',
      name: 'Boleto da Luz',
      value: 83.8,
      date: '13/02/2020'
    },
    {
      key: 'Comida',
      name: 'Pastelzi',
      value: 13.5,
      date: '10/02/2021'
    },
    {
      key: 'Internet',
      name: 'Boleto da n',
      value: 95.1,
      date: '15/05/2020'
    },
    {
      key: 'Energia',
      name: 'Boleto da L',
      value: 83.8,
      date: '13/02/2020'
    },

  ]

  const data = [70, 40, 20, 80, 50, 90, 70, 80]; //Min 20, Max 90
  const pieData = [
    {
      value: 50.5,
      svg: {
        fill: '#8DEDFF',
      },
      key: 'Comida',
    },
    {
      value: 40.2,
      svg: {
        fill: '#FCFF5A',
      },
      key: 'Internet',
    },
    {
      value: 10.1,
      svg: {
        fill: '#FF26E6',
      },
      key: 'Energia',
    },
    {
      value: 10.1,
      svg: {
        fill: '#78FF86',
      },
      key: 'Outros',
    },
  ];


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#3FCC4D' />
      <Header data={data} />
      <Container
        title='Categorias'
        style={styles.container1}
        more={true}
      >
        <View style={styles.dataPieRow} >
          <PieChart
            style={styles.pieChart}
            data={pieData}
            outerRadius={'100%'}
            innerRadius={'80%'}
            padAngle={0.02}
          />
          <View
            style={styles.list}>
            {pieData.map((data, index) => {
              return (
                <View
                  key={data.key}
                  style={styles.itensList}>
                  <View
                    style={
                      [styles.miniCircle, { backgroundColor: data.svg.fill }]
                    }
                  />
                  <Text>{data.key}</Text>
                  <Text style={styles.numberValuePie}>
                    R${String(data.value).replace('.', ',')}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </Container>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate('Adicionar');
        }}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </View>
      </TouchableNativeFeedback>
      <View style={styles.storyList}>
        <Text style={styles.titleList2}>Últimos lançamentos</Text>
        <ScrollView>
          <View
            style={styles.list}>
            {dataItens.map((data, index) => {
              return (
                <View key={`${data.name}-${data.date}-${data.value}`}>
                  <View
                    style={styles.itensListBlock2}>
                    <View style={styles.itensAndColorsBlock2}>
                      <View
                        style={[
                          styles.miniCircle,
                          { backgroundColor: colors[data.key] }
                        ]}
                      />
                      <Text style={styles.itemNameBlock2}>{data.name}</Text>
                    </View>
                    <Text style={styles.numberValuePie}>
                      R${String(data.value).replace('.', ',')}
                    </Text>
                  </View>
                  <View style={styles.itensAndColorsBlock2}>
                    <View style={styles.divisorValues} />
                    <Text style={styles.dateBlock2}>{data.date}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container1: {
    height: 160
  },
  pieChart: {
    height: 90,
    width: 90,
    marginTop: 15
  },
  dataPieRow: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  list: {
    justifyContent: "space-evenly",
    marginTop: 10
  },
  miniCircle: {
    width: 13,
    height: 13,
    borderRadius: 50,
    marginTop: 4,
    marginRight: 6
  },
  itensList: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  numberValuePie: {
    marginLeft: 30
  },
  itensListBlock2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 4
  },
  titleList2: {
    marginTop: -5,
    fontSize: 15,
    opacity: 0.7,
    fontWeight: "bold"
  },
  itemNameBlock2: {
    fontSize: 14.5,
    marginTop: -1,
  },
  itensAndColorsBlock2: {
    flexDirection: 'row',
  },
  divisorValues: {
    height: 14,
    width: 1.5,
    backgroundColor: 'grey',
    opacity: 0.2,
    marginLeft: 25,
  },
  dateBlock2: {
    fontSize: 9,
    opacity: 0.6,
    marginLeft: 13,
    marginTop: -5.5
  },
  storyList: {
    height: 220,
    paddingHorizontal: 20
  },
  addButton: {
    backgroundColor: '#3FCC4D',
    height: 55,
    width: 55,
    borderRadius: 50,
    marginTop: -27.5,
    elevation: 11,
    alignItems: "center",
    justifyContent: 'center',
    right: "-80%"
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32.5,
    fontWeight: "bold",
    marginTop: -5
  },
});

export default MainScreen;