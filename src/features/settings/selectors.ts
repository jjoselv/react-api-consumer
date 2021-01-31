import {useSelector} from 'react-redux';
import { RootState } from '../../withReduxFeatures';

const useNationality = () => useSelector<RootState, string>(state => state.settings.nationality);

export default useNationality;
