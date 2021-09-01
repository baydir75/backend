import { useState } from "react";

const App = () => {
  const [image, setImage] = useState();
  const [username, setUsername] = useState();

  const send = () => {
    const formData = new FormData();
    formData.append("img", image);
    fetch(`http://localhost:8000/?username=${username}`, {
      method: "POST",
      body: formData,
    });
  };

  return (
    <>
      <input
        type="file"
        onChange={(event) => setImage(event.target.files[0])}
      ></input>
      <input type="text" onChange={(event) => setUsername(event.target.value)}></input>
      <button onClick={send}>Send</button>
    </>
  );
};

export default App;