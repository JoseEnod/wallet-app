import React, { useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const Header = () => {
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
        let total = data.reduce((soma, atual) => {
          return Number(soma) + Number(atual.value)
        }, []);

        setTotalValue(total);
      }
    })
  });

  const data = [70, 40, 20, 80, 50, 90, 20, 80]; //Min 20, Max 90

  return (
    <>
      <View style={styles.containerHead} >
        <Text style={styles.mainValue}>R$ {totalValue.toFixed(2).replace('.', ',')}</Text>
      </View>
      <AreaChart
        style={{ height: 80, marginTop: -55, width: '100%' }}
        data={data}
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