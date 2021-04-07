import React from "react";
import JuvTable from "./index";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: JuvTable,
  title: "Table",
  argTypes: {
    loading: {
      description: "Shows the loading indicator when data is getting fetched",
      control: {
        type: null,
      },
    },
    data: {
      description:
        "Json object with a field payload containing an array of json objects, each json object contains multiple properties, the properties which needs to be displayed in the table will be specified in the 'column' property",
      control: {
        type: null,
      },
    },
    columns: {
      description:
        "Array of json objects. Each object will contain, column header text to be displayed, a property that needs to be displayed and its type.",
      control: {
        type: null,
      },
    },
  },
};

const col = [
  {
    Header: "Name",
    accessor: "name",
  },

  {
    Header: "Ticker",
    accessor: "ticker",
  },
  {
    Header: "Belongs to",
    accessor: "asset_class",
  },
  {
    Header: "Average price",
    accessor: "avg_price",
  },
  {
    Header: "Market Price",
    accessor: "market_price",
  },
  {
    Header: "Latest change percentage",
    accessor: "latest_chg_pct",
  },
  {
    Header: "Market Value in Base CCY",
    accessor: "market_value_ccy",
  },
];
const data = [
  {
    name: "Property: The Sail @ Marina Bay Unit 68-020000 3BR 1991sqft",
    ticker: "Property_TheSail@MarinaBay-68-02",
    asset_class: "Real Estate",
    avg_price: 3982000,
    market_price: 3996971.1,
    market_value_ccy: 3996971.1,
    latest_chg_pct: 31,
  },
  {
    name: "SGD Cash",
    ticker: "demo_equity_managed_cssg01_sgd_01",
    asset_class: "Cash",
    market_value_ccy: 3000000,
    latest_chg_pct: 59,
  },
  {
    name: "DYNAMIC TALENT LTD 4.7500% 2017-08-01",
    ticker: "XS0810321140",
    asset_class: "Bond",
    avg_price: 101.5168,
    market_price: 100.16,
    market_value_ccy: 714882,
    latest_chg_pct: 7,
  },
  {
    name: "FAR EAST HORIZON LTD 5.5500% Perpetual",
    ticker: "XS1079564255",
    asset_class: "Bond",
    avg_price: 97.6875,
    market_price: 100.0175,
    market_value_ccy: 601401.6,
    latest_chg_pct: 32,
  },
  {
    name: "ING BANK NEW LIMITED 4.1250% 2023-11-21",
    ticker: "XS0995102778",
    asset_class: "Bond",
    avg_price: 99.75985,
    market_price: 100.058,
    market_value_ccy: 601014.6,
    latest_chg_pct: -46,
  },
  {
    name: "UBS GROUP FUNDING SWITZE 7.125000% Perpetual",
    ticker: "CH0271428317",
    asset_class: "Bond",
    avg_price: 103.97,
    market_price: 100.147,
    market_value_ccy: 535766,
    latest_chg_pct: 67,
  },
  {
    name: "SUN HUNG KAI PROP (CAP) 4% 2020-11-02",
    ticker: "XS0554846781",
    asset_class: "Bond",
    avg_price: 105.2844,
    market_price: 101.2735,
    market_value_ccy: 511978.5,
    latest_chg_pct: 46,
  },
  {
    name: "HKD Cash",
    ticker: "demo_equity_managed_cssg01_hkd_01",
    asset_class: "Cash",
    market_value_ccy: 0.92,
    latest_chg_pct: 22,
  },
  {
    name: "SGD Cash",
    ticker: "demo-insurance_gelf01_sgd_01",
    asset_class: "Cash",
    market_value_ccy: -400991,
    latest_chg_pct: 2,
  },
  {
    name: "USD Loan",
    ticker: "LoanRef_demo_fixed_income_dbsg01_usd_01_9511672",
    asset_class: "Loan",
    avg_price: null,
    market_price: 1,
    market_value_ccy: -541402.09,
    latest_chg_pct: 15,
  },
  {
    name: "SGD Loan",
    ticker: "LoanRef_demo_fixed_income_dbsg01_sgd_01_7623625122",
    asset_class: "Loan",
    avg_price: null,
    market_price: 1,
    market_value_ccy: -1119038.36,
    latest_chg_pct: -36,
  },
  {
    name: "SGD Loan",
    ticker: "LoanRef_demo-realestate_rere01_sgd_01_DBS30Y_BB+1.20",
    asset_class: "Loan",
    avg_price: null,
    market_price: 1,
    market_value_ccy: -2716000,
    latest_chg_pct: 51,
  },
];

const noPaginationData = data.slice(0, 5);
export const WithoutDataOrColum = () => <JuvTable />;
export const Loading = () => <JuvTable loading={true} />;
export const NoPagination = () => (
  <JuvTable data={noPaginationData} columns={col} />
);

export const KitchenSink = () => <JuvTable data={data} columns={col} />;
