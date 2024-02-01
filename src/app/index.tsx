/* eslint-disable react-refresh/only-export-components */
import './index.css';
import { Routing } from '../pages/index.tsx';
import { withProviders } from './providers/index.tsx';

const App = () => {
  return <Routing />;
};

export default withProviders(App);
