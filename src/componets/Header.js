import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const Header = (props) => {
  return (
    <>
      <View style={styles.containerHead} >
        <Text style={styles.mainValue}>R$202,30</Text>
      </View>
      <AreaChart
        style={{ height: 80, marginTop: -55, width: '100%' }}
        data={props.data}
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