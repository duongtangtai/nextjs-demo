"use client";

import {
  Button,
  Navbar,
  Navbar2,
  SearchField,
  Searchbar,
  Table,
} from "@/components";
import Alert from "@/components/alert/Alert";
import Sidebar from "@/components/sidebar/Sidebar";
import { ToastContext } from "@/context/toast/ToastProvider";
import { API_ROLES } from "@/lib/utils";
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type SearchForm = {
  name: string;
  description: string;
};

const initSearchForm: SearchForm = {
  name: "",
  description: "",
};

const page = () => {
  const [searchForm, setSearchForm] = useState<SearchForm>(initSearchForm);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
  const toast = useContext(ToastContext);
  const rowRef = useRef("");
  const [rows, setRows] = useState<RoleInfo[]>([]);
  const rowHandlers = useMemo(() => {
    return {
      rows,
      setRows,
    };
  }, [rows]);

  const handleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

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

  //TABLE
  const headerConfigs: TableHeaderConfig[] = useMemo(
    () => [
      {
        id: "name",
        displayName: "Name",
      },
      {
        id: "description",
        displayName: "Description",
      },
    ],
    []
  );

  //button actions
  const handleRetrieve = useCallback(async () => {
    //call request
    const response = await fetch(
      `${API_ROLES}?name=${searchForm.name}&description=${searchForm.description}`
    );
    const { content, hasErrors, errors }: ResponseDTO = await response.json();
    if (hasErrors) {
      alert("error happens: " + errors.toString());
    } else {
      const roles = content as RoleInfo[];
      setRows([...roles]);
    }
  }, [searchForm]);
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} handleSidebar={handleSidebar} />
      <Navbar />
      <Navbar2 title={"Role Management"} handleSidebar={handleSidebar}>
        <Button onClick={handleRetrieve}>Retrieve</Button>
        <Button onClick={() => {}}>Add</Button>
        <Button onClick={() => {}}>Update</Button>
        <Button onClick={() => {}}>Delete</Button>
      </Navbar2>
      <Searchbar>
        <SearchField
          searchId={"name"}
          searchDisplay={"Name"}
          boxWidth={"6rem"}
          value={searchForm.name}
          onChange={handleFormOnChange}
        />
        <SearchField
          searchId={"description"}
          searchDisplay={"Description"}
          boxWidth={"6rem"}
          value={searchForm.description}
          onChange={handleFormOnChange}
        />
      </Searchbar>
      <Table
        headerConfigs={headerConfigs}
        rowHandlers={rowHandlers}
        rowRef={rowRef}
      />


      {/* {isDeleteAlertOpen && (
        <Alert
          message={`Do you want to delete this user?`}
          handleConfirm={handleDeleteUser}
          handleClose={handleCloseDeleteUserAlert}
        />
      )} */}
    </>
  );
};

export default page;
