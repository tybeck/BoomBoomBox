import React from 'react';
import {Provider as PaperProvider, Button} from 'react-native-paper';
import Constants from 'expo-constants';

interface Props {}
interface State {
  servers: string[];
  activeServer: string|null;
}

export default class PiSelectorComponent extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      servers: Constants.manifest?.extra?.servers || [],
      activeServer: null,
    };
  }

  render() {
    return (
      <PaperProvider>
        {this.state.servers.map(server => (
          <Button mode="contained">${server}</Button>
        ))}
      </PaperProvider>
    );
  }
}
