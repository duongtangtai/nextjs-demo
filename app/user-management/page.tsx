"use client";

import {
  useState,
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useContext,
  useEffect,
} from "react";
import {
  Navbar,
  Navbar2,
  Button,
  Searchbar,
  SearchField,
  Table,
} from "@/components/index";
import { API_ROLES, API_USERS } from "@/lib/utils";
import Sidebar from "@/components/sidebar/Sidebar";
import { ToastContext } from "@/context/toast/ToastProvider";
import { Input, Modal, Form, Select, Space } from "antd";
import Alert from "@/components/alert/Alert";
import { getCookie } from "cookies-next";

const { Option } = Select;

type SearchForm = {
  username: string;
  email: string;
};

const initSearchForm: SearchForm = {
  username: "",
  email: "",
};

const addUserPrefix = "add_user";
const updateUserPrefix = "update_user";

export default function Home() {
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [searchForm, setSearchForm] = useState<SearchForm>(initSearchForm);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [addUserBtnDisabled, setAddUserBtnDisabled] = useState<boolean>(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [updateUserBtnDisabled, setUpdateUserBtnDisabled] =
    useState<boolean>(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
  const toast = useContext(ToastContext);
  const rowRef = useRef("");
  const [rows, setRows] = useState<UserInfo[]>([]);
  const rowHandlers = useMemo(() => {
    return {
      rows,
      setRows,
    };
  }, [rows]);
  //init roles
  const [roles, setRoles] = useState<RoleInfo[]>([]);
  useEffect(() => {
    const getRoles = async () => {
      const res = await fetch(API_ROLES, {
        method: "GET",
      });
      const { content, statusCode, errors }: ResponseDTO = await res.json();
      if (statusCode !== 200) {
        toast.notify({
          type: "error",
          message: errors.toString(),
        });
      } else {
        setRoles(content as RoleInfo[]);
        console.log("get roles")
        console.log(content)
      }
    };
    getRoles();
  }, []);

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
        id: "roles",
        displayName: "Roles",
      },
      {
        id: "updated_by",
        displayName: "Update User",
      },
      {
        id: "updated_at",
        displayName: "Update Date",
      },
    ],
    []
  );

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

  const handleRetrieve = useCallback(async () => {
    //call request
    const response = await fetch(
      `${API_USERS}?username=${searchForm.username}&email=${searchForm.email}`
    );
    const { content, hasErrors, errors }: ResponseDTO = await response.json();
    if (hasErrors) {
      toast.notify({
        type: "warning",
        message: errors.toString()
      })
    } else {
      const users = content as UserInfo[];
      setRows([...users]);
    }
  }, [searchForm]);

  

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenUpdateModal = useCallback(async () => {
    if (rowRef.current === "") {
      toast.notify({
        type: "info",
        message: "Please select a row",
      });
      return;
    }
    setIsUpdateModalOpen(true);
    const userInfo = rows.filter((user) => user.id === rowRef.current)[0];
    updateForm.setFieldValue("id", userInfo.id);
    updateForm.setFieldValue("username", userInfo.username);
    updateForm.setFieldValue("email", userInfo.email);
    updateForm.setFieldValue("password", "");
    updateForm.setFieldValue(
      "roles",
      userInfo.roles === "" ? [] : userInfo.roles.split(",")
    );
    await updateForm.validateFields()
  }, [rowRef, rows]);

  const handleOpenDeleteAlert = useCallback(() => {
    if (rowRef.current === "") {
      toast.notify({
        type: "info",
        message: "Please select a row",
      });
      return;
    }
    //delete selected row
    setIsDeleteAlertOpen(true);
  }, [rowRef]);

  const handleAddUser = async () => {
    addForm
      .validateFields()
      .then(async () => {
        const username: string = addForm.getFieldValue("username");
        const password: string = addForm.getFieldValue("password");
        const email: string = addForm.getFieldValue("email");
        const roles: string[] = addForm.getFieldValue("roles");
        if (username === "" || password === "" || email === "") {
          return;
        }
        const res = await fetch(API_USERS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            email,
            roles,
          }),
        });
        const { content, statusCode, errors }: ResponseDTO = await res.json();
        const userInfo: UserInfo = content as UserInfo;
        if (statusCode === 200) {
          toast.notify({
            type: "success",
            message: `Add user ${userInfo.username} successfully!`,
          });
          handleRetrieve();
        } else {
          toast.notify({
            type: "warning",
            message: `${errors.toString()}`,
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

  //UPDATE USER
  const handleUpdateUser = async () => {
    const id: string = updateForm.getFieldValue("id");
    const username: string = updateForm.getFieldValue("username");
    const password: string = updateForm.getFieldValue("password");
    const email: string = updateForm.getFieldValue("email");
    const roles: string[] = updateForm.getFieldValue("roles");
    const res = await fetch(`${API_USERS}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        username,
        password,
        email,
        roles,
      }),
    });
    const { statusCode, errors }: ResponseDTO = await res.json();
    if (statusCode === 200) {
      toast.notify({
        type: "success",
        message: `Update user ${username} successfully!`,
      });
      handleRetrieve();
    } else {
      toast.notify({
        type: "warning",
        message: `${errors.toString()}`,
      });
    }
  };

  //DELETE USER
  const handleCloseDeleteUserAlert = () => {
    setIsDeleteAlertOpen(false);
  };

  const handleDeleteUser = useCallback(async () => {
    const res = await fetch(`${API_USERS}?id=${rowRef.current}`, {
      method: "DELETE",
    });
    const { statusCode, errors }: ResponseDTO = await res.json();
    if (statusCode === 200) {
      toast.notify({
        type: "success",
        message: `Delete user successfully!`,
      });
      setIsDeleteAlertOpen(false);
      handleRetrieve();
      rowRef.current = "";
    } else {
      toast.notify({
        type: "error",
        message: errors.toString(),
      });
    }
  }, [rowRef]);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} handleSidebar={handleSidebar}/>
      <Navbar />
      <Navbar2 title={"User Management"} handleSidebar={handleSidebar}>
        <Button onClick={handleRetrieve}>Retrieve</Button>
        <Button onClick={handleOpenAddModal}>Add</Button>
        <Button onClick={handleOpenUpdateModal}>Update</Button>
        <Button onClick={handleOpenDeleteAlert}>Delete</Button>
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
      {/* --------------------------------------------------------- ADD USER --------------------------------------------------------------*/}
      <Modal
        title="ADD USER"
        open={isAddModalOpen}
        onOk={handleAddUser}
        onCancel={() => setIsAddModalOpen(false)}
        okButtonProps={{ disabled: addUserBtnDisabled }}
      >
        <Form
          form={addForm}
          name={addUserPrefix}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onPlay={() => setAddUserBtnDisabled(true)}
          onFieldsChange={() => {
            setAddUserBtnDisabled(
              addForm.getFieldsError().some((field) => field.errors.length > 0)
            );
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                validator: (_, value) =>
                  !value.includes(" ")
                    ? Promise.resolve()
                    : Promise.reject(new Error("No spaces allowed")),
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
              {
                validator: (_, value) =>
                  !value.includes(" ")
                    ? Promise.resolve()
                    : Promise.reject(new Error("No spaces allowed")),
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                validator: (_, value) =>
                  !value.includes(" ")
                    ? Promise.resolve()
                    : Promise.reject(new Error("No spaces allowed")),
              },
            ]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>
          <Form.Item label="Roles" name="roles">
            <Select
              mode="multiple"
              placeholder="Choose user roles"
              onChange={() => {}}
              optionLabelProp="label"
              virtual={false}
            >
              {roles.map((role) => (
                <Option
                  key={role.name}
                  value={role.name}
                  label={role.description}
                >
                  <Space>
                    <span
                      role="img"
                      aria-label={role.description}
                      style={{ fontSize: "0.5rem" }}
                    >
                      {role.name}
                    </span>
                    {role.description}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------------------------- UPDATE USER --------------------------------------------------------------*/}
      <Modal
        title="UPDATE USER"
        open={isUpdateModalOpen}
        onOk={handleUpdateUser}
        onCancel={() => setIsUpdateModalOpen(false)}
        okButtonProps={{ disabled: updateUserBtnDisabled }}
      >
        <Form
          form={updateForm}
          name={updateUserPrefix}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFieldsChange={() => {
            setUpdateUserBtnDisabled(
              updateForm
                .getFieldsError()
                .some((field) => field.errors.length > 0)
            );
          }}
          autoComplete="off"
        >
          <Form.Item name="id" hidden>
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                validator: (_, value) =>
                  !value.includes(" ")
                    ? Promise.resolve()
                    : Promise.reject(new Error("No spaces allowed")),
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
              {
                validator: (_, value) =>
                  !value.includes(" ")
                    ? Promise.resolve()
                    : Promise.reject(new Error("No spaces allowed")),
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                validator: (_, value) =>
                  !value.includes(" ")
                    ? Promise.resolve()
                    : Promise.reject(new Error("No spaces allowed")),
              },
            ]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>
          <Form.Item label="Roles" name="roles">
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Choose user roles"
              onChange={() => {}}
              optionLabelProp="label"
              virtual={false}
            >
              {roles.map((role) => (
                <Option
                  key={role.name}
                  value={role.name}
                  label={role.description}
                >
                  <Space>
                    <span
                      role="img"
                      aria-label={role.description}
                      style={{ fontSize: "0.5rem" }}
                    >
                      {role.name}
                    </span>
                    {role.description}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {isDeleteAlertOpen && (
        <Alert
          message={`Do you want to delete this user?`}
          handleConfirm={handleDeleteUser}
          handleClose={handleCloseDeleteUserAlert}
        />
      )}
    </>
  );
}
