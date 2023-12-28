import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Spin, Typography } from "antd";
import ClientTable from "./components/ClientTable";
import FilterMenu from "./components/FilterMenu";
import { useAppStore } from "@/stores/useAppStore";
import { useClientStore } from "@/stores/useClientStore";
import { getAllUsers } from "@/apis/user.api";

const items = [
  { value: "all", title: "All clients" },
  { value: "active", title: "Active" },
  { value: "inactive", title: "Inactive" },
];

const ClientManagementPage: React.FunctionComponent = () => {
  const [selectedFilter, setSelectedFilter] = useState<any>(items[0]);

  const fetchProductData = useRef<any>(null);

  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const clients = useClientStore((state) => state.clients);
  const setClients = useClientStore((state) => state.setClients);
  const setFilteredClients = useClientStore(
    (state) => state.setFilteredClients
  );

  useEffect(() => {
    fetchProductData.current = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllUsers();
        setClients(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProductData.current();
  }, []);

  useEffect(() => {
    if (selectedFilter.value === "all") {
      setFilteredClients(null);
    } else if (selectedFilter.value === "active") {
      const data = clients.filter((client) => client.isActive);
      setFilteredClients(data);
    } else if (selectedFilter.value === "inactive") {
      const data = clients.filter((client) => !client.isActive);
      setFilteredClients(data);
    }
  }, [selectedFilter]);

  return (
    <div className="p-8">
      {/* TITlE */}
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Customer management
          </Typography.Title>
        </Col>
      </Row>

      {/* FILTER */}
      <FilterMenu
        selectedItem={selectedFilter}
        items={items}
        onSelect={(item: any) => setSelectedFilter(item)}
      />

      {/* TABLE */}
      {!isLoading ? (
        <ClientTable />
      ) : (
        <Spin spinning={isLoading} size="large" />
      )}
    </div>
  );
};

export default ClientManagementPage;
