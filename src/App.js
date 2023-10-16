import React, { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const getOne = (userID) => {
    axios
      .get(`http://localhost:8080/users/${userID}`)
      .then((res) => console.log(res.data))
      .catch((error) => console.error("Error:", error));
  };

  const handleSubmit = (e) => {
    const id = data.length + 1;
     
    const fullData = {...formData, id}
    e.preventDefault();
    // console.log("Form Data:", fullData);
    const apiUrl = 'http://localhost:8080/users';

  // POST using axios
  axios
    .post(apiUrl, fullData)
    .then((response) => {
   
      console.log("Success:", response.data);
    })
    .catch((error) => {

      console.error("Error:", error);
    });

    
  }
  return (
    <div className="App">
      {data.length > 0 ? (
        data.map((user, i) => {
          return (
            <div
              className="card ms-2 mt-2 col-lg-2 m-1"
              key={user.id}
              style={{ width: "13rem" }}
            >
              <div
                className="card-body p-4"
                style={{ border: "2px solid royalblue", margin: "10px" }}
              >
                <h5 className="card-title">ID: {user.id}</h5>
                <h5 className="card-title">Name: {user.name}</h5>
                <h5 className="card-title">UserName: {user.username}</h5>
                <h5 className="card-title">email: {user.email}</h5>
                {/* <p className="card-text">Price: ${product.price}</p> */}
                {/* <p>Only {product.stock} left..</p> */}
                <button
                  className="view-button mb-4"
                  style={{ marginBottom: "15px" }}
                  onClick={() => getOne(user.id)}
                >
                  get User
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <h2>No data</h2>
      )}


      <div>
      <form id="userForm" onSubmit={handleSubmit} style={{ padding: '15px' }} method="POST">
          <h4>Add User</h4>
          <input
            type="text"
            placeholder="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <br />
          <input
            type="email"
            placeholder="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <br />
          <input
            type="number"
            placeholder="mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          />
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
