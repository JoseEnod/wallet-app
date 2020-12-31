import React, { useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const Header = () => {
  const [values, setValues] = useState([0]);
  const [totalValue, setTotalValue] = useState(0);

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
        const dataValues = data.map((data) => {
          return Number(data.value);
        }, []);

        setValues(dataValues.map((data) => {

          if (data < 0) {
            data = (data *= -1);
          }

          if (data >= 900) {
            data = 90;
          } else if (data >= 300) {
            data /= 10;
          } else {
            data /= 10;
            data += 20;
          }

          return Number(data); //Min 20, Max 90
        }));

        setTotalValue(
          dataValues.reduce((total, atual) =>
            Number(total) + Number(atual)))
      }
    })
  });

  return (
    <>
      <View style={styles.containerHead} >
        <Text style={styles.mainValue}>R$ {totalValue.toFixed(2).replace('.', ',')}</Text>
      </View>
      <AreaChart
        style={{ height: 80, marginTop: -55, width: '100%' }}
        data={values.length > 2 ? values : [0]}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
        svg={{ fill: '#FFF' }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainValue: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 33,
    marginTop: 27
  },
  containerHead: {
    width: '100%',
    backgroundColor: '#3FCC4D',
    height: 130,
    alignItems: 'center',
  },
});

export default Header;