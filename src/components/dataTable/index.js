import React, {useState} from 'react'
import PropTypes from 'prop-types';
import moment from 'moment'

import Pagination from '../pagination';
import paginateHook from './paginationHook';

import {sortByData} from '../../util'
import './style.scss';

const DataTable = ({columns = [], data = [], recordsPerPage = 10, pagination = true}) => {
    const [next, prev, jump, currentData, currentPage, maxPage] = paginateHook(data, recordsPerPage)
    const [sortData, setData] = useState(currentData());
    const [sortDirection, setDirection] = useState('asc');
    const [sortIndex, setSortIndex] = useState();

    const cellType = (row, col) => {
        switch(col.type) {
            case 'currency':
                return `$${row[col.id]}`;
            case 'date':
                return moment(row[col.id]).format('ll');
            default:
                return row[col.id]
          }
    }

    const sortType = (i) => {
        return (sortIndex === i ? `sort ${sortDirection}` : 'sort')
    }


    const sortBy = (item,i) => {
        const tableData = [...sortData]        
          setData(sortByData(tableData, item.id, item.type, sortDirection));
          setDirection(sortDirection === 'asc' ? 'dsc' : 'asc');
          setSortIndex(i)
    }

    const handlePagination = (type) => {
      switch(type) {
        case 'next':
            next()
            break;
        case 'prev':
            prev()
            break;
        default:
            jump(type)
      }
      setData(currentData);
    }

    return (
      <div>
    <table className="datatable">
    <thead>
        <tr>
      {columns.map( (item, i) => 
        <th onClick={() => sortBy(item, i)} className={item.sort ? sortType(i) : null} key={`title-${i}`}>
            {item.name}
            {item.sort && <i className="sort-by"></i>}
        </th>
        )}
      </tr>
    </thead>
    <tbody>
      {sortData.map( (row, i) => 
      <tr key={`row-${i}`}>
        {columns.map( (col, index) => 
        <td key={`col-${index}`}>
          {col.cell ? 
            col.cell(cellType(row, col), row, i, index)
           : cellType(row, col)}
        </td>
        )}
      </tr>
      )}
    </tbody>
  </table>
          {pagination && <Pagination handleButton={handlePagination} currentPage={currentPage} maxPage={maxPage} records={data.length} /> }
  </div>
    )
}

DataTable.propTypes  = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      sort: PropTypes.bool,
      type: PropTypes.oneOf(['string', 'currency', 'number', 'date']),
      cell: PropTypes.func
    }).isRequired
  ).isRequired,
  recordsPerPage: PropTypes.number,
  pagination: PropTypes.bool
}

export default DataTable;