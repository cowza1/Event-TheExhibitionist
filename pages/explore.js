import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import axios from 'axios';
import cheerio from 'cheerio';
import Image from 'next/image';
import Nav from './components/nav';
import Event from './components/event';

function Explore() {
  const [country, setCountry] = useState('uk');
  const [exhibitionData, setExhibitionData] = useState([]);
  const [isLoading, setIsLoading] = useState(null)


  function LoadingComponent() {
    return <div className="my-2 grid grid-cols-1"
    >
        <p className='text-center'>Loading exhibitions from  {country}...</p>
        </div>;
  }
  const handleCountry = (e) => {
    setCountry(e.target.value);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const url = `https://www.galleriesnow.net/exhibitions/${country}/`;
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const newData = [];

    $('.exhibition-box').each((index, element) => {
      const eventName = $(element).find('.box-show-link').text();
      const description =  $(element).find('.snippet-text').text();
      const eventAddress = $(element).find('.space_address').text();
      const eventLocation = $(element).find('.citynameRow').text();
      const eventImage = $(element).find('.panel-body a img').attr('data-src');
      const eventDaysTimes = $(element).find('.show_opening_times').text();
      const eventDate = $(element).find('.extb-1 .row .col-md-12 span').text();
      const url = $(element).find('.col-md-12 a').attr('href');

      const exhibitionData = {
        eventName,
        description,
        eventAddress,
        eventLocation,
        eventImage,
        eventDaysTimes,
        eventDate,
        url,
      }

      
      newData.push(exhibitionData);
    });

    setExhibitionData(newData);
    setIsLoading(false)
  };

  return (
    <div>
      <Nav/>
        <div className={styles.main} >
          <div 
          style={{height: "300px"}}
          className="overflow-hidden relative">
            <video 
            className='object-fit-cover object-top'
            autoPlay loop muted
            src="/gallery.mp4"></video>
            <h1
            className="text-center text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
            >Discover Something Amazing</h1>
          </div>
          <div className="py-2 my-4">
            <form onSubmit={handleSubmit}>
              <select className='text-center border-b-2 border-black pb-1' value={country} onChange={handleCountry}>
                <option value='worldwide'>Worldwide</option>
                <option value='asia-and-australia'>Asia/ Australia</option>
                <option value='berlin'>Berlin</option>
                <option value='los-angeles'>Los Angeles</option>
                <option value='milan'>Milan</option>
                <option value='new-york'>New York</option>
                <option value='paris'>Paris</option>
                <option value='spain'>Spain</option>
                <option value='switzerland'>Switzerland</option>
                <option value='uk'>UK</option>
                <option value='vienna'>Vienna</option>

              </select>
              <button 
              className='border-2 border-black px-1 py-1 ml-6'
              type='submit'>search</button>
            </form>
          </div>
          <div >
            <Event/>
          </div>
          <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      {
      isLoading ? (
        <LoadingComponent/>
       ): 
       
       (
      exhibitionData
        .filter((item) => {
          // Check if all properties have a value
          return (
            item.eventName &&
            item.description &&
            item.eventAddress &&
            item.eventLocation &&
            item.eventImage &&
            item.eventDaysTimes &&
            item.eventDate &&
            item.url
          );
        })
        .map((item) => (
          <div key={item.url} className="w-80">
            <div className='text-center flex flex-col justify-between mb-3' style={{height: "150px"}}>
              <h2 className="font-bold mb-2">{item.eventName}</h2>
              <p className='text-xs'>{item.eventAddress}</p>
              <p className='text-xs'>{item.eventLocation}</p>
              <p className='text-xs'>{item.eventDate} - {item.eventDaysTimes}</p>
              <div className="mt-auto">
        <a class="border-2 border-black px-2 py-1" href={item.url}>More info</a>
      </div>
            </div>
            <div className='w-80 h-80 bg-cover bg-center m-auto ' style={{ backgroundImage: `url(${item.eventImage})` }}>
            {/* <div className='w-60 h-60 grid place-content-center overflow-hidden'> */}
              {/* <img style={{maxWidth: '100%', maxHeight: '100%'}} className='object-contain' src={item.eventImage} alt={item.eventName} /> */}
            </div>
            <p className='w-80 m-auto p-3 text-xs'>{item.description}</p>
          </div>
        ))
        )}
    </div>
        </div>
    </div>
  );
}

export default Explore;
