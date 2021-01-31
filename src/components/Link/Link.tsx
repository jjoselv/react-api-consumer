import styles from './Link.module.scss';
import {Link as RRLink} from 'react-router-dom';

export default function Link(props: any) {
    return (
        <RRLink className={styles.link} {...props}/>
    )
}
