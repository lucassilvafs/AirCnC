import React from 'react';
import Routes from './src/routes';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: Uncognized WebSocket']);

export default function App() {
  return <Routes />
}

