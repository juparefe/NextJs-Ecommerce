import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Container, Dropdown, DropdownProps } from "semantic-ui-react";
import styles from "./home.module.scss";
import { productCtrl } from "@/api";
import { GridCategories, GridProducts, Pagination, Separator } from "@/components/Shared";
import { BasicLayout } from "@/layouts";

export default function HomePage() {
  const router = useRouter();
  const { query } = router;
  const [page, setPage] = useState(Number(query.page) || 1);
  const [forcePageChange, setForcePageChange] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [products, setProducts] = useState(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const itemsPerPageOptions = [
    { key: 1, text: '4', value: 4 },
    { key: 2, text: '8', value: 8 },
    { key: 3, text: '12', value: 12 },
    { key: 4, text: '16', value: 16 },
    { key: 5, text: '20', value: 20 }
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await productCtrl.getAll(page, itemsPerPage);
        setProducts(response.data || []);
        setTotalPages(Math.ceil(response.totalItems / itemsPerPage));
        console.log("useEffect", query.page, page, forcePageChange);
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
    console.log("handleItemsPerPageChange", query.page, page, forcePageChange);
  };

  const handlePageChange = (newPage: number) => {
    router.replace({ query: { ...query, page: newPage } }, undefined, { shallow: true });
    setForcePageChange(false);
    setPage(newPage);
    console.log("handlePageChange", query.page, page, forcePageChange);
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
          <span>Mostrar </span>
          <Dropdown
            inline
            options={itemsPerPageOptions}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
          <span> productos por página</span>
        </div>
        <GridProducts
          products={products}
          columns={4}
          classProduct={styles.product}
        />
        {totalPages !== null && products !== null && <Pagination currentPage={page}  onPageChange={handlePageChange} forcePageChange={forcePageChange} totalPages={totalPages} />}
        <Separator height={20} />
      </Container>
    </BasicLayout>
  );
}
