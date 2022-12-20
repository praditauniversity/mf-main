import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Button from '../Button';


const Accordion = () => {
    return (
      <div
        tabIndex={0}
        className="collapse collapse-arrow rounded-lg bg-background-mainframe hover:bg-table-light active:bg-table-dark focus:bg-table-light mb-2 border-none transition 
        ease-out duration-100"
      >
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          <h4 className="text-lg font-bold">Project Anomaly 1</h4>
        </div>

        <div className="collapse-content">
          <h5 className="text-lg font-bold text-gray-500">Deskripsi</h5>
          <p className="text-md text-gray-500 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
            tempus magna. Proin sed est et eros iaculis tincidunt id eu purus.
            Maecenas in magna in metus tempus tincidunt. Donec vel fringilla
            justo, vitae accumsan nulla. In maximus risus ac fermentum faucibus.
            Vestibulum porttitor sagittis gravida. Suspendisse efficitur ligula
            et lorem dapibus hendrerit. Fusce ac erat vel mi iaculis consequat.
          </p>
          <div className='mt-5'>
            <Button label="View Details"/>
          </div>
          
        </div>
      </div>
    );};

export default Accordion;