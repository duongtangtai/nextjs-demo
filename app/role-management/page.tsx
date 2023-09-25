"use client";

import { Button, Navbar, Navbar2, SearchField, Searchbar } from "@/components";
import Alert from "@/components/alert/Alert";
import Sidebar from "@/components/sidebar/Sidebar";
import { ToastContext } from "@/context/toast/ToastProvider";
import { API_ROLES } from "@/lib/utils";
import {
  Button as AntButton,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { RowSelectMethod } from "antd/es/table/interface";
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={`${record.key}_${dataIndex}`}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
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
};

const page = () => {
  const [form] = Form.useForm();
  const [searchForm, setSearchForm] = useState<SearchForm>(initSearchForm);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toast = useContext(ToastContext);
  const [data, setData] = useState<RoleInfo[]>([]);
  const [editingKeys, setEditingKeys] = useState<number[]>([]);
  const isEditing = (record: any) => editingKeys.includes(record.key);

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
      roles.forEach((role, index) => {
        role.key = index;
      });
      setData([...roles]);
    }
  }, [searchForm]);

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
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: {
        compare: (a: any, b: any) => a.description.localeCompare(b.description),
        multiple: 3,
      },
      editable: true,
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
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleRowAdd = useCallback(() => {
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
    };

    setData([...data, newRole]);
    form.setFieldsValue({
      ...newRole,
    });
    setEditingKeys((prev) => [...prev, nextKey]);
  }, [data]);

  const handleRowDelete = useCallback(() => {
    console.log("handleDelete");
    console.log(form.getFieldsValue());
    //if no id => simply delete row from datasource and editing keys
    //if not exist in datasource => it's new
    //if id => call a request to delete
  }, [editingKeys, form]);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} handleSidebar={handleSidebar} />
      <Navbar />
      <Navbar2 title={"Role Management"} handleSidebar={handleSidebar}>
        <Button onClick={handleRetrieve}>Retrieve</Button>
        <Button onClick={handleRowAdd}>Row Add</Button>
        <Button onClick={handleRowDelete}>Row Delete</Button>
        <Button onClick={() => {}}>Save</Button>
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
          rowSelection={{
            type: "checkbox",

            onSelect: (record, selected, selectedRows) => {
              console.log(record, selected, selectedRows);
              form.setFieldsValue({
                [`${record.key}_id`]: record.id,
                [`${record.key}_name`]: record.name,
                [`${record.key}_description`]: record.description,
              });
              setEditingKeys((prev) => {
                if (!prev.includes(record.key)) {
                  return [...prev, record.key];
                } else {
                  prev.splice(prev.indexOf(record.key), 1);
                  return [...prev];
                }
              });
            },
            selectedRowKeys: editingKeys,
            onChange: (
              selectedRowKeys: React.Key[],
              selectedRows: RoleInfo[],
              info: {
                type: RowSelectMethod;
              }
            ) => {
              console.log("onchange hehe");
              console.log(selectedRowKeys);
              console.log(selectedRows);
              console.log(info);
              if (info.type === "all") {
                if (selectedRowKeys.length === 0) {
                  setEditingKeys([]);
                } else {
                  data.forEach((role) => {
                    form.setFieldsValue({
                      [`${role.key}_id`]: role.id,
                      [`${role.key}_name`]: role.name,
                      [`${role.key}_description`]: role.description,
                    });
                  });
                  setEditingKeys(data.map((role) => role.key));
                }
              }
            },
          }}
          onChange={() => {
            console.log("onchange");
          }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"

          // pagination={{
          //   onChange: cancel,
          // }}
        />
      </Form>
    </>
  );
};

export default page;
