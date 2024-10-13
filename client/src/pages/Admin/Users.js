import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [usersList, setUsersList] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/users");
      if (data?.success) {
        setUsersList(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <table style={{ width: "90%" }}>
              <tr>
                <th>#</th>
                <th>User Email</th>
                <th>User Name</th>
              </tr>
              {usersList?.map((userItem, userItemIndex) => {
                return (
                  <tr key={userItemIndex}>
                    <td>{userItemIndex}</td>
                    <td>{userItem.email}</td>
                    <td>{userItem.name}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
