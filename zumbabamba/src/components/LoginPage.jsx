import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const LoginPage = () => {
  const [formUsernameValue, setFormUserValue] = useState("");
  const [formPswValue, setformPswValue] = useState("");
  const [stato, setStato] = useState([]);
  const [token, setToken] = useState(null);

  //useEffect(() => console.log(formEmailValue), [formEmailValue]);

  const authRequest = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formUsernameValue,
          password: formPswValue,
        }),
      });
      if (response.ok) {
        const data = (await response).json();
        const value = await data.then((e) => e.accessToken);
        setStato(value);
        setToken(value);
        //data.then((e) => console.log(e));
        console.log(data); //TOKEN
      }
    } catch (error) {}
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      {!token && (
        <>
          <h2>Sign in to view data!</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>username address</Form.Label>
              <Form.Control
                value={formUsernameValue}
                type="username"
                placeholder="Enter username"
                onChange={(e) => {
                  // console.log(formEmailValue);
                  setFormUserValue(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formPswValue}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setformPswValue(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (formUsernameValue.length > 2 || formPswValue.length > 2) {
                  console.log(formUsernameValue);
                  authRequest();
                  setFormUserValue("");
                  setformPswValue("");
                } else {
                  console.log("troppo breveh!!!!");
                }
              }}
            >
              Submit
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                console.log(stato);
              }}
            >
              Stato
            </Button>
          </Form>
        </>
      )}
      {token && <p className="fs-4 text-center">{`Bearer ${token}`}</p>}
    </div>
  );
};

export default LoginPage;
