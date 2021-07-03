import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';

interface Props {}
interface State {
  running: boolean;
  countdown: number|null;
  pins: Pin[];
}

interface Pin {
  enabled: boolean;
  label: string;
  pin: number;
}

export default class PinButtonsComponent extends React.Component<Props, State> {

  pinNumbers = [2, 3, 4, 17, 27, 22, 10, 9, 11, 0, 5, 6, 13, 19, 26, 14, 15, 18, 23, 24, 25, 8, 7, 1, 12, 16, 20, 21];

  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      running: false,
      countdown: null,
      pins: this.pinNumbers.map(pin => {
        return {
          enabled: true,
          label: `Pin ${pin}`,
          pin,
        }
      }),
    }
  }

  fire = (aPin: Pin) => {
    return () => {
      return fetch(`http://10.0.0.162:3000/boom-boom-box/api/fire/${aPin.pin}`)
        .then(() =>
          this.setState({
            pins: this
              .state
              .pins
              .map(bPin => {
                if (aPin.pin === bPin.pin) {
                  return {
                    ...bPin,
                    enabled: false,
                  };
                }
                return bPin;
              })
          })
        )
    };
  }

  render() {
    return (
      <PaperProvider>
        <View style={styles.container}>
          {this.state.pins.map(pin => (
            <Button
              mode="contained"
              style={styles.button}
              onPress={this.fire(pin)}
              disabled={!pin.enabled}
              key={pin.pin}
            >
              {pin.label}
            </Button>
            )
          )}
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 4,
    minWidth: 90,
  }
});
