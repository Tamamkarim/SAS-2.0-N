import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Spin, Rate, Carousel, Form, Button, DatePicker } from 'antd'
import './hotel.css'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const Hotel = () => {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [rooms, setRooms] = React.useState([])
  const [dates, setDates] = useState(null)

  const getAvaiableRooms = async (hotelId) => {
    const response = await axios.get(
      `http://localhost:8809/api/hotels/room/${hotelId}`
    )
    setRooms(response.data)
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8809/api/hotels/find/${id}`)
      .then((res) => setHotel(res.data))
    getAvaiableRooms(id)
  }, [id])

  if (!hotel) return <Spin />

  const onFinish = (values) => {
    let { checkInDate, checkOutDate } = values
    checkInDate = checkInDate.format('YYYY-MM-DD')
    checkOutDate = checkOutDate.format('YYYY-MM-DD')
    setDates({
      checkInDate,
      checkOutDate,
    })
    const filtered = rooms.filter((room) => {
      // Iterate over each room number
      for (const roomNumber of room.roomNumbers) {
        // Access the unavailableDates array for the current room number
        const unavailableDates = roomNumber.unavailableDates.map(
          (dateStr) => new Date(dateStr)
        )

        // Check if any unavailable date falls within the range of check-in and check-out
        for (const date of unavailableDates) {
          if (date >= new Date(checkInDate) && date < new Date(checkOutDate)) {
            return false // Room is unavailable
          }
        }
      }
      room.isAvailable = true
      return true // Room is available
    })
    setRooms(filtered)
  }

  return (
    <div className="flex flex-col m-4">
      <div>
        <h1 className="m-4">{hotel.name}</h1>
        <div style={{ width: '500px', height: '400px' }}>
          <Carousel>
            {hotel.photos.map((photo, index) => (
              <div key={index} style={{ width: '100%', height: '100%' }}>
                <img
                  className="hotel-image"
                  src={photo}
                  alt={`Hotel ${index}`}
                  style={{
                    width: '500px',
                    height: '400px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex gap-2">
          <p>{hotel.address}</p>
          <p>Rooms: {hotel.rooms.length}</p>
          <p>Rating</p>
          <Rate disabled allowHalf value={hotel.rating} />
        </div>
        <p>{hotel.desc}</p>
      </div>
      <div style={{ width: '300px', margin: 'auto' }}>
        <Form
          name="reservation_form"
          onFinish={onFinish}
          initialValues={{
            checkInDate: dates?.checkInDate,
            checkOutDate: dates?.checkOutDate,
          }}
          layout="vertical"
        >
          <Form.Item
            label="Check-in Date"
            name="checkInDate"
            rules={[{ required: true, message: 'Please select check-in date' }]}
          >
            <DatePicker minDate={dayjs(new Date())} />
          </Form.Item>
          <Form.Item
            label="Check-out Date"
            name="checkOutDate"
            rules={[
              { required: true, message: 'Please select check-out date' },
            ]}
          >
            <DatePicker minDate={dayjs(new Date())} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Find avaiable rooms
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <h1>Rooms</h1>
        {rooms &&
          rooms.map((room, index) => (
            <div key={index}>
              <h2>Room {index + 1}</h2>
              <p>Title: {room.title}</p>
              <p>Price: {room.price}</p>
              <p>Capacity: {room.maxPeople}</p>
              {dates ? (
                <Link
                  to={`/room?id=${room._id}&checkInDate=${dates.checkInDate}&checkOutDate=${dates.checkOutDate}`}
                >
                  Reserve
                </Link>
              ) : (
                <Link to={`/room/${room._id}`}>View the room</Link>
              )}
              <hr />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Hotel
