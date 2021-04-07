import React, { useMemo, useState } from "react";
import JuvTable from "../JuvTable";
import { BASE_URL } from "../../constants/general";

const TableExample1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = useMemo(
    () => [
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
    ],
    []
  );

  useMemo(() => {
    setLoading(true);

    fetch(`${BASE_URL}holdings`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log("data", data);
        setData(data.payload);
      })
      .catch((e) => console.log(e));
  }, []);

  return <JuvTable data={data} columns={columns} loading={loading} />;
};
export default TableExample1;
