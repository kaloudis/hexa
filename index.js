import './shim';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import * as Sentry from '@sentry/react-native';

// TODO -- make changes as per env

Sentry.init({
  dsn:
    'https://af9dddc9bd6943a3a2c6bffb46e6b79e@o433150.ingest.sentry.io/5387760',
});

AppRegistry.registerComponent(appName, () => App);
