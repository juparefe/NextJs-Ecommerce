import { useState } from "react";
import { Dropdown, DropdownProps, Icon, Label } from "semantic-ui-react";
import styles from "./Currencies.module.scss";
import { Constants } from "@/utils";

export function Currencies() {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    return localStorage.getItem('selectedCurrency') || 'COP';
  });

  const handleCurrencyChange = (_: any, data: DropdownProps) => {
    const value = String(data.value);
    setSelectedCurrency(value);
    localStorage.setItem('selectedCurrency', value);
  };

  const currencyOptions = Constants.CURRENCIES.map(currency => ({
    key: currency.key,
    text: `${currency.text}: ${currency.symbol}`,
    value: currency.value
  }));

  return (
    <div className={styles.controls}>
      <span className={styles.span}>
        Tu divisa actual es:
      </span>
      <Label className={styles.currencyLabel}>
        {Constants.CURRENCIES.find(option => option.value === selectedCurrency)?.text}
      </Label>
      <Label className={styles.changeLabel}>
        <Icon name='exchange' />Escoge otra moneda para cambiarla
      </Label>
      <Dropdown
        button
        className='icon'
        floating
        labeled
        icon='world'
        options={currencyOptions}
        value={selectedCurrency}
        onChange={handleCurrencyChange}
      />
    </div>
  );
}
