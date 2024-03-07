import React, {useState} from 'react'
import {MapContainer, TileLayer} from 'react-leaflet';
import { Switch,Input  } from "@material-tailwind/react";
import {DatePicker} from "antd"
import { Select } from 'antd';
import Map from './../../components/SmallMap';
import Header from '../../components/Header';
import {types} from "./../../global/type";
import './landingpage.css'
import data from './../../global/people.json'
import Dropdown from '../../components/dropdown/Dropdown';

function Landingpage() {
  var center = {lat: localStorage.getItem('lati1'), lng: localStorage.getItem('long1')};
  const [zoom, setZoom] = useState(13);
  const [word, setWord] = React.useState("");
  const [mapOn, setMapOn] = useState(false);
  const [y, setY] = useState(190)
  const [mapY, setMapY] = useState(290)
  const [startY, setStartY] = useState(null)
  const [mapMove, setMapMove] = useState(false)
  const people = data.data
  
  const onMovebarClick = (e) => {
    setMapMove(!mapMove)
  }
  const onMouseDown = (e) => {
    setMapOn(true);
    setStartY(e.clientY);
    // Attach pointermove and mouseup event listeners
    document.addEventListener('pointermove', onMouseMove);
    document.addEventListener('pointerup', onMouseUp);
   };
   
  const onMouseMove = (e) => {
    if (!mapOn) return; // Ensure mapOn is true to proceed
    // let change = e.clientY - startY;
    // setY(y => y - change);
    // setMapY(mapY => mapY - change);
  };
  
  const onMouseUp = (e) => {
    setMapOn(false);
    // Remove event listeners
    document.removeEventListener('pointermove', onMouseMove);
    document.removeEventListener('pointerup', onMouseUp);
  };
  const onSelect = (e) => {
      setWord(e);
  };
  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  center = {lat: localStorage.getItem('lati'), lng: localStorage.getItem('long')};
  return(
    <>
      <div className='w-full relative top-0 z-100'>
        <Header />
      </div>
      <div className = "w-full flex relative sm:relative h-[calc(100vh-90px)] lg:space-x-5  px-4 z-0"  onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
        <div className={`mapContainerDiv w-full overflow-hidden h-[calc(100vh-500px)] md:h-auto rounded-lg top-0 md:top-auto absolute bottom-0 left-0 md:left-auto right-0 md:right-auto md:relative z-10`}>
          <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            attributionControl={false}
            // style={{position: 'fixed', width: 735, height: 500}}
            className='w-full h-full relative -z-10'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>              
          </MapContainer>
        </div>
        <div className="w-full">
          <div className="w-full  justify-between px-5 h-0 lg:h-auto hidden lg:flex visible md:visible">  
            <div className='flex'>
              <Dropdown />
              <div className='w-[150px]'>
                {/* <Input 
                  type='date'
                  width={'120px'}
                  defaultValue={12/12/2023}
                  onTimeUpdate={true}
                /> */}
                <DatePicker 
                  size='large'
                />
              </div>
            </div>
            
            <div className='flex'>
              <Switch 
                color='green'
                defaultChecked
              />
              <p className='text-black text-lg text-right ml-2 pt-[4px]'>
                Save Search
              </p>
            </div>
          </div>
          <div className={`bg-white bottom-0 md:bottom-auto w-full h-[410px] md:h-full rounded-xl absolute md:static right-0 pl-5 z-20 overflow-y-auto pb-10 pr-3 md:pr-0`}>
            <div className='w-full cursor-move'onMouseDown={onMouseDown} onClick={onMovebarClick}>
              <div className='w-full h-[2px] bg-gray-800 visible md:hidden'  />
              {/* <img src='/images/logo.png'/> */}
            </div>
            <div className="w-full flex pr-3 justify-between visible lg:invisible h-auto lg:h-0 mt-4">  
              <div className='lg:flex'>
                <div className='z-10 relative'>
                  <Dropdown />
                </div>
                <div className='w-[150px] mt-4 z-0'>
                  {/* <Input 
                    type='date'
                    width={'120px'}
                    defaultValue={12/12/2023}
                    onTimeUpdate={true}
                  /> */}
                  <DatePicker 
                  size='large'
                />
                </div>
              </div>
              <div className='flex min-w-[90px] float-right'>
                <div className='my-auto'>
                  <div className='pl-2'>
                    <Switch 
                      color='green'
                      defaultChecked
                    />
                  </div>
                  <p className='text-black text-sm ml-2 text-right pt-[px]'>
                    Save Search
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full ">
              {people.map((item, index) => (
                <div key={index} className="shadow-xl p-4 sm:flex sm:h-40 rounded-xl border-[1px] my-2 mr-3">
                  <div className='w-full sm:w-auto justify-center content-center flex sm:static'>
                    <img src={item.img} className="object-cover w-36 rounded-full sm:rounded-xl mb-5 sm:mb-auto sm:mx-auto"/>
                  </div>
                  <div className="px-6 overflow-hidden w-full">
                    <div className="flex w-full">
                      <p className="w-full text-black text-left text-sm md:text-xl">{"$"+item.price+"/month"}</p>
                      <p className="text-right text-black text-sm md:text-xl zmdi zmdi-favorite-outline" />
                    </div>
                    <div className="w-full">
                      
                      <p className="w-full text-black text-left text-xs lg:text-lg">{item.name}</p>
                      <p className="w-full pb-3 text-gray-500 text-sm md:text-md overflow-hidden">{truncateText(item.brief, 100)}</p>
                      <div className="w-full justify-end h-[1px] bg-gray-500 my-1"/>
                      <p className="w-full text-gray-500 text-left text-xs md:text-md">{item.title1+" | "+item.title12+" | "+" 9791 sqft"}</p>            
                    </div>   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landingpage;