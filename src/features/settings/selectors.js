import {useSelector} from 'react-redux';

const useNationality = () => useSelector(state => state.settings.nationality);

export default useNationality;
