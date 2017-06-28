import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput
} from 'react-native';
import Marquee from '@remobile/react-native-marquee';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state= {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      textString: ''
    }
  }

  clearInput() {
    this.setState({textString: ''});
  }

  onLayout(event) {
    const newHeight = event.nativeEvent.layout.height;
    const newWidth = event.nativeEvent.layout.width;

    this.setState({
      height: newHeight,
      width: newWidth
    });
  }

  render() {
    const height = this.state.height;
    const width = this.state.width;
    const textString = this.state.textString;

    if (height > width) {
      return (
        <View style={styles.container} onLayout={(event) => this.onLayout(event)}>
          <Text style={styles.instruction}>Input text to display on your marquee:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(textString) => this.setState({textString})}
            value={this.state.textString}
          />
          <Text style={styles.instruction}>Rotate your phone to display the message.</Text>
          <Button
            onPress={this.clearInput.bind(this)}
            title="CLEAR"
            color="#ff0000"
            accessibilityLabel="Clear the input"
          />
        </View>
      );
    } else {
      let renderMessage = () => {
        if (textString !== '') {
          return (
            <Marquee style={styles.marquee}>
              {textString}
            </Marquee>
          );
        }

        return (
           <Text style={styles.instruction}>Type a message in portrait mode :)</Text>
        );
      }
      return (
        <View style={textString !== '' ? styles.marqueeContainer : styles.container} onLayout={(event) => this.onLayout(event)}>
          {renderMessage()}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marqueeContainer: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginLeft: '10%',
    paddingRight: 15,
    paddingLeft: 15,
    height: 60,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,.8)',
    backgroundColor: 'rgba(0,0,0,.1)',
    fontSize: 20,
    color: '#ff0000',
  },
  instruction: {
    fontSize: 16,
    color: '#555',
    lineHeight: 28,
  },
  marquee: {
    fontSize: 200,
    color: '#555'
  }
});
