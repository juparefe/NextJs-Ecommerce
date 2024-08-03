import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { User } from "./User";
import { userCtrl } from "@/api";
import { Loading, Pagination } from "@/components/Shared";
import { UserI } from '@/utils';

const ITEM_PER_PAGE = 10;
export function UserList() {
  const router = useRouter();
  const { query } = router;
  const [users, setUsers] = useState<UserI[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const page = Number(query.page || 1);

  useEffect(() => {
    (async () => {
      try {
        setUsers([]);
        const response = await userCtrl.getAll(page);
        setUsers(response.data);
        setTotalPages(Math.ceil(response.totalItems / ITEM_PER_PAGE));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [query.page]);

  const handlePageChange = (newPage: number) => {
		router.replace({ query: { ...query, page: newPage } }, undefined, { shallow: true });
	};

  if (!users || users.length === 0) return <Loading text="Cargando usuarios" />;

  return (
    <>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Avatar</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Admin</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
            {users.map((user) => (
				<Table.Row key={user.userUUID}>
					<User user={user}/>
				</Table.Row>
			))}
        </Table.Body>
      </Table>

      {totalPages !== null && <Pagination currentPage={page} onPageChange={handlePageChange} totalPages={totalPages} />}
    </>
  );
}
