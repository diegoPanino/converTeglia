import React from 'react';

const expiredTime = 1000*60*60*24*7

export default function filterHistory(history){
	const deleteableSelection = history.filter(el=>{
			if(el.hasOwnProperty('favourite'))
				if(el.favourite)
					return false
				else
					return checkOld(el.date)
			else
				return checkOld(el.date)
		})
	return deleteableSelection;
}

function checkOld(date){
	const now = Date.now()
	if(now - date >= expiredTime)
		return true
	else
		return false
}