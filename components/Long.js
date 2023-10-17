import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import images from '../assets';
// import VideoPlayer from './VideoPlayer';

async function getData() {
  const res = await fetch('https://rest-ap-d04c8c4d6693.herokuapp.com/media/videos/');
 
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
console.log(data)

}

const Long = () => {
  const [data, setData] = useState(null);
  const { theme } = useTheme();

  const [hideButtons, setHideButtons] = useState(false);

  const scrollRef = useRef(null);

  const parentRef = useRef(null);

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) return setHideButtons(false);
    return setHideButtons(true);
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center sm:px-2 p-2 mt-6 mb-40">
      <div className="w-full minmd:w-4/5">
        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Long Safaris</h1>
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none gap-6" ref={scrollRef}>
              {data ? (
                data.map((item) => (
                  <div key={item.id} className="flex flex-col items-center">
                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h1 className="text-white text-xl mb-2">{item.title}</h1>
                      <div className="w-66 bg-white rounded-lg shadow-md">
                        <video controls className="w-full h-64 object-cover rounded-t-lg">
                          <source src={item.video_file} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Long;