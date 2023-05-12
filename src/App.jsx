import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [users, setUser] = useState([])

  useEffect(() => {
    const api = `http://localhost:7000/user`
    fetch(api)
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  // console.log(users);

  const handleForm = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    // console.log(name, email);


    const user = { name, email }
    console.log(user);
    fetch(`http://localhost:7000/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)

    })
      .then(res => res.json())
      .then(data => {
        console.log("post is resposing baby", data)
        const newUser = [...users, data]
        setUser(newUser)
        form.reset();
      })

  }

  return (
    <>
      <div>

        <form onSubmit={handleForm}>
          <input type="text" name='name' required />
          <br />
          <br />
          <input type="email" name='email' required />
          <input type="submit" />

        </form>

        <h1>User Management:{users.length}</h1>
        {
          users.map(item => <p key={item.id}>{item.id} :{item.name}: {item.email} </p>)
        }


      </div>

    </>
  )
}

export default App
