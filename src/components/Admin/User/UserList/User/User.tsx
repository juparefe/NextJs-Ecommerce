import { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import { fn } from "@/utils/functions";

const NOT_FOUND_IMG = "/images/not-found.jpg";

export function User(props: { user: any; }) {
  const { user } = props;
  const [avatar, setAvatar] = useState(NOT_FOUND_IMG);
  const isAdmin = [1,2].includes(user.userStatus);

  useEffect(() => {
    const imageUrl = fn.getUrlImage(user.userUUID);

    fn.checkIfImageExists(imageUrl, (exists: boolean) => {
      if (exists) setAvatar(imageUrl);
    });
  }, [user]);

  return (
    <>
      <Table.Cell width={1} textAlign="center">
        <Image src={avatar} alt={user.userEmail} avatar />
      </Table.Cell>
      <Table.Cell>{user.userEmail}</Table.Cell>
      <Table.Cell textAlign="center">
        <Icon
          name={isAdmin ? "check" : "close"}
          color={isAdmin ? "green" : "red"}
        />
      </Table.Cell>
    </>
  );
}
