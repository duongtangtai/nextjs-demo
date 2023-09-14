"use client";

import { useState, ChangeEvent, useCallback, useMemo, useRef } from "react";
import {
  Navbar,
  Navbar2,
  Button,
  Searchbar,
  SearchField,
  Table,
} from "@/components/index";
import { API_USERS } from "@/lib/utils";
import Sidebar from "@/components/sidebar/Sidebar";

type SearchForm = {
  username: string;
  email: string;
};

const initSearchForm: SearchForm = {
  username: "",
  email: "",
};

export default function Home() {
  const [searchForm, setSearchForm] = useState<SearchForm>(initSearchForm);
  const [rows, setRows] = useState<UserInfo[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        id: "username",
        displayName: "User Name",
      },
      {
        id: "email",
        displayName: "Office Code",
      },
      {
        id: "updatedBy",
        displayName: "Update User",
      },
      {
        id: "updatedAt",
        displayName: "Update Date",
      },
    ],
    []
  );

  const handleRetrieve = useCallback(async () => {
    //call request
    const response = await fetch(
      `${API_USERS}?username=${searchForm.username}&email=${searchForm.email}`
    );
    const {content, hasErrors, errors} : ResponseDTO = await response.json();
    if (hasErrors) {
      alert("error happens: " + errors.toString())
    } else {
      const users = content as UserInfo[];
      setRows([...users])
    }
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
      <Sidebar
        isOpen={isSidebarOpen}
        handleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Navbar />
      <Navbar2
        title={"User Management ( ADM_SYS_0003 ) "}
        handleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Button onClick={handleRetrieve}>Retrieve</Button>
        <Button onClick={handleCopy}>Copy</Button>
        <Button onClick={handleSave}>Save</Button>
        <Button state="disabled" onClick={handleDownExcel}>
          DownExcel
        </Button>
      </Navbar2>
      <Searchbar>
        <SearchField
          searchId={"username"}
          searchDisplay={"Username"}
          boxWidth={"6rem"}
          value={searchForm.username}
          onChange={handleFormOnChange}
        />
        <SearchField
          searchId={"email"}
          searchDisplay={"Email"}
          boxWidth={"6rem"}
          value={searchForm.email}
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
