import React from "react";

import './style.scss';

const Pagination = ({handleButton, currentPage, maxPage, records}) => {
    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];
      
        while (i <= to) {
          range.push(i);
          i += step;
        }
      
        return range;
      };
    return <div className="pagination"> 
        <span>Total {records} Payments</span>
    <ul>
        <li className={`prev ${currentPage === 1 ? 'disable' : null}`} onClick={ () => handleButton('prev')}>&lt;</li>
        {range(1,maxPage).map((item,i) => <li onClick={ () => handleButton(item)} className={currentPage === item ? 'active' : null} key={`page${i}`}>{item}</li> )}
        <li className={`next ${currentPage === maxPage ? 'disable' : null}`} onClick={ () => handleButton('next')}>&gt;</li>
    </ul>
    </div>
}

export default Pagination;