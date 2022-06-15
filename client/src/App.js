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
  const [isSelect, setIsSelect] = useState();
  const [data, setdata] = useState();
  var userList;
  const lst = [];
  const populateData = (data) => {
    lst.push(data);
  };
  var arr = [111, 112, 113];
  var artest = [];
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
  }, [body]);

  const selectDelete = (selected) => {
    console.log("checkAPI " + selected);
    axios
      .delete(
        `http://localhost:8000/api/users/selectdelete`,
        { data: { id: selected } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log("res.data", res.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("fail" + error);
        window.location.reload();
      });
  };

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

  const handleSubmit = () => {
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

  const deleteHandler = (body) => {
    axios
      .delete(`http://localhost:8000/api/users/delete`, body, {
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
              marginBottom: "5px",
              marginLeft: "50px",
            }}
            onClick={() => {
              setIsSelect(!isSelect);
              console.log("isSelect" + isSelect);
              // selectDelete(data);
            }}
          >
            {!isSelect ? "Select On" : "Select Off"}
          </div>
        )}
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
              marginBottom: "5px",
              marginLeft: "50px",
            }}
            onClick={() => {
              isSelect ? selectDelete(data) : deleteAllHandler();
            }}
          >
            {isSelect ? "Delete Selected" : "Delete All"}
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
              <button onClick={handleSubmit}>SUBMIT</button>
            </div>
          </div>
        )}
        {isEdit && (
          <div>
            <UserList lists={users} setData={setdata} isSelect={isSelect} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
