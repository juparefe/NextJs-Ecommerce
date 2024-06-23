import Link from "next/link";
import { Image } from "semantic-ui-react";
import { data } from "./GridCategories.data";
import styles from "./GridCategories.module.scss";

export function GridCategories() {
  return (
    <div className={styles.container}>
      {data.map((category: any) => (
        <Link key={category.id} href={category.link}>
          <div className={styles.category}>
            <Image src={category.image} alt={category.title} />
            <h3>{category.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
