import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { Button, Spin, message } from 'antd'
import dayjs from 'dayjs'

const Room = () => {
  let [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const checkInDate = searchParams.get('checkInDate')
  const checkOutDate = searchParams.get('checkOutDate')
  const [room, setRoom] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:8809/api/rooms/${id}`)
      .then((res) => setRoom(res.data))
  }, [])

  if (!room) return <Spin />

  console.log()
  const reserveRoom = (id) => {
    const dates = [checkInDate, checkOutDate]
    const response = axios
      .put(`http://localhost:8809/api/rooms/availability/${id}`, {
        dates: dates,
      })
      .then((response) => {
        message.success(response.data)
        window.location.reload()
      })
      .catch((error) => {
        message.error('Could not reserve room')
      })
  }

  return (
    <div className="flex flex-col m-4">
      {room.roomNumbers.map((roomNumber) => (
        <div key={roomNumber._id}>
          <p>{room.title}</p>
          <p>Room number: {roomNumber.number}</p>
          {
            <Button
              disabled={
                room.roomNumbers[0].unavailableDates
                  .map((e) => dayjs(e).format('YYYY-MM-DD'))
                  .includes(checkInDate) ||
                room.roomNumbers[0].unavailableDates
                  .map((e) => dayjs(e).format('YYYY-MM-DD'))
                  .includes(checkOutDate)
              }
              onClick={() => reserveRoom(roomNumber._id)}
            >
              Reserve
            </Button>
          }
        </div>
      ))}
    </div>
  )
}

export default Room
