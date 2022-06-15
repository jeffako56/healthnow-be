import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "./TextField";

function UserList({ lists, setData, isSelect }) {
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
  const [checked, setChecked] = useState([]);

  var body;
  let data = {
    id,
  };

  useEffect(() => {
    console.log("refresh");
    setData(checked);
  }, [lists, checked, isSelect]);

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

  const selectDelete = () => {
    // console.log("checkAPI " + data);
    axios
      .delete(
        `http://localhost:8000/api/users/selectdelete`,
        { data: { id: checked } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log("res.data", res.data);
        // window.location.reload();
      })
      .catch((error) => {
        console.log("fail" + error);
        // window.location.reload();
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
          width: "50%",
          margin: "0 auto",
          boxShadow: "2px 5px #888888",
          // backgroundColor: "red",
          // textAlign: "left",
          marginBottom: "20px",
        }}
      >
        {!isHome && (
          <div style={{ cursor: "pointer" }}>
            <ul
              onClick={() => {
                if (!isSelect) {
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
                } else {
                }
              }}
            >
              Username : {list.username}
              <br />
              First Name: {list.first_name}
              <br />
              Last Name: {list.last_name}
              <br />
              Email: {list.email}
              <br />
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
        {isSelect ? (
          <input
            onChange={(e) => {
              // add to list
              if (e.target.checked) {
                setChecked([...checked, list.id]);

                console.log("checked" + JSON.stringify(checked));
              } else {
                // remove from list
                setChecked(checked.filter((index) => index.id !== list.id));
                console.log("checkedelse" + JSON.stringify(checked));
              }
            }}
            value={checked}
            style={{
              margin: "20px",
              position: "relative",
              bottom: 100,
              left: 100,
              transform: "1.5",
              fontSize: " 100px",
            }}
            type="checkbox"
          />
        ) : (
          <div></div>
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
