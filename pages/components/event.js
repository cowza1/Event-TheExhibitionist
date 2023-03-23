import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

function Event() {
  const [exhibitionData, setExhibitionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  function LoadingComponent() {
    return <div className="my-2 grid grid-cols-1"
    >
        <p className='text-center'>Loading some of our top exhibitions...</p>
        </div>;
  }
  
  useEffect(() => {
   fetchEvent();
  },[])

  const fetchEvent = async () => {
    const url = `https://www.galleriesnow.net/exhibitions/uk/`;
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const newData = [];

    $('.exhibition-box').slice(0,4).each((index, element) => {
      const eventName = $(element).find('.box-show-link').text();
      const eventLocation = $(element).find('.citynameRow').text();
      const eventImage = $(element).find('.panel-body a img').attr('data-src');
      const url = $(element).find('.col-md-12 a').attr('href');

      const exhibitionData = {
        eventName,
        eventLocation,
        eventImage,
        url,
      }

      
      newData.push(exhibitionData);
    });

    setExhibitionData(newData);
    setIsLoading(false)
  };

  return (
    <div>
        <div className='my-2'>
            <h1 className='text-2xl text-center'>Discover our newest Exhibitions</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
       {isLoading ? (
        <LoadingComponent/>
       ): 
       
       (
        exhibitionData
            .filter((item) => {
            // Check if all properties have a value
            return (
                item.eventName &&
                item.eventLocation &&
                item.eventImage &&
                item.url
            );
            })
            .map((item) => (
            <div key={item.url} className="w-80 bg-red-100 p-2">
                <div className='text-center mb-3 h-full'>
                    <h2 className="font-bold mb-2">{item.eventName}</h2>
                    <p className='text-xs'>{item.eventLocation}</p>
                    <div className='w-60 h-60 bg-cover bg-center m-auto my-2' style={{ backgroundImage: `url(${item.eventImage})` }}>
                    </div>
      
                    <a class="border-2 border-black px-2 py-1" href={item.url}>More info</a>
                </div>
             
            </div>
            ))
            )}
        </div>
    </div>
  );
}

export default Event;
