import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Tab } from "semantic-ui-react";
import styles from "./account.module.scss";
import { Address, Orders, Settings } from "@/components/Account";
import { Separator } from "@/components/Shared";
import { useAuth } from "@/hooks";
import { BasicLayout } from "@/layouts";

export default function AccountPage() {
  const [reload, setReload] = useState(false);
  const { logout } = useAuth();
  const { query } = useRouter();
  let defaultTabIndex = 0;
  switch (query.tab) {
    case "address":
      defaultTabIndex = 1;
      break;
    case "order":
      defaultTabIndex = 2;
      break;
    default:
      defaultTabIndex = 0;
      break;
  }
  query.order === "true" ? 2 : 0;

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Mis datos",
      render: () => (
        <Tab.Pane>
          <Settings.AvatarForm />
          <Separator height={50} />
          <Settings.ChangeNameForm />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Mis direcciones",
      render: () => (
        <Tab.Pane>
          <Address.AddAddress onReload={onReload} />
          <Address.ListAddresses reload={reload} onReload={onReload}/>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Mis pedidos",
      render: () => (
        <Tab.Pane>
          <Orders.List />
        </Tab.Pane>
      )
    },
    {
      menuItem: {
        content: "Cerrar sesion",
        icon: "log out",
        key: 20,
        onClick: logout
      }
    }
  ];

  return (
    <BasicLayout>
      <Container className={styles.container}>
        <Tab
          menu={{ fluid: true, tabular: true, vertical: true }}
          panes={panes}
          defaultActiveIndex={defaultTabIndex}
          className={styles.tabs}
        />
      </Container>
    </BasicLayout>
  );
}
