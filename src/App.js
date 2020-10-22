import React from 'react';
import DataTable from './components/dataTable';

import data from './api.json';
import columns from './dataConfig'
import './App.scss';

function App() {

  return (
    <div className="App">
      <h2>All Transactions</h2>
      <DataTable columns={columns} data={data} recordsPerPage={15}/>
    </div>
  );
}

export default App;
