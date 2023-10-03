"use client";

import { Button, Navbar, Navbar2, SearchField, Searchbar } from "@/components";
import Sidebar from "@/components/sidebar/Sidebar";
import { Form, Input, Radio, Space, Table } from "antd";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { IconContext } from "react-icons";
import { API_VESSEL_MANAGEMENT } from "@/lib/utils";
import { useRouter } from "next/navigation"

type SearchForm = {
  name: string;
  description: string;
};

const initSearchForm: SearchForm = {
  name: "",
  description: "",
};

const page = () => {
  console.log("RENDERING VESSEL MANAGEMENT");
  const [form] = Form.useForm();
  const [searchForm, setSearchForm] = useState<SearchForm>(initSearchForm);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [rowData, setRowdata] = useState<VesselInfo[]>([])
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    //use searchParams to input inside form
    setIsTableLoading(true);
    const fetchData = async () => {
      const vslCd = searchParams?.get("vslCd");
      form.setFieldValue("vslCd", vslCd);
      if (!vslCd) {
        return;
      }
      const resp = await fetch(`${API_VESSEL_MANAGEMENT}?vslCd=${vslCd ?? ""}`);
      const {content}: ResponseDTO = await resp.json();
      console.log("fetched:");
      console.log(content);
      setRowdata(content as VesselInfo[])
    };
    fetchData();
    setIsTableLoading(false);
  }, [pathName]);

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
      dataIndex: "callSignNo",
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
  const handleRetrieve = async (e: any) => {
    e.preventDefault();
    console.log("oldpathname: "  + pathName)
    console.log("oldSearchParams: "  + searchParams)
    router.push("/vessel-management?vslCd=jy")
  
    console.log("pathName: " + pathName)
    console.log("searchParams: " + searchParams)
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
              initialValue={"Trunk"}
            >
              <Radio.Group onChange={() => {}}>
                <Radio value={"All"}>All</Radio>
                <Radio value={"Trunk"}>Trunk</Radio>
                <Radio value={"Feeder"}>Feeder</Radio>
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
