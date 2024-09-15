 import { useState } from "react";
import { Dropdown, DropdownProps, Icon, Label } from "semantic-ui-react";
import styles from "./Currencies.module.scss";
import { useBasket } from "@/hooks";
import { Constants, CurrencyI } from "@/utils";

export function Currencies() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyI>(() => {
    const currencyRatesString: string | null = localStorage.getItem('currency');
    return currencyRatesString ? JSON.parse(currencyRatesString) : Constants.DEFAULT_CURRENCY;
  });
  const { getCurrencies } = useBasket();

  const handleCurrencyChange = async (_: any, data: DropdownProps) => {
    const newCurrency = String(data.value);
    let currencyObject: CurrencyI = {
      currencyLastSymbol: '',
      currencySymbol: '',
      selectedCurrency: newCurrency
    };
    switch (newCurrency) {
      case 'EUR':
        currencyObject = {
          ...currencyObject,
          currencyLastSymbol: '€',
          currencySymbol: ''
        };
        break;
      case 'USD':
        currencyObject = {
          ...currencyObject,
          currencyLastSymbol: '',
          currencySymbol: 'US$'
        };
        break;
      default:
        currencyObject = {
          ...currencyObject,
          currencyLastSymbol: '',
          currencySymbol: '$'
        };
    }
    setSelectedCurrency(currencyObject);
    localStorage.setItem('currency', JSON.stringify(currencyObject));
    getCurrencies();
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
        {Constants.CURRENCIES.find(option => option.value === selectedCurrency.selectedCurrency)?.text}
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
        value={selectedCurrency.selectedCurrency}
        onChange={handleCurrencyChange}
      />
    </div>
  );
}
