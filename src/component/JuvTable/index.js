import React, { useMemo } from "react";
import Icon from "../Icon";
import LoadingIcon from "../LoadingIcon";
import { Button, ButtonGroup, Col, Row, Table } from "react-bootstrap";
import {
  downArrowIcon,
  goToFirstPageIcon,
  upArrowIcon,
  goToLastPageIcon,
  goToPreviousPageIcon,
  goToNextPageIcon,
} from "../../constants/icon";
import {
  useColumnOrder,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import { useBootstrapBreakpoint } from "../../hooks/useBootstrapBreakpoint";

const JuvTable = ({ data = [], columns = [], loading = false }) => {
  const { minBreakpoint, maxBreakpoint } = useBootstrapBreakpoint();
  const desktopView = minBreakpoint("md");
  const mobileView = maxBreakpoint("xs");

  console.log("mobileView", mobileView);
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setColumnOrder,
    visibleColumns,
    resetResizing,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useColumnOrder,
    useFlexLayout,
    useResizeColumns,
    useSortBy,
    usePagination
  );

  const shuffle = (arr) => {
    arr = [...arr];
    const shuffled = [];
    while (arr.length) {
      const rand = Math.floor(Math.random() * arr.length);
      shuffled.push(arr.splice(rand, 1)[0]);
    }
    return shuffled;
  };

  const randomizeColumns = () => {
    setColumnOrder(shuffle(visibleColumns.map((d) => d.id)));
  };

  return (
    <>
      <Row>
        <Col>
          <ButtonGroup className="mt-4">
            <Button variant="secondary" onClick={() => randomizeColumns({})}>
              Reorder Column
            </Button>
            <Button onClick={() => resetResizing()}>Reset Size</Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Table
        bordered
        responsive
        size="sm"
        {...getTableProps()}
        className="mt-4 rounded-lg"
      >
        <thead className="header">
          {headerGroups.map((headerGroup) => {
            const mobileHeaders = mobileView
              ? headerGroup.headers.slice(0, 3)
              : headerGroup.headers;
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {mobileHeaders.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="cell p-3"
                  >
                    {column.render("Header")}
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    ></div>
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon
                            icon={downArrowIcon}
                            className="ml-3 text-warning"
                          />
                        ) : (
                          <Icon icon={upArrowIcon} className="ml-3" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {loading && <LoadingIcon />}
          {!loading &&
            page.map((row, i) => {
              prepareRow(row);
              const mobileCells = mobileView
                ? row.cells.slice(0, 3)
                : row.cells;
              return (
                <tr {...row.getRowProps()}>
                  {mobileCells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="text-break pl-3">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </Table>
      {pageCount > 1 && (
        <div className="pagination my-4 d-flex">
          <Icon
            onClick={() => gotoPage(0)}
            icon={goToFirstPageIcon}
            disabled={!canPreviousPage}
            className={`mx-3 mt-1 ${
              canPreviousPage ? "text-link" : "text-muted"
            }`}
          />
          <Icon
            onClick={() => previousPage()}
            icon={goToPreviousPageIcon}
            disabled={!canPreviousPage}
            className={`mr-3 mt-1 ${
              canPreviousPage ? "text-link" : "text-muted"
            }`}
          />
          <Icon
            onClick={() => nextPage()}
            disabled={!canNextPage}
            icon={goToNextPageIcon}
            className={`mr-3 mt-1 ${canNextPage ? "text-link" : "text-muted"}`}
          />
          <Icon
            onClick={() => gotoPage(pageCount - 1)}
            icon={goToLastPageIcon}
            disabled={!canNextPage}
            className={`mr-3 mt-1 ${canNextPage ? "text-link" : "text-muted"}`}
          />

          <span className="text-right ml-auto">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
      )}
    </>
  );
};

export default JuvTable;
