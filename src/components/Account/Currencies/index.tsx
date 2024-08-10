import { DateTime } from "luxon";
import { useState } from "react";
import { Dropdown, DropdownProps, Icon, Label } from "semantic-ui-react";
import styles from "./Currencies.module.scss";
import { currencyCtrl } from "@/api";
import { Constants, RatesI } from "@/utils";

export function Currencies() {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    return localStorage.getItem('selectedCurrency') || 'COP';
  });

  const handleCurrencyChange = async (_: any, data: DropdownProps) => {
    const newCurrency = String(data.value);
    // Recuperar las tasas para la moneda seleccionada
    let newCurrencyRatesString: string | null;
    let newCurrencyRatesJson: RatesI;
    switch (newCurrency) {
      case "EUR":
        newCurrencyRatesString = localStorage.getItem('ratesEUR');
        break;
      case "USD":
        newCurrencyRatesString = localStorage.getItem('ratesUSD');
        break;
      default:
        newCurrencyRatesString = localStorage.getItem('ratesCOP');
        break;
    }
    if (newCurrencyRatesString) {
      newCurrencyRatesJson = JSON.parse(newCurrencyRatesString);
      // Convertir timeLastUpdate a un objeto DateTime de Luxon
      const timeLastUpdateDate = DateTime.fromSeconds(newCurrencyRatesJson.timeLastUpdate);
      // Obtener la fecha actual con Luxon
      const currentDate = DateTime.now();
      // Verificar si timeLastUpdate es hoy y si no llamar a ExchangeRate API
      if(!timeLastUpdateDate.hasSame(currentDate, 'day')) {
        await currencyCtrl.get(selectedCurrency, newCurrency);
      };
    } else {
      await currencyCtrl.get(selectedCurrency, newCurrency);
    }
    setSelectedCurrency(newCurrency);
    localStorage.setItem('selectedCurrency', newCurrency);
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
