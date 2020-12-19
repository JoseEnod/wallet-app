import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

const ContainerMain = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.titleContainer}>{props.title}</Text>
      {props.children}
      {props.more ? (<View style={styles.textsMore}>
        <Text style={styles.textMore}>Últimos itens</Text>
      </View>) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '93%',
    height: 170,
    alignSelf: 'center',
    //Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  titleContainer: {
    marginLeft: 9,
    marginTop: 5,
    fontSize: 14,
    opacity: 0.7,
    fontWeight: "bold"
  },
  textsMore: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    paddingHorizontal: 10,

    position: "absolute",
    bottom: 5,
  },
  textMore: {
    fontSize: 10,
    opacity: 0.6
  },
});

export default ContainerMain;