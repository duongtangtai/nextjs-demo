"use client";

import { Button, Navbar, Navbar2, SearchField, Searchbar } from "@/components";
import Sidebar from "@/components/sidebar/Sidebar";
import { Form, Input, Radio, Space, Table } from "antd";
import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { IconContext } from "react-icons";
import { API_VESSEL_MANAGEMENT } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ToastContext } from "@/context/toast/ToastProvider";

type SearchForm = {
  name: string;
  description: string;
};

const initSearchForm: SearchForm = {
  name: "",
  description: "",
};

const page = () => {
  const [form] = Form.useForm();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [rowData, setRowdata] = useState<VesselInfo[]>([]);
  const router = useRouter();
  const toast = useContext(ToastContext);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log("useEffect");
    //set form data based on search params
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.size === 0) {
      //no search params
      return;
    }
    searchParams.forEach((value, key) => {
      form.setFieldValue(key, value);
    });
    fetchRowData();
  }, []);

  const fetchRowData = () => {
    //fetch row data based on form
    form
      .validateFields()
      .then(async () => {
        const urlParams = new URLSearchParams();
        const obj = form.getFieldsValue();
        Object.keys(obj).map((key) => {
          urlParams.set(key, obj[key] ?? "");
        });
        setIsTableLoading(true);
        const resp = await fetch(
          `${API_VESSEL_MANAGEMENT}?${urlParams.toString()}`
        );
        const { content }: ResponseDTO = await resp.json();
        console.log("fetched:");
        console.log(content);
        const rowData = content as VesselInfo[];
        rowData.forEach((row, index) => (row.key = index));
        setRowdata(rowData);
        setIsTableLoading(false);
      })
      .catch(() => {
        toast.notify({
          type: "error",
          message: "Please make sure data is correct!.",
        });
      });
  };

  //--------------------START TABLE----------------------
  const columns = [
    {
      title: "Code",
      dataIndex: "vslCd",
    },
    {
      title: "VSL Name",
      dataIndex: "vslEngNm",
      width: "20%",
    },
    {
      title: "Carrier Code",
      dataIndex: "crrCd",
      width: "10%",
    },
    {
      title: "Net Ton",
      dataIndex: "netRgstTongWgt",
      width: "10%",
    },
    {
      title: "Call Sign",
      dataIndex: "callSgnNo",
      width: "10%",
    },
    {
      title: "IMO No.",
      dataIndex: "lloydNo",
      width: "10%",
    },
    {
      title: "Trunk/Feeder",
      dataIndex: "fdrDivCd",
    },
  ];
  //--------------------END TABLE----------------------------
  //--------------------START BUTTON----------------------------
  const handleRetrieve = () => {
    //set search query params
    const urlParams = new URLSearchParams();
    const obj = form.getFieldsValue();
    Object.keys(obj).map((key) => {
      urlParams.set(key, obj[key] ?? "");
    });
    router.push(`/vessel-management?${urlParams.toString()}`);
    //call api
    fetchRowData();
  };
  //--------------------END BUTTON----------------------------

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} handleSidebar={handleSidebar} />
      <Navbar />
      <Navbar2 title={"Vessel Management"} handleSidebar={handleSidebar}>
        <Button onClick={handleRetrieve}>Retrieve</Button>
      </Navbar2>
      <Form form={form}>
        <Space
          style={{
            backgroundColor: "#DDDDDD",
            display: "flex",
            padding: "1rem 1rem 0 1rem",
          }}
        >
          <Space direction="vertical">
            <Form.Item
              label="Vessel Code"
              name="vslCd"
              style={{
                fontWeight: "bold",
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input Vessel Code`,
                },
                {
                  min: 2,
                  message: `At least 2 characters`,
                },
              ]}
            >
              <Input style={{ width: "5rem" }} />
            </Form.Item>
            <Space>
              <Form.Item
                label="Carrier Code"
                name="crrCd"
                style={{
                  fontWeight: "bold",
                  paddingLeft: "0.5rem",
                }}
              >
                <Input style={{ width: "5rem" }} />
              </Form.Item>
              <span
                onClick={() => {
                  alert("this function will be handled later!");
                }}
              >
                <IconContext.Provider
                  value={{
                    size: "20",
                    color: "blue",
                    style: {
                      transform: "translateY(-0.55rem)",
                      backgroundColor: "white",
                      borderRadius: "6px",
                      padding: "0.33rem",
                      cursor: "pointer",
                    },
                  }}
                >
                  <PiMagnifyingGlassFill />
                </IconContext.Provider>
              </span>
            </Space>
          </Space>
          <Space direction="vertical">
            <Form.Item
              label="Vessel Name"
              name="vslEngNm"
              style={{
                fontWeight: "bold",
              }}
            >
              <Input style={{ width: "30rem" }} />
            </Form.Item>
            <Form.Item
              label="Call Sign"
              name="callSgnNo"
              style={{
                fontWeight: "bold",
                paddingLeft: "1.5rem",
              }}
            >
              <Input style={{ width: "15rem" }} />
            </Form.Item>
          </Space>
          <Space direction="vertical">
            <Form.Item
              name="fdrDivCd"
              style={{
                fontWeight: "bold",
                paddingLeft: "1.5rem",
              }}
              initialValue={"A"}
            >
              <Radio.Group onChange={() => {}}>
                <Radio value={"A"}>All</Radio>
                <Radio value={"T"}>Trunk</Radio>
                <Radio value={"O"}>Feeder</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="IMO No."
              name="lloydNo"
              style={{
                fontWeight: "bold",
                paddingLeft: "1.5rem",
              }}
            >
              <Input style={{ width: "15rem" }} />
            </Form.Item>
          </Space>
        </Space>
      </Form>
      <Table
        bordered
        dataSource={rowData}
        columns={columns}
        pagination={{
          pageSize: 8,
        }}
        loading={isTableLoading}
      />
    </>
  );
};

export default page;
