"use client";
import { ToastContext } from "@/context/toast/ToastProvider";
import { API_USERS_CHANGE_PASSWORD } from "@/lib/utils";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { getCookie } from "cookies-next";
import { useContext, useEffect } from "react";
import io from 'socket.io-client'

const Page = () => {
  const [form] = useForm();
  const toast = useContext(ToastContext)

  useEffect(() => {
    console.log("useEffect.......")
    const socket = io('http://localhost:3001')
    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on('onNotification', (data) => {
      console.log("onNotification");
      console.log(data)
      toast.notify({
        type: "info",
        message: data
      })
    });
  }, [])

  const handleSubmit = async () => {
    form
    .validateFields()
    .then(async () => {
      //call a request to save
      const userInfo: UserInfo = JSON.parse(getCookie("userInfo") as string);
      const currentPassword = form.getFieldValue("currentPassword")
      const newPassword = form.getFieldValue("newPassword")
      const confirmNewPassword = form.getFieldValue("confirmNewPassword")
      const resp = await fetch(`${API_USERS_CHANGE_PASSWORD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo.id,
          currentPassword,
          newPassword,
          confirmNewPassword
        }),
      });

      const { content, hasErrors, errors }: ResponseDTO = await resp.json();
      if (!hasErrors) {
        toast.notify({
          type: "success",
          message: content,
        });
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


  const formOnChange = (name: string, value: string): Promise<any> => {
    if (value.includes(" ")) {
      return Promise.reject(new Error("No spaces allowed."));
    }
    //no space => check the confirmNewPassword
    if (
      name === "confirmNewPassword" &&
      form.getFieldValue("newPassword") !== undefined &&
      value !== form.getFieldValue("newPassword")
    ) {
      return Promise.reject(new Error("New password and Confirm new password must match."));
    }
    if (
      name === "newPassword" &&
      form.getFieldValue("currentPassword") !== undefined &&
      value === form.getFieldValue("currentPassword")
    ) {
      return Promise.reject(new Error("New password and Old password should be different."));
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form
        form={form}
        style={{
          padding: "2rem",
          width: "40%",
        }}
        layout="vertical"
      >
        <Form.Item
          label="Current password"
          name="currentPassword"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              validator: (_: any, value) => formOnChange(_.field, value),
            },
          ]}
        >
          <Input.Password placeholder="Input your current password" />
        </Form.Item>
        <Form.Item
          label="New password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              validator: (_: any, value) => formOnChange(_.field, value),
            },
          ]}
        >
          <Input.Password placeholder="Input your new password" />
        </Form.Item>
        <Form.Item
          label="Confirm new password"
          name="confirmNewPassword"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              validator: (_: any, value) => formOnChange(_.field, value),
            },
          ]}
        >
          <Input.Password placeholder="Confirm your new password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Page;
