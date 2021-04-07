import React, { useMemo, useState } from "react";
import JuvTable from "../JuvTable";
import { BASE_URL } from "../../constants/general";

const TableExample2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },

      {
        Header: "Ticker Ref",
        accessor: "ticketref",
      },
      {
        Header: "Trade Date",
        accessor: "traded_on",
      },
      {
        Header: "QTY",
        accessor: "quantity",
      },
      {
        Header: "CCY",
        accessor: "currency",
      },
      {
        Header: "Settlement Amount",
        accessor: "settlement_amount",
      },
    ],
    []
  );

  useMemo(() => {
    setLoading(true);

    fetch(`${BASE_URL}transactions`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log("data", data);
        setData(data.transactions);
      })
      .catch((e) => console.log(e));
  }, []);

  return <JuvTable data={data} columns={columns} loading={loading} />;
};
export default TableExample2;
