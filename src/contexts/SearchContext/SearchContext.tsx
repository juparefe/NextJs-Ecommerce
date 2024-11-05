import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./SearchContext.module.scss";
import { productCtrl } from "@/api";
import { Separator, GridProducts } from "@/components/Shared";
import { useWindowSize } from "@/hooks";
import { ProductI } from "@/utils";

// Creacion del componente proveedor del contexto para la barra de busqueda
export function SearchProvider(props: any) {
  const { children } = props;
  const { windowSize } = useWindowSize();
  const [columns, setColumns] = useState(4);
  const [products, setProducts] = useState<ProductI[] | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const { query } = useRouter();

  useEffect(() => {
    if (query.search) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [query.search]);

  // Utilice dos useEffect porque es recomendable que cada uno haga una unica cosa
  useEffect(() => {
    (async () => {
        try {
            if (query.search !== '' && query.search !== undefined) {
              const response = await productCtrl.getAll(1, 100, query.search);
              setProducts(response.data || []);
              setTotalItems(response.totalItems || 0);
            }
        } catch (error) {
            console.error(error);
        }
    })();
  }, [query.search]);

  useEffect(() => {
    if (windowSize.width < 600) {
      setColumns(2);
    } else if (windowSize.width < 900) {
      setColumns(3);
    } else {
      setColumns(4);
    }
  }, [windowSize.width]);

  return (
    <>
      {children}

      {query.search && (
        <div className={styles.container}>
          <div className={styles.infoSearch}>
            <p>Buscando: {query.search}</p>
            <p>{totalItems} resultados</p>
          </div>

          <Separator height={20} />

          <GridProducts
            products={products}
            columns={columns}
            classProduct={styles.product}
          />
        </div>
      )}
    </>
  );
}
