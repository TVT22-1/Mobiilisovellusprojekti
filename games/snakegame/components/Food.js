import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import Constants from './Constants';

const foods = [
    require('../assets/fly.png'),
    require('../assets/apple.png'),
    require('../assets/frog.png')
];

class Food extends Component {
    constructor(props){
        super(props);
    }

    render() {
        // const x = this.props.position[0];
        // const y = this.props.position[1];

        const { size, position } = this.props;
        const [x, y] = position;

        


        return (
            <View style={[styles.snakeFood, { width: this.props.size, height: this.props.size, left: x * this.props.size, top: y * this.props.size }]} >
              {/* <Image source={require('../assets/fly.png')}
              style={styles.image} /> */}
              <Image source={require('../assets/apple.png')}
              style={styles.image} />
              {/* <Image source={require('../assets/frog.png')}
              style={styles.image} /> */}


            </View>
        );
    }
}

const styles = StyleSheet.create({
    snakeFood: {
        // backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    image: {
        width: 30,
        height: 30,
        alignSelf: 'center',

    },
    
});

export { Food };