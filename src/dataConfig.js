import React from 'react';

const config  = [

	{
	    "name": "Amount",
		"id": "amount",
		"type": "currency",
		"sort": true
	},

  	{
        "name": "Status",
	    "id": "status",
	    "type": "string",
	    "sort": true,
        "cell": (val) => {
      		return <span className={`status ${val.toLowerCase()}`}>{val.toLowerCase()}</span>
        }
	},

	{
        "name": "Method",
	    "id": "bank",
	    "type": "string",
	    "sort": true,
        "cell": (val, obj) => {
      		return <span className="card">{`${val} .... ${obj.last4}`}</span>
        }
	},

	{
        "name": "Date",
	    "id": "date",
	    "type": "date",
	    "sort": true
	}


]

export default config;