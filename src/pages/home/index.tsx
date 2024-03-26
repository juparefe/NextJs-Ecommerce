import styles from "./home.module.scss";
import { useAuth } from "@/hooks";

export default function HomePage() {
  const data = useAuth();
  console.log(data);

  return (
    <div className={styles.container}>
        <h2>Estas en la HomePage</h2>
    </div>
  );
}
