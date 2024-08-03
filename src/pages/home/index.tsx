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
  let page = Number(query.page || 1);
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
      } catch (error) {
        console.error(error);
      }
    })();
  }, [itemsPerPage, page]);

  const handleItemsPerPageChange = (_: any, data: DropdownProps) => {
    const value = data.value as number;
    setItemsPerPage(value);
    const newQuery = { ...query };
    delete newQuery.page;
    router.replace({ query: newQuery }, undefined, { shallow: true });
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
            defaultValue={itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
          <span> productos por página</span>
        </div>
        <GridProducts
          products={products}
          columns={4}
          classProduct={styles.product}
        />
        {totalPages !== null && products !== null && <Pagination currentPage={page} totalPages={totalPages} />}
        <Separator height={20} />
      </Container>
    </BasicLayout>
  );
}
