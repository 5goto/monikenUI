import { NewRouteForm } from '../../features/routes/NewRouteForm';
import styles from './NewRoute.module.css';

export const NewRoute = () => {
  return (
    <div className={styles.newRoutePage}>
      <NewRouteForm />
    </div>
  );
};
