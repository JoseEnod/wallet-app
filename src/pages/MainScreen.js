import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  StatusBar,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { PieChart } from 'react-native-svg-charts';

import Header from '../componets/Header';
import Container from '../componets/ContainerMain';
import defaultData from '../data/default';

const MainScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  const colors = defaultData.colorsMainPage;

  const getStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@itensData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      alert('Houve um erro ao receber os dados!');
    }
  }

  useFocusEffect(() => {
    getStorage().then((data) => {
      if (data !== null) {
        setData(data);
        setIsLoad(false);
      }
    })
  });

  const totalCategories = {};

  const pie = data.map((dataAtual) => {
    if (totalCategories[dataAtual.categoria] == undefined) {
      totalCategories[dataAtual.categoria] = 0;
    }

    totalCategories[dataAtual.categoria] += dataAtual.value;
  });

  const pieData =
    Object.keys(totalCategories).map((key, index) => {

      if (totalCategories[key] < 0) {
        totalCategories[key] = (totalCategories[key] *= -1);
      }

      return {
        value: totalCategories[key],
        svg: {
          fill: colors[key],
        },
        key: key,
      }
    })

  // console.log(Object.keys(totalCategories).length);
  // console.log(totalCategories);
  // console.log(pieData);

  // const reduz = pie.length - 4;
  // pie.splice(0, reduz);

  // const pieData = [
  //   {
  //     value: 50.5,
  //     svg: {
  //       fill: '#8DEDFF',
  //     },
  //     key: 'Comida',
  //   },
  //   {
  //     value: 40.2,
  //     svg: {
  //       fill: '#FCFF5A',
  //     },
  //     key: 'Internet',
  //   },
  //   {
  //     value: 10.1,
  //     svg: {
  //       fill: '#FF26E6',
  //     },
  //     key: 'Energia',
  //   },
  //   {
  //     value: 10.1,
  //     svg: {
  //       fill: '#78FF86',
  //     },
  //     key: 'Outros',
  //   },
  // ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#3FCC4D' />
      <Header />
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
            {isLoad ?
              (<View>
                <Text>
                  Começe a adicionar suas compras
                </Text>
              </View>) :
              data.slice(0).reverse().map((data, index) => {
                return (
                  <View key={`${data.name}-${data.date}-${data.value}-${index}`}>
                    <View
                      style={styles.itensListBlock2}>
                      <View style={styles.itensAndColorsBlock2}>
                        <View
                          style={[
                            styles.miniCircle,
                            { backgroundColor: colors[data.categoria] }
                          ]}
                        />
                        <Text style={styles.itemNameBlock2}>{data.name}</Text>
                      </View>
                      <Text style={styles.numberValuePie}>
                        R$ {String(data.value).replace('.', ',')}
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