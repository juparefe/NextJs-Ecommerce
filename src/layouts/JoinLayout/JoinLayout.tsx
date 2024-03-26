import {useAuth} from '@/hooks';
import {Container} from 'semantic-ui-react';
import styles from "./JoinLayout.module.scss";
import {useRouter} from 'next/router';
import { useEffect } from 'react';

export function JoinLayout(props: any) {
  const {children} = props;
  const user = useAuth();
  const router = useRouter()
  useEffect(() => {
    if (user) router.push("/");
  }, [])

  if (user) return null;
  return (
    <Container className={styles.container}>
      <p>LOGO</p>
      <div>
        <div className={styles.left}>Informacion</div>
        <div className={styles.rigth}>{children}</div>
      </div>
    </Container>
  );
}
