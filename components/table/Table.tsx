"use client";

import React, {
  useState,
  useEffect,
  useRef,
  memo,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";
import {
  TableContainer,
  MTable,
  MTableHeader,
  MTableData,
  MTableRow,
  SortingIconContainer,
} from "./styled";
import { LiaSortUpSolid, LiaSortDownSolid } from "react-icons/lia";

type Props = {
  headerConfigs: Array<TableHeaderConfig>;
  rowHandlers: {rows: Array<any>, setRows: Dispatch<SetStateAction<any[]>>};
  rowRef: MutableRefObject<string>;
};

const Table = ({ headerConfigs, rowHandlers, rowRef }: Props) => {
  console.log("Render table")
  const {rows, setRows} = rowHandlers;
  const [headers, setHeaders] =
    useState<Array<TableHeaderConfig>>(headerConfigs);
  const [rerender, setRerender] = useState(false);

  const handleSort = (id: string, sortDirection: "asc" | "desc" = "desc") => {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";

    setRows(
      rows.slice(0).sort((a, b) => {
        return (
          String(a[id]).localeCompare(String(b[id])) *
          (sortDirection === "asc" ? 1 : -1)
        );
      })
    );

    setHeaders((prev) => {
      prev.forEach((header) => {
        header.sortDirection = header.id === id ? sortDirection : undefined;
      });
      return prev;
    });
  };

  //handle column dragging
  const headerRef = useRef<Element>(); //store toHeader

  useEffect(() => {
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("dragend", handleDragEnd);
    document.addEventListener("drop", handleDrop);
    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("dragend", handleDragEnd);
      document.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnd = (e: DragEvent) => {
    e.preventDefault();
    const fromHeader = e.target as Element;
    let toHeader = headerRef.current;
    if (!fromHeader || !toHeader) {
      return;
    }
    if (toHeader.tagName !== "TH" && toHeader.tagName !== "TD") {
      return;
    }

    if (fromHeader.id !== toHeader.id) {
      [headers[parseInt(fromHeader.id)], headers[parseInt(toHeader.id)]] = [
        headers[parseInt(toHeader.id)],
        headers[parseInt(fromHeader.id)],
      ];
      setHeaders(() => [...headers]);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (!e.target) {
      return;
    }
    headerRef.current = e.target as Element; //to header
  };

  console.log("render table with rows:")
  console.log(rows)

  return (
    <TableContainer>
      <MTable>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <MTableHeader
                $isSortable={header.isSortable ?? true}
                $width={header.width ?? ""}
                key={header.id}
                id={String(index)}
                onClick={() =>
                  (header.isSortable ?? true) &&
                  handleSort(header.id, header.sortDirection)
                }
                draggable
              >
                {header.displayName}
                <SortingIconContainer>
                  {header.sortDirection === "asc" && (
                    <span>
                      <LiaSortUpSolid />
                    </span>
                  )}
                  {header.sortDirection === "desc" && (
                    <span>
                      <LiaSortDownSolid />
                    </span>
                  )}
                </SortingIconContainer>
              </MTableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <MTableRow
              key={row.id}
              $selected={rowRef.current === row.id}
              onClick={() => {
                rowRef.current = row.id;
                setRerender(!rerender);
              }}
            >
              {Object.keys(headers).map((key, index) => (
                <MTableData key={key} id={String(index)}>
                  {row[headers[index].id]}
                </MTableData>
              ))}
            </MTableRow>
          ))}
        </tbody>
      </MTable>
    </TableContainer>
  );
};

export default memo(Table);
