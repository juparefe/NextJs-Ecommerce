import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Container, Dropdown, DropdownProps, Label } from "semantic-ui-react";
import styles from "./home.module.scss";
import { productCtrl } from "@/api";
import { GridCategories, GridProducts, Pagination, Separator } from "@/components/Shared";
import { useWindowSize } from "@/hooks";
import { BasicLayout } from "@/layouts";

export default function HomePage() {
  const router = useRouter();
  const { query } = router;
  const { windowSize } = useWindowSize();
  const [page, setPage] = useState(Number(query.page || 1));
  const [columns, setColumns] = useState(4);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [products, setProducts] = useState(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    if (windowSize.width < 600) {
      setColumns(2);
    } else if (windowSize.width < 900) {
      setColumns(3);
    } else {
      setColumns(4);
    }
  }, [windowSize.width]);

  useEffect(() => {
    setItemsPerPage(columns * 2);
  }, [columns]);

  const getColumnsOptions = () => {
    if (windowSize && windowSize.width < 600) {
      return [
        { key: 1, text: '1', value: 1 },
        { key: 2, text: '2', value: 2 }
      ];
    } else if (windowSize && windowSize.width < 900) {
      return [
        { key: 1, text: '1', value: 1 },
        { key: 2, text: '2', value: 2 },
        { key: 3, text: '3', value: 3 }
      ];
    } else {
      return [
        { key: 1, text: '1', value: 1 },
        { key: 2, text: '2', value: 2 },
        { key: 3, text: '3', value: 3 },
        { key: 4, text: '4', value: 4 },
        { key: 5, text: '5', value: 5 }
      ];
    }
  };

  // Actualiza productos cada vez que cambie la página o el número de productos por página
  useEffect(() => {
    (async () => {
      try {
        const response = await productCtrl.getAll(page, itemsPerPage);
        setProducts(response.data || []);
        setTotalPages(Math.ceil(response.totalItems / itemsPerPage));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page, itemsPerPage]);

  // Actualiza el estado `page` cuando cambie el query en la URL
  useEffect(() => {
    if (query.page) {
      setPage(Number(query.page));
    }
  }, [query.page]);

  const handleColumnsChange = (_: any, data: DropdownProps) => {
    const value = data.value as number;
    setColumns(value);
    setItemsPerPage(value * 2);
    setPage(1);
  };

  return (
    <>
      <Head>
        <title>Home | Mi Tienda</title>
        <meta name="description" content="Bienvenido a nuestra tienda en línea" />
      </Head>
      <BasicLayout>
        <Separator height={50} />

        <Container>
          <h2>Categorías más populares</h2>
          <GridCategories />

          <Separator height={50} />

          <h2>Últimos productos</h2>
          <Separator height={10} />
          <div className={styles.controls}>
            <span className={styles.span}>Mostrar </span>
            <Label size="mini">{itemsPerPage}</Label>
            <span className={styles.span}> productos por página organizados en </span>
            <Dropdown
              inline
              onChange={handleColumnsChange}
              options={getColumnsOptions()}
              role="dropdown"
              value={columns}
            />
            <span className={styles.span}> columnas</span>
          </div>
          <GridProducts
            products={products}
            columns={columns}
            classProduct={styles.product}
          />
          {totalPages && products && <Pagination currentPage={page} totalPages={totalPages} />}
          <Separator height={20} />
        </Container>
      </BasicLayout>
    </>
  );
}
