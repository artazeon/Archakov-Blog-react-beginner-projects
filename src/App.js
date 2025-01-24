import React from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([])
  const [invites, setInvites] = React.useState([])
  const [isloading, setLoading] = React.useState(true)
  const [succes, setSucces] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')

  React.useEffect(() => {
    //https://reqres.in/api/users
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data)
      })
      .catch((err) => {
        console.warn(err)
        alert('Ошибка при получении пользователей')
      })
      .finally(() => setLoading(false))
  }, [])

  const onChangeSearhValue = (event) => {
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id))
    } else {
      setInvites((prev) => [...prev, id])
    }
  }

  const onClickSendInvites = () => {
    setSucces(true)
  }

  return (
    <div className="App">
      {succes ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearhValue={onChangeSearhValue}
          searchValue={searchValue}
          items={users}
          isLoading={isloading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}

      {/*  */}
    </div>
  )
}

export default App
