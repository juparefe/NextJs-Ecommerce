import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Icon, Image } from "semantic-ui-react";
import styles from "./GridCategories.module.scss";
import { categoryCtrl } from "@/api";
import { Loading, Separator } from '@/components/Shared';
import { CategoryI, Constants } from "@/utils";
import { fn } from "@/utils/functions";

export function GridCategories() {
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [showButtons, setShowButtons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
		(async () => {
			try {
				const response = await categoryCtrl.getTop();
        // Asignar imagen por defecto inicialmente
        const categoriesWithDefaultImages = response.map((category: CategoryI) => ({
          ...category,
          categImage: Constants.NOT_FOUND_IMAGE // Imagen por defecto
        }));
        setCategories(categoriesWithDefaultImages);
        // Iterar por cada categoría y modificar la propiedad 'image' cuando exista
        response.forEach(async (category: CategoryI) => {
        const imageUrl = fn.getUrlImage(category.categPath);
        fn.checkIfImageExists(imageUrl, (exists: boolean) => {
          if (exists) {
            setCategories(prevCategories =>
              prevCategories.map(prevCategory =>
                prevCategory.categId === category.categId ? { ...prevCategory, categImage: imageUrl } : prevCategory
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

  const handleResize = () => {
		setShowButtons(window.innerWidth > 999);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ behavior: 'smooth', left: -200 });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ behavior: 'smooth', left: 200 });
    }
  };

	if (!categories || categories.length === 0) return <Loading text="Cargando categorias" />;

  return (
    <div className={styles.wrapper}>
      {showButtons && (<Button className={styles.scrollButton} onClick={scrollLeft} basic compact icon color="teal">
        <Icon name='angle left' />
      </Button>)}
      <div className={styles.container} ref={containerRef}>
        {categories.map((category: CategoryI) => (
          <Link className={styles.link} key={category.categId} href={`/categories/${category.categPath}`}>
            <div className={styles.category}>
              <h3 className={styles.header}>{category.categName.toUpperCase()}</h3>
              <Image className={styles.image} src={category.categImage} alt={category.categName} circular />
              <Separator height={10} />
            </div>
          </Link>
        ))}
      </div>
      {showButtons && (<Button className={styles.scrollButton} onClick={scrollRight} basic compact icon color="teal">
        <Icon name='angle right' />
      </Button>)}
    </div>
  );
}
