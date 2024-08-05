import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { Container, Dropdown, DropdownProps } from "semantic-ui-react";
import styles from "./home.module.scss";
import { productCtrl } from "@/api";
import { GridCategories, GridProducts, Pagination, Separator } from "@/components/Shared";
import { useWindowSize } from "@/hooks";
import { BasicLayout } from "@/layouts";

export default function HomePage() {
  const router = useRouter();
  const { query } = router;
  const { windowSize } = useWindowSize();
  const [page, setPage] = useState(Number(query.page) || 1);
  const [forcePageChange, setForcePageChange] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [columns, setColumns] = useState(4);
  const [products, setProducts] = useState(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const updateColumns = useCallback(() => {
    if (windowSize.width < 600) {
      setColumns(2);
    } else if (windowSize.width < 900) {
      setColumns(3);
    } else {
      setColumns(4);
    }
  }, [windowSize.width]);

  useEffect(() => {
    updateColumns();
  }, [updateColumns]);

  const getItemsPerPageOptions = () => {
    const maxItems = columns * 5;
    let options = [];
    for (let i = columns; i <= maxItems; i += columns) {
      options.push({ key: i, text: `${i}`, value: i });
    }
    return options;
  };

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
        { key: 3, text: '3', value: 3 },
        { key: 4, text: '4', value: 4 }
      ];
    } else {
      return [
        { key: 1, text: '1', value: 1 },
        { key: 2, text: '2', value: 2 },
        { key: 3, text: '3', value: 3 },
        { key: 4, text: '4', value: 4 },
        { key: 5, text: '5', value: 5 },
        { key: 6, text: '6', value: 6 }
      ];
    }
  };

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
  }, [itemsPerPage, page]);

  const handleItemsPerPageChange = (_: any, data: DropdownProps) => {
    const value = data.value as number;
    setItemsPerPage(value);
    setForcePageChange(true);
    router.replace({ query: { ...query, page: 1 } }, undefined, { shallow: true });
    setPage(1);
  };

  const handleColumnsChange = (_: any, data: DropdownProps) => {
    const value = data.value as number;
    setColumns(value);
    setItemsPerPage(value * 2);
    const options = getItemsPerPageOptions();
    if (!options.find(option => option.value === itemsPerPage)) {
      setItemsPerPage(value);
      setForcePageChange(true);
      router.replace({ query: { ...query, page: 1 } }, undefined, { shallow: true });
      setPage(1);
    }
  };

  const handlePageChange = (newPage: number) => {
    router.replace({ query: { ...query, page: newPage } }, undefined, { shallow: true });
    setForcePageChange(false);
    setPage(newPage);
  };

  return (
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
          <Dropdown
            inline
            options={getItemsPerPageOptions()}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
          <span className={styles.span}> productos por página organizados en </span>
          <Dropdown
            inline
            options={getColumnsOptions()}
            value={columns}
            onChange={handleColumnsChange}
          />
          <span className={styles.span}> columnas</span>
        </div>
        <GridProducts
          products={products}
          columns={columns}
          classProduct={styles.product}
        />
        {totalPages !== null && products !== null && <Pagination currentPage={page} onPageChange={handlePageChange} forcePageChange={forcePageChange} totalPages={totalPages} />}
        <Separator height={20} />
      </Container>
    </BasicLayout>
  );
}
