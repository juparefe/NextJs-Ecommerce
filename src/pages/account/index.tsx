import { useState } from "react";
import { Container, Tab } from "semantic-ui-react";
import styles from "./account.module.scss";
import { Separator } from "@/components/Shared";
import { useAuth } from "@/hooks";
import { BasicLayout } from "@/layouts";

export default function AccountPage() {
  const [reload, setReload] = useState(false);
  const { logout } = useAuth();

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Mis datos",
      render: () => (
        <Tab.Pane>
          <p>Avatar</p>
          <Separator height={50} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Mis direcciones",
      render: () => (
        <Tab.Pane>
          <p>addresses</p>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Mis pedidos",
      render: () => (
        <Tab.Pane>
          <p>orders</p>
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
      <Container>
        <Tab
          menu={{ fluid: true, tabular: true, vertical: true }}
          panes={panes}
          className={styles.tabs}
        />
      </Container>
    </BasicLayout>
  );
}
