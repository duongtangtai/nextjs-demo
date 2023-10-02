"use client";

import {
  Button,
  Navbar,
  Navbar2,
  SearchField,
  Searchbar,
  Alert,
} from "@/components";
import Sidebar from "@/components/sidebar/Sidebar";
import { ToastContext } from "@/context/toast/ToastProvider";
import { API_PERMISSIONS, API_ROLES } from "@/lib/utils";
import { Form, Input, Select, Space, Table, Tag } from "antd";
import { RowSelectMethod, TableRowSelection } from "antd/es/table/interface";
import { getCookie } from "cookies-next";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const { Option } = Select;

type SearchForm = {
  name: string;
  description: string;
};

const initSearchForm: SearchForm = {
  name: "",
  description: "",
};

export async function getServerSideProps() {
  console.log("HEHEHEHEHEHEHEgetServerSideProps")
  return { props: { bar: 100 } };
}

export default function Page () {
  //user infomation
  const [form] = Form.useForm();
  const [searchForm, setSearchForm] = useState<SearchForm>(initSearchForm);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toast = useContext(ToastContext);
  const [data, setData] = useState<RoleInfo[]>([]);
  const [editingKeys, setEditingKeys] = useState<number[]>([]);
  const isEditing = (record: any) => editingKeys.includes(record.key);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<PermissionInfo[]>([]);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFormOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!/\s/.test(target.value)) {
      setSearchForm((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  useEffect(() => {
    const gerPermissions = async () => {
      const res = await fetch(API_PERMISSIONS, {
        method: "GET",
      });
      const { content, statusCode, errors }: ResponseDTO = await res.json();
      if (statusCode !== 200) {
        toast.notify({
          type: "error",
          message: errors.toString(),
        });
      } else {
        setPermissions(content as PermissionInfo[]);
      }
    };
    gerPermissions();
  }, []);
  //-------------------------------------------START TABLE HANDLING-------------------------------------------------
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      editable: true,
      hidden: true,
      className: "hidden",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: {
        compare: (a: any, b: any) => a.name.localeCompare(b.name),
        multiple: 1,
      },
      editable: true,
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: {
        compare: (a: any, b: any) => a.description.localeCompare(b.description),
        multiple: 3,
      },
      editable: true,
      width: "40%",
    },
    {
      title: "Permissions",
      dataIndex: "permissionNames",
      editable: true,
      // width: "50%",
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType:
          col.dataIndex === "permissionNames" ? "multiple-select" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleRowOnSelect = (
    record: RoleInfo,
    selected: boolean,
    selectedRows: RoleInfo[]
  ) => {
    if (selected) {
      form.setFieldsValue({
        [`${record.key}_id`]: record.id,
        [`${record.key}_name`]: record.name,
        [`${record.key}_description`]: record.description,
        [`${record.key}_permissionNames`]: record.permissionNames,
      });
      setEditingKeys((prev) => [...prev, record.key]);
    } else {
      setEditingKeys((prev) => {
        prev.splice(prev.indexOf(record.key), 1);
        return [...prev];
      });
    }
  };

  const handleRowOnChange = (
    selectedRowKeys: React.Key[],
    selectedRows: RoleInfo[],
    info: {
      type: RowSelectMethod;
    }
  ) => {
    if (info.type === "all") {
      if (selectedRowKeys.length === 0) {
        //deselect all
        setEditingKeys([]);
      } else {
        data.forEach((role) => {
          form.setFieldsValue({
            [`${role.key}_id`]: role.id,
            [`${role.key}_name`]: role.name,
            [`${role.key}_description`]: role.description,
            [`${role.key}_permissionNames`]: role.permissionNames,
          });
        });
        setEditingKeys(data.map((role) => role.key));
      }
    }
  };

  const rowSelection: TableRowSelection<RoleInfo> = {
    type: "checkbox",
    selectedRowKeys: editingKeys,
    onSelect: handleRowOnSelect,
    onChange: handleRowOnChange,
  };

  const getTagPermissionColor = (name: string) => {
    const type = name.substring(0, name.indexOf("_"));
    let color: string;
    switch (type) {
      case "READ":
        color = "green";
        break;
      case "CREATE":
        color = "blue";
        break;
      case "UPDATE":
        color = "purple";
        break;
      case "DELETE":
        color = "error";
        break;
      default:
        color = "default";
    }
    return color;
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }: {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: string;
    record: any;
    index: any;
    children: any;
  }) => {
    let inputNode;
    switch (dataIndex) {
      case "permissionNames":
        inputNode = editing ? (
          <Select
            mode="multiple"
            style={{
              width: "100%",
            }}
            placeholder="Choose permissions"
            onChange={(arr) => {
              record[dataIndex] = arr;
            }}
            optionLabelProp="label"
            virtual={false}
            onDeselect={() => console.log("on deselect")}
            onSelect={() => console.log("on select")}
            tagRender={(props) => {
              return (
                <Tag
                  closable={true}
                  color={getTagPermissionColor(props.value)}
                  onClose={props.onClose}
                  style={{
                    margin: "4px",
                  }}
                >
                  {props.value}
                </Tag>
              );
            }}
          >
            {permissions.map((permission) => (
              <Option
                key={permission.name}
                value={permission.name}
                label={permission.description}
                
              >
                <Tag
                  closable={false}
                  color={getTagPermissionColor(permission.name)}
                  style={{
                    width: "100%",
                    fontSize: "0.8rem",
                  }}
                >
                  {permission.name}
                </Tag>
              </Option>
            ))}
          </Select>
        ) : (
          <>
            {record.permissionNames.map((name: string) => {
              return (
                <Space key={name} style={{ fontSize: "0.5rem" }}>
                  <Tag
                    closable={false}
                    color={getTagPermissionColor(name)}
                    style={{
                      margin: "4px",
                    }}
                  >
                    {name}
                  </Tag>
                </Space>
              );
            })}
          </>
        );
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={`${record.key}_${dataIndex}`}
                style={{
                  margin: 0,
                  padding: 0,
                }}
                initialValue={record[dataIndex]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              inputNode
            )}
          </td>
        );
      default:
        inputNode = (
          <Input
            onChange={(e) => {
              record[dataIndex] = e.target.value;
            }}
          />
        );
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={`${record.key}_${dataIndex}`}
                style={{
                  margin: 0,
                  padding: 0,
                }}
                rules={[
                  {
                    required: dataIndex !== "id",
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
    }
  };

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  //-------------------------------------------END TABLE HANDLING-------------------------------------------------
  //-------------------------------------------START BUTTON FUNCTIONS-------------------------------------------------
  //button actions
  const handleRetrieve = useMemo(() => {
    return async () => {
      //clear everything before retrieving
      setEditingKeys([]);
      setDeletedIds([]);
      //call request
      const response = await fetch(
        `${API_ROLES}?name=${searchForm.name}&description=${searchForm.description}`
      );
      const { content, hasErrors, errors }: ResponseDTO = await response.json();
      if (hasErrors) {
        toast.notify({
          type: "warning",
          message: errors.toString(),
        });
      } else {
        const roles = content as RoleInfo[];
        roles.forEach((role, index) => {
          role.key = index;
        });
        setData([...roles]);
      }
    };
  }, [searchForm]);

  const handleRowAdd = useMemo(() => {
    return () => {
      //add a new row to datasource
      let nextKey: number;
      if (data.length === 0) {
        nextKey = 1;
      } else {
        nextKey = Math.max(...data.map((role) => role.key)) + 1;
      }
      const newRole: RoleInfo = {
        key: nextKey,
        id: "",
        name: "",
        description: "",
        permissionNames: [],
      };

      setData([...data, newRole]);
      form.setFieldsValue({
        [`${nextKey}_id`]: newRole.id,
        [`${nextKey}_name`]: newRole.name,
        [`${nextKey}_description`]: newRole.description,
        [`${nextKey}_permissionNames`]: newRole.permissionNames,
      });
      setEditingKeys((prev) => [...prev, nextKey]);
    };
  }, [data, form]);

  const handleOpenDeleteAlert = () => {
    const formObj = form.getFieldsValue();
    if (Object.keys(formObj).length === 0) {
      toast.notify({
        type: "info",
        message: "Please select a row!",
      });
      return;
    }
    setIsDeleteAlertOpen(true);
  };

  const handleCloseDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
  };

  const handleRowDelete = () => {
    /*
      loop through this obj => if ?_id => not undefined => add id to an array => when we save, send this array along with them
      then delete from datasource and editing keys
      */
    const formObj = form.getFieldsValue();
    for (const name in formObj) {
      if (
        name.indexOf("id") > 0 &&
        formObj[name] !== undefined &&
        formObj[name] !== ""
      ) {
        //this id needs to be stored
        setDeletedIds((prev) => [...prev, formObj[name]]);
      }
      const key = parseInt(name.split("_")[0]);
      //delete from datasource and editing keys
      setData((prev) => prev.filter((role) => role.key !== key));
      setEditingKeys((prev) => prev.filter((editingKey) => editingKey !== key));
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = useMemo(() => {
    return () => {
      console.log("HANDLE SAVE!!!!");
      const formObj = form.getFieldsValue();
      console.log(formObj);
      console.log("deletedIds");
      console.log(deletedIds);
      if (Object.keys(formObj).length === 0 && deletedIds.length === 0) {
        toast.notify({
          type: "info",
          message: "There's nothing to save!",
        });
        return;
      }

      form
        .validateFields()
        .then(async () => {
          //call a request to save
          const resp = await fetch(`${API_ROLES}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              createAndUpdateDtos: form.getFieldsValue(),
              deletedIds: deletedIds,
            }),
          });

          const { content, hasErrors, errors }: ResponseDTO = await resp.json();
          if (!hasErrors) {
            toast.notify({
              type: "success",
              message: content,
            });
            handleRetrieve();
          } else {
            toast.notify({
              type: "error",
              message: errors.toString(),
            });
          }
        })
        .catch(() => {
          toast.notify({
            type: "error",
            message: "Please make sure data is correct!.",
          });
        });
    };
  }, [deletedIds]);
  //-------------------------------------------END BUTTON FUNCTIONS-------------------------------------------------
  console.log("RENDERING-----------------");
  console.log(data);
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} handleSidebar={handleSidebar}/>
      <Navbar />
      <Navbar2 title={"Role Management"} handleSidebar={handleSidebar}>
        <Button onClick={handleRetrieve}>Retrieve</Button>
        <Button onClick={handleRowAdd}>Row Add</Button>
        <Button onClick={handleOpenDeleteAlert}>Row Delete</Button>
        <Button onClick={handleSave}>Save</Button>
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
      <Form form={form} component={false}>
        <Table
          rowSelection={rowSelection}
          components={components}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 8,
          }}
          // onHeaderRow={() => {

          // }}
        />
      </Form>
      {isDeleteAlertOpen && (
        <Alert
          message={`Do you want to delete these roles?`}
          handleConfirm={handleRowDelete}
          handleClose={handleCloseDeleteAlert}
        />
      )}
    </>
  );
};

// export default page;
