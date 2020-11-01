//ACTION TYPE

export const SEARCH_LINK = 'SEARCH_LINK'; //SENDING A LINK TO BE FETCHED


//ACTION MAKER

export const searchLinkAction=(link)=>({
	type:SEARCH_LINK,
	payload:{link:link,date:Date.now()},
})