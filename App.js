import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {RFValue} from 'react-native-responsive-fontsize'

let customFonts = {
  "AR DARLING": require("./ARDARLING.ttf")
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded:false,
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <SafeAreaProvider style={styles.container}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Chunky Monkey',
            style: { color: '#fff', fontSize: 20, fontFamily:'AR DARLING' },
          }}
        />

        <Image
          style={styles.imageIcon}
          source={
            require('./logo.png')
          }
            
        />
        <KeyboardAvoidingView>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim();
            db[word]?(
            this.setState({ chunks: db[word].chunks }),
            this.setState({ phonicSounds: db[word].phones })
            ):
            Alert.alert("The word does not exist in our database");
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
    fontFamily:'AR DARLING'
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily:'AR DARLING'
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  }
});
