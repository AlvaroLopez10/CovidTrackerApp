/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

import virusStyle from './src/styles/mapStyle'

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')
    .then(response => response.json())
    .then(data => this.setState({data}))
  }

  render () {
    return (
      <View style={styles.appContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 0,
            longitude: -80,
            latitudeDelta: 60,
            longitudeDelta: 60
          }}
          customMapStyle={virusStyle}
          zoomEnabled={true}
        >
          {
            this.state.data.map((marker, key) => {
              if (marker.confirmed) {
                return (
                  <Marker
                    key={key}
                    coordinate={{latitude: marker.location.lat, longitude: marker.location.lng}}
                  >
                    <Callout>
                      <View style={{width: 130}}>
                        <Text style={{fontWeight: 'bold'}}>{marker.provincestate} - {marker.countryregion}</Text>
                        <Text>Confirmados: {marker.confirmed}</Text>
                        <Text>Muertes: {marker.deaths}</Text>
                        <Text>Recuperados: {marker.recovered}</Text>
                      </View>
                    </Callout>
                    <Image source={require('./src/images/icon.png')}/>
                  </Marker>
                )
              }
            })
          }
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  }
});

export default App;
