import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import LinkButton from '../Button';


const Accordion = ( { data } ) => {
    return (
      <div>
        {data.map((item) => (
          <div
              tabIndex={0}
              className="collapse collapse-arrow rounded-lg bg-background-mainframe hover:bg-table-light active:bg-table-dark focus:bg-table-light mb-2 border-none transition 
              ease-out duration-100"
              >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                <h4 className="text-lg font-bold">{item.name}</h4>
              </div>
      
              <div className="collapse-content">
                <h5 className="text-lg font-bold text-gray-500">Deskripsi</h5>
                <p className="text-md text-gray-500 mt-2">
                  {item.description}
                </p>
                <div className='mt-5'>
                  <LinkButton link={item.link} id={item.id} label="View Details"/>
                </div>
              </div>
          </div>
          ))}
        </div>
    );};

export default Accordion;