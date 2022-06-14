import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./component/Header";
import TextField from "./component/TextField";
import UserList from "./component/UserList";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [contactno, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [email, setEmail] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [users, setUsers] = useState([]);
  var userList;
  const lst = [];
  const populateData = (data) => {
    lst.push(data);
  };
  var body;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", body, {
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": true,
          // "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log("getUsers", res.data);
        setUsers(res.data);
        // userList = res.data;
        // populateData(res.data.id);
        // console.log(lst);
      })
      .catch((error) => {
        console.log("fail" + error);
      });
  }, []);

  const deleteAllHandler = () => {
    axios
      .delete(`http://localhost:8000/api/users/deleteall`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("fail" + error);
        window.location.reload();
      });
  };

  const handleConfirmDeliveryClose = () => {
    axios
      .post("http://localhost:8000/api/users", body, {
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": true,
          // "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("fail" + error);
        window.location.reload();
      });
  };

  body = {
    first_name: firstName,
    last_name: lastName,
    address: address,
    post_code: postCode,
    contact_no: contactno,
    email: email,
    username: userName,
    password: password,
  };

  return (
    <div className="App">
      <Header />
      <ul style={{ display: "flex" }}>
        <ol
          style={{ fontWeight: isEdit == true ? "bold" : "", padding: "5px" }}
          onClick={() => {
            setIsCreate(false);
            setIsEdit(true);
            setIsDelete(false);
          }}
        >
          HOME
        </ol>
        <ol
          style={{ fontWeight: isCreate == true ? "bold" : "", padding: "5px" }}
          onClick={() => {
            setIsCreate(true);
            setIsEdit(false);
            setIsDelete(false);
          }}
        >
          ADD USER
        </ol>
      </ul>
      <div>
        {!isCreate ? "EDIT USER" : "CREATE"}
        {!isCreate && (
          <div
            style={{
              backgroundColor: "whitesmoke",
              cursor: "pointer",
              width: "10%",
              border: "solid",
              borderWidth: "1px",
              borderRadius: "5px",
              borderColor: "gray",
              marginLeft: "50px",
            }}
            onClick={deleteAllHandler}
          >
            Delete All
          </div>
        )}
        {isCreate && (
          <div>
            <div className="modal">
              <div className="container">
                <TextField
                  name={"First Name"}
                  changeHandler={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  name={"Last Name"}
                  changeHandler={(e) => setLastName(e.target.value)}
                />
                <TextField
                  name={"Username"}
                  changeHandler={(e) => setUserName(e.target.value)}
                />
                <TextField
                  name={"Password"}
                  changeHandler={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="container">
                <TextField
                  name={"Contact No"}
                  changeHandler={(e) => setContactNo(e.target.value)}
                />
                <TextField
                  name={"Email"}
                  changeHandler={(e) => setEmail(e.target.value)}
                />
                <TextField
                  name={"Address"}
                  changeHandler={(e) => setAddress(e.target.value)}
                />
                <TextField
                  name={"Post Code"}
                  changeHandler={(e) => setPostCode(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button onClick={handleConfirmDeliveryClose}>SUBMIT</button>
            </div>
          </div>
        )}
        {isEdit && (
          <div>
            <UserList lists={users} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
