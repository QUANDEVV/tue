import { useEffect, useState, useRef, useContext } from 'react';

import { useTheme } from 'next-themes';
import Long from '../components/Long';
import Seasonal from '../components/Seasonal';
import Getaways from '../components/Getaways';
import Bush from '../components/Bush';
import International from '../components/International';
import Beach from '../components/Beach';



const Home = () => {
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

  // check if scrollRef container is overfilling its parentRef container
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) return setHideButtons(false);
    return setHideButtons(true);
  };

  // if window is resized
  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });


  return(
  <div className="flex justify-center sm:px-2 p-2">
      <div className="w-full minmd:w-4/5">
    
      <div>
      <Long />
      <Beach />
      <International />
      <Bush />
      <Getaways/>
      <Seasonal />
     

        

</div>
</div>



      </div>
    


            
);
}

export default Home;
