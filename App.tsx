import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Provider as PaperProvider, Button, Text } from 'react-native-paper';

interface Props {}
interface State {
  running: boolean;
  countdown: number|null;
}

export default class AppComponent extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      running: false,
      countdown: null
    }
  }

  render() {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <View style={styles.headingWrapper}>
            <Image source={require("./assets/fireworks.png")} style={styles.headingImage} />
            <Text style={styles.headingText}>BOOM BOOM</Text>
            <Text style={[styles.headingText, styles.headingBoxText]}>BOX</Text>
            <Text style={styles.tagText}>By Tyler</Text>
          </View>
          <Button mode="contained" onPress={this.start} disabled={this.state.running}>
            {this.state.countdown !== null && `${this.state.countdown}`}
            {this.state.countdown === null && !this.state.running && 'Start Sequence'}
            {this.state.running && 'Running...'}
          </Button>
        </View>
      </PaperProvider>
    );
  }

  start = () => {
    if (typeof this.state.countdown === 'number' && !this.state.countdown) {
      this.setState({countdown: null, running: true});
      return fetch('http://10.0.0.6:3000/boom-boom-box/api/start')
        .then(() => this.setState({running: false}));
    }
    if (this.state.countdown === null) {
      this.setState({countdown: 5});
    }
    setTimeout(() => {
      if (this.state.countdown) {
        this.setState({countdown: this.state.countdown - 1});
      }
      this.start();
    }, 1000);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
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
