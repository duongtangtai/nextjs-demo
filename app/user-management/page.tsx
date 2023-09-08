"use client";

import { useState, ChangeEvent, useCallback, useMemo, useRef } from "react";
import {
  Navbar,
  Sidebar,
  Button,
  Searchbar,
  SearchField,
  Table,
} from "@/components/index";
import { API_USERS } from "@/lib/utils";

type SearchForm = {
  id: string;
  ofc_cd: string;
};

const initSearchForm: SearchForm = {
  id: "",
  ofc_cd: "",
};

export default function Home() {
  const [searchForm, setSearchForm] = useState<SearchForm>(initSearchForm);
  const [rows, setRows] = useState<UserInfo[]>([]);
  const rowHandlers = useMemo(() => {
    return {
      rows,
      setRows,
    };
  }, [rows]);
  const rowRef = useRef("");

  const headerConfigs: TableHeaderConfig[] = useMemo(
    () => [
      {
        id: "id",
        displayName: "User ID",
      },
      {
        id: "username",
        displayName: "User Name",
      },
      {
        id: "ofc_cd",
        displayName: "Office Code",
      },
      {
        id: "cnt_cd",
        displayName: "Country Code",
      },
      {
        id: "upd_usr",
        displayName: "Update User",
      },
      {
        id: "acc_sts",
        displayName: "Active",
      },
      {
        id: "upd_dt",
        displayName: "Update Date",
      },
    ],
    []
  );

  const handleRetrieve = useCallback(async () => {
    //call request
    const res = await fetch(
      `${API_USERS}?id=${searchForm.id}&ofc_cd=${searchForm.ofc_cd}`
    );
    const result: { isSuccessful: boolean; userInfo: UserInfo[] } =
      await res.json();

    setRows([...result.userInfo]);
  }, [searchForm]);

  const handleCopy = useCallback(() => {
    //get selected row
    const selectedId = rowRef.current;
    if (!selectedId) {
      return;
    }
    const selectedRow = rows.filter((row) => row.id === selectedId)[0];

    //find max id
    let maxId = String(Math.max(...rows.map((row) => parseInt(row.id))) + 1);

    //insert last
    setRows([
      ...rows,
      {
        ...selectedRow,
        id: maxId,
      },
    ]);
  }, [rows]);

  const handleSave = useCallback(async () => {
    alert("handleSave");
  }, []);
  const handleDownExcel = useCallback(() => {}, []);

  const handleFormOnChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (!/\s/.test(target.value)) {
        setSearchForm((prev) => ({
          ...prev,
          [target.name]: target.value,
        }));
      }
    },
    []
  );

  console.log("render ui with rows");
  console.log(rows);

  return (
    <>
      <Navbar />
      <Sidebar title={"User Management ( ADM_SYS_0003 ) "}>
        <Button onClick={handleRetrieve}>Retrieve</Button>
        <Button onClick={handleCopy}>Copy</Button>
        <Button onClick={handleSave}>Save</Button>
        <Button state="disabled" onClick={handleDownExcel}>
          DownExcel
        </Button>
      </Sidebar>
      <Searchbar>
        <SearchField
          searchId={"id"}
          searchDisplay={"User ID"}
          boxWidth={"6rem"}
          value={searchForm.id}
          onChange={handleFormOnChange}
        />
        <SearchField
          searchId={"ofc_cd"}
          searchDisplay={"Office Code"}
          boxWidth={"5rem"}
          value={searchForm.ofc_cd}
          onChange={handleFormOnChange}
        />
      </Searchbar>
      <Table
        headerConfigs={headerConfigs}
        rowHandlers={rowHandlers}
        rowRef={rowRef}
      />
    </>
  );
}
