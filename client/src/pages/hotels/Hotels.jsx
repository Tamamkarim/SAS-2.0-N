import {Spin} from "antd";
import Header from "components/header/Header";
import {useEffect, useState, useRef} from "react";
import Title from "antd/es/typography/Title";
import './Hotels.css'
import axios from "axios";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:8809/api/hotels');
      return response.data;
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    }
  };

  useEffect(() => {
    // Replace this with your actual data fetching function
    fetchHotels()
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch hotels:", error);
        setLoading(false);
      });
  }, []);

  function HotelList({hotels}) {
    return (
      <div className="hotels-container">
        <div className="hotels">
          {hotels.map((hotel) => (
            <div key={hotel.id}>
              <h2 className="mt-8">{hotel.name}</h2>
              <p>{hotel.type}</p>
              <p>{hotel.city}</p>
              <p>{hotel.desc}</p>
              <img src={hotel.photos} alt="" className="hotel-image"/>
              <div className="flex gap-2">
                <p>{hotel.address}</p>
                <p>Rooms: {hotel.rooms.length}</p>
                <p>Rating</p>
                <p>{hotel.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hotels-background">
      <Header/>
      <Title level={2} className=" ml-4 my-8">Available hotels</Title>
      <div className="hotel-list" ref={listRef}>
        {loading ? <Spin/> : <HotelList hotels={hotels}/>}
      </div>
    </div>
  )
};

export default Hotels;