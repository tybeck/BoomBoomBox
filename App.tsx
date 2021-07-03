import React from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {Provider as PaperProvider, Text} from 'react-native-paper';

import PiSelectorComponent from './components/PiSelector/PiSelector.component';
import PinButtonsComponent from './components/PinButtons/PinButtons.component';

interface Props {}
interface State {}

export default class AppComponent extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
          <View>
            <PaperProvider>
              <View style={styles.container}>
                <View style={styles.headingWrapper}>
                  <Image source={require("./assets/fireworks.png")} style={styles.headingImage} />
                  <Text style={styles.headingText}>BOOM BOOM</Text>
                  <Text style={[styles.headingText, styles.headingBoxText]}>BOX</Text>
                  <Text style={styles.tagText}>By Tyler</Text>
                </View>
                <PiSelectorComponent />
                <PinButtonsComponent />
              </View>
            </PaperProvider>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  headingWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200ee',
    marginBottom: 50
  },
  headingText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 0
  },
  headingBoxText: {
    fontWeight: 'normal',
    letterSpacing: 10,
    marginTop: 0,
    fontSize: 25
  },
  tagText: {
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center'
  },
  headingImage: {
    width: 100,
    height: 125,
    alignSelf: 'center',
    marginBottom: 15,
    opacity: 0.8
  }
});
