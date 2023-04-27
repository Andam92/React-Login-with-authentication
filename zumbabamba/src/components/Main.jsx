import React, { useEffect, useState } from "react";

const Main = () => {
  const [data, setData] = useState([]);

  async function fetch1() {
    const response = await fetch("http://localhost:8082/persone/data3", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwcm92YTEyM0B0ZXN0Lml0IiwiaWF0IjoxNjgyNTIzMjc4LCJleHAiOjE2ODMxMjgwNzh9.kts9KfK-TaIT4eImdNvOdlEWfSAuKxH1RrI5ThOqaxEevYG041iUBqgQiu_B5eQv",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setData(data);
    }
  }

  useEffect(() => {
    fetch1();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Prova di comunicazione con progetto Spring Multiservice
      </h2>
      <div>
        <ul>
          {data.length > 0 &&
            data?.map((e, i) => (
              <li key={e.id} style={{ marginBottom: "1.5em" }}>
                N°{i + 1} <hr />
                Username: {e.username} <br /> email: {e.email}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
