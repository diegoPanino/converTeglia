import React from 'react';

export default function filterHistory(history,day){
	const expiredTime = 1000*60*60*24*day //1000 ms * 60s * 60m * 24h * 7d
//select everything is older than day
	const deleteableSelection = history.filter(el=>{
			if(el.hasOwnProperty('favourite'))
				if(el.favourite)
					return false
				else
					return checkOld(el.date,expiredTime)
			else
				return checkOld(el.date,expiredTime)
		})
	return deleteableSelection;
}

function checkOld(date,expiredTime){
	const now = Date.now()
	if(now - date >= expiredTime)
		return true
	else
		return false
}
