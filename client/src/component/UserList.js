import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "./TextField";

function UserList({ lists }) {
  const [isHome, setIsHome] = useState();
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [contactno, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [email, setEmail] = useState("");

  var body;

  useEffect(() => {
    console.log("refresh");
  }, [lists]);

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8000/api/users/delete/${id}`, {
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

  const updateHandler = (id) => {
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
    axios
      .put(`http://localhost:8000/api/users/${id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("getUsers", res.data);
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

  if (!isHome) {
    return lists.map((list) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "solid",
          borderWidth: "1px",
          borderRadius: "10px",
          borderColor: "gray",
          margin: "20px",
          boxShadow: "2px 5px #888888",
          // backgroundColor: "red",
          // textAlign: "left",
          // margin: "20px",
        }}
      >
        {!isHome && (
          <div style={{ cursor: "pointer" }}>
            <ul
              onClick={() => {
                setId(list.id);
                setFirstName(list.first_name);
                setLastName(list.last_name);
                setUserName(list.username);
                setPassword(list.password);
                setAddress(list.address);
                setContactNo(list.contact_no);
                setEmail(list.email);
                setPostCode(list.post_code);

                setIsHome(true);
              }}
            >
              Username : {list.username}
              <br />
              First Name: {list.first_name}
              <br />
              Last Name: {list.last_name}
              <br />
              Email: {list.email}
            </ul>
            <button
              style={{ margin: "10px" }}
              onClick={() => {
                deleteHandler(list.id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    ));
  } else {
    return (
      <div>
        <div
          style={{
            cursor: "pointer",
            width: "10%",
            border: "solid",
            borderWidth: "1px",
            borderRadius: "5px",
            borderColor: "gray",
            marginLeft: "50px",
          }}
          onClick={() => {
            setIsHome(false);
          }}
        >
          BACK
        </div>
        <div className="modal">
          <div className="container">
            <TextField
              name={"First Name"}
              value={firstName || ""}
              changeHandler={(e) => setFirstName(e.target.value)}
            />
            <TextField
              name={"Last Name"}
              value={lastName || ""}
              changeHandler={(e) => setLastName(e.target.value)}
            />
            <TextField
              name={"Username"}
              value={userName || ""}
              changeHandler={(e) => setUserName(e.target.value)}
            />
            <TextField
              name={"Password"}
              value={password || ""}
              changeHandler={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="container">
            <TextField
              name={"Contact No"}
              value={contactno || ""}
              changeHandler={(e) => setContactNo(e.target.value)}
            />
            <TextField
              name={"Email"}
              value={email || ""}
              changeHandler={(e) => setEmail(e.target.value)}
            />
            <TextField
              name={"Address"}
              value={address || ""}
              changeHandler={(e) => setAddress(e.target.value)}
            />
            <TextField
              name={"Post Code"}
              value={postCode || ""}
              changeHandler={(e) => setPostCode(e.target.value)}
            />
          </div>
        </div>
        <div></div>
        <button
          onClick={() => {
            console.log(id);
            updateHandler(id);
          }}
        >
          UPDATE
        </button>
      </div>
    );
  }
}

export default UserList;
