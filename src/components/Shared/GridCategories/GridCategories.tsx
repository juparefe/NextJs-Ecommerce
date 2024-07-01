import Link from "next/link";
import { useEffect, useState } from "react";
import { Header, Image } from "semantic-ui-react";
import styles from "./GridCategories.module.scss";
import { categoryCtrl } from "@/api";
import { Loading, Separator } from '@/components/Shared';
import { CategoryI, Constants } from "@/utils";
import { fn } from "@/utils/functions";

export function GridCategories() {
  const [categories, setCategories] = useState<CategoryI[]>([]);

  useEffect(() => {
		(async () => {
			try {
				const response = await categoryCtrl.getTop();
				setCategories(response);
         // Iterar por cada categoría y añadir la propiedad 'image'
         response.forEach(async (category: CategoryI) => {
          const imageUrl = fn.getUrlImage(category.categPath);
          fn.checkIfImageExists(imageUrl, (exists: boolean) => {
            if (exists) {
              const updatedCategory = { ...category, categImage: imageUrl };
              setCategories((prevCategories) =>
                prevCategories.map((prevCategory) =>
                  prevCategory.categId === category.categId ? updatedCategory : prevCategory
                )
              );
            } else {
              const updatedCategory = { ...category, categImage: Constants.NOT_FOUND_IMAGE };
              setCategories((prevCategories) =>
                prevCategories.map((prevCategory) =>
                  prevCategory.categId === category.categId ? updatedCategory : prevCategory
                )
              );
            }
          });
        });
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	if (!categories) return <Loading text="Cargando categorias" />;

  return (
    <div className={styles.container}>
    {categories.map((category: CategoryI) => (
      <Link key={category.categId} href={`/categories/${category.categPath}`}>
        <div className={styles.category}>
          <h3 className={styles.header}>{category.categName.toUpperCase()}</h3>
          <Image src={category.categImage} alt={category.categName} circular />
          <Separator height={10} />
        </div>
      </Link>
    ))}
  </div>
  );
}
