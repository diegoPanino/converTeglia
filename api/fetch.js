import React from 'react';
const corn = require("corn");
const cheerio = require("react-native-cheerio");

const space = RegExp(/\s{2,}/g);
const ricetteDellaNonna = ".ingredienti>ul";
const gialloZafferano = "dd.gz-ingredient";
const cucchiaio = "ul.ingredients-list";
const ricetta = "div.col-xs-12.col-sm-6";
const galbani = "div.ingredients";
const misya = "div.col-md-8.col-sm-7.ingr";
const ricette = "div.lavagna"
const benedetta = "ul.wpurp-recipe-ingredients"
const ricettaLM ="div.ingredienti"
const pisti ="div.cooked-recipe-ingredients"
const ricetteDalMondo = "#ingredienti"
const chiaraPassion = "ul.wprm-recipe-ingredients" 
const soniaPeronaci = "p"
const americaFoodShop ="div.entry-content.single-page>ul";
const vlf = "div.single-ingredients";
const gnamGnam ="div.ingredienti.print-only";
const cookAround = "ul.r-ingredients";
const micro = "p.p1";
const vegan = "ul.safe";
const agroDolce = "ul";
const gnamBox = "div.inner-container";
const foodlers = "div.recipe_ingredients";
let pensieri = "ul.gdl-tabs-content";
const gipsy = "h5.ingredient";
const luciano = "h3.bevan_small.rosso_scuro";
const dolciSenzaBurro = "ul.ricetta-ingredients-list";
const tavolare = "*[itemprop = 'recipeIngredient']";
const lci = 'ul.recipe-ingredients';
const sep = 'ul.sp2015-ingredienti-box.row.btn-group';
const buonissimo = 'section.ingrRicc';
const ricetteVeloci = 'div#ingredienti-box';
const cookist = "div.box-ingredienti";

const ingredients = [];
let recipe = {
	url:'',
	title:'',
	trayRad:'',
	ingredients:[]
}

async function readHtml(url){
	try{
		let response = await fetch(url,{
			method:"get",
			headers:{"Content-type":"text/html"}
			})
		let data = await response.text()
		return cheerio.load(data)
		}
	catch(err){
		console.log("-------------READ HTML ERROR:------------",err)
		return err;
	}	
}
function getHtmlTitle($,title){
	const res  =$(title).text().trim()  //check for errors and clean string
	return res;
}
function normalizeUnit(units){
	units = units.trim().toLowerCase()
	const cleanUnit = units.replace(/[0-9]/,'')
	switch(cleanUnit){
		case 'l','litro','litri': return 'l';
		case 'decilitri': return 'dl';
		case 'decilitro': return 'dl';
		case 'kg','chilo','chili': return 'kg';
		case 'g','gr', 'grammo','grammi': return 'g';
		case 'gr': return 'g'; 
		case 'cucchiaio': return 'CT';
		case 'cucchiai': return 'CT';
		case 'cucchiaino': return 'ct';
		case 'cucchiaini': return 'ct';
		case 'tazza': return 'Tz';
		case 'tazze': return 'Tz';
		default: return units;
	}
}
function normalizeNames(names){
	let cleanNames = names.replace(/\s{2,}/g,' ').toLowerCase() //double space replaced with single space
	cleanNames = cleanNames.replace(/[^\w\s[à-ý][()]/g,'')
	cleanNames = cleanNames.trim();
	return cleanNames;
}
function normalizePortions(htmlStr){
	const defaultValue = 22;
	const numberRegExp = RegExp(/[0-9]{1,}/g).exec(htmlStr)
	if(!numberRegExp)
		return defaultValue
	const number = numberRegExp[0]
	
	let measurement;
	let rad;
	switch(true){
		case(RegExp(/person/gi).test(htmlStr)): {measurement='persone';break;}
		case(RegExp(/porzion/gi).test(htmlStr)): {measurement='persone';break;}
		case(RegExp(/portat/gi).test(htmlStr)): {measurement='persone';break;}
		case(RegExp(/servin/gi).test(htmlStr)): {measurement='persone';break;}
		case(RegExp(/pancake/gi).test(htmlStr)): {measurement='persone';break;}
		case(RegExp(/x/gi).test(htmlStr)): {measurement='persone';break;}
		case(RegExp(/dos/gi).test(htmlStr)): {measurement='persone';break;}
		case(RegExp(/stampo/gi).test(htmlStr)): {measurement='teglia';rad = number;break;}
		case(RegExp(/teglia/gi).test(htmlStr)): {measurement='teglia';rad = number;break;}
		case(RegExp(/tortiera/gi).test(htmlStr)): {measurement='teglia';rad = number;break;}
		case(RegExp(/cm/gi).test(htmlStr)):{measurement='teglia';rad = number;break;}
		default : {measurement='teglia';rad = '22'}
	}
	if(measurement === 'persone'){
		switch(number){
			case '1':{rad=10; break;}
			case '2':{rad=12; break;}
			case '3':{rad=14; break;}
			case '4': {rad=16; break;}
			case '6': {rad=18; break;}
			case '8': {rad=20; break;}
			case '10': {rad=22; break;}
			case '12': {rad=24; break;}
			case '14': {rad=26; break;}
			case '16': {rad=28; break;} 
		}
	}
	return rad;
}
function resetRecipe(){
	//recipe.ingredients.length = 0;
	ingredients.length = 0;
	recipe = {
		url:'',
		src:'',
		title:'',
		trayRad:'',
		ingredients:[]
	}
}
//getAmount restituira true o false a seconda di errore nella lettura dati
//recipe e' globale, getAmount la riempe 
function getAmount(ings,title,url,portions,src='image not found'){
	title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
	recipe.title=title
	recipe.url=url;
	recipe.trayRad = portions

	if(src.length === 0)
		recipe.src = 'image not found'
	else
		recipe.src = src

	const valori = ings.map((ingrediente,i)=>{
		//const selectFractions = RegExp(/[¼-¾]/g)
		const selectFractions = /[0-9]{1,}-[0-9]{1,}/g
		const selectNums = /([0-9]+,[0-9]+)|([0-9]+\.[0-9]+)|([0-9]+)/
		const selectFarina = /farina [0-9]{2}|farina[0-9]{2}|farina tipo[0-9]{2}|farina tipo [0-9]{2}/i
		const selectFloat = /([0-9]+,[0-9]+)|([0-9]+\.[0-9]+)/

		const approxValue = selectFractions.exec(ingrediente)
		if(approxValue){
			const numsArr = approxValue[0].split('-')
			const media = (Number(numsArr[0])+Number([numsArr[1]]))/2
			ingrediente = approxValue.input.replace(selectFractions,media)
		}//getting media value from approx (if exist) numbers

		let nums = selectNums.exec(ingrediente)

		if(nums !== null){
			const checkFarina = selectFarina.exec(ingrediente)
			const floatNum = selectFloat.exec(ingrediente)

			if(floatNum){
				nums[0] = floatNum[0].replace(',','.')
				const subStr = floatNum.input.substr(floatNum.index,floatNum[0].length)

				nums.input = floatNum.input.replace(subStr,nums[0])
			}

			if(checkFarina){
				ingrediente = checkFarina.input.replace(checkFarina[0],'replacement')			
				nums = selectNums.exec(ingrediente)
				nums.input = checkFarina.input.replace('replacemente',checkFarina[0])
			}// end check farina 00
			
			const strNoNums = nums.input.replace(nums[0],'')
			const selectUnits = 
				RegExp(/l\b|litro\b|litri\b|decilitro\b|decilitri\b|ml\b|cl\b|kg\b|chilo\b|chili\b|g\b|gr\b|mg\b|grammi|grammo|cucchiaio|cucchiaino|cucchiaini|cucchiai|tazza|tazze/i);
			const unitsRaw = selectUnits.exec(strNoNums)
			if(unitsRaw !== null){
				const units = normalizeUnit(unitsRaw[0])
				const namesRaw = unitsRaw.input.replace(selectUnits,'')
				const names = normalizeNames(namesRaw)
				recipe.ingredients.push({
					amounts:Number(nums[0]),
					units:units,
					names:names,
					key:i
				})//ingredients.push
				//no err ??
			}//unitsRaw !== null
			else{
				recipe.ingredients.push({
					amounts:nums[0],
					units:'',
					names:normalizeNames(strNoNums),
					key:i
				})//push
				//no err ?
			}//else
		}//nums !== null
		else{
			recipe.ingredients.push({
				amounts:'',
				units:'',
				names:normalizeNames(ingrediente),
				key:i
			})
			//no err 
		}
	})//end of map
	return 1;
}

//invocato da searchScreen, riceve url, esegue fetch, chiama getAmount e altre
//funzioni helper per la normalizzazione dei dati, restituisce recipe se tutto ok
//oppure restituisce valore errore
export async function getIngredients(url){
resetRecipe()
if(!(/http/gi).test(url)){
	console.log(url)
	const ingredientsList = url.replace(/\t|\v|\f/gi,' ').split('\n')
	ingredientsList.map(el=>{
		if(el.length > 0)
			ingredients.push(el.replace(space,' ').trim())
		
	})
	const getAmountError = getAmount(ingredients,'Ricetta personale','Ricetta personale','','')
	if(getAmountError)
		return {...recipe,personal:true}
	else{
		console.log(err)
		return ({err:1,msg:'Errore nel leggere la ricetta !'})
	}
}
 switch(true){
 	case(RegExp(/est/g).test(url)):{
 		console.log('--------test')
 		const ing = [	
 						"300 gr farina 00",
 						"farina 00 300 gr",
 						"300gr farina 00",
 						"farina 00 300gr",
 						"30-40ml acqua",
 						"19,5 g orzo, riu",
 						"29.8 ml acqua",
 						"coca,zero 23,4 ml"
 					]
 		const title = "riCetta dI pROVA"
 		const url = "url"
 		const portions = normalizePortions("")
 		const src = ""//"https://www.atuttodonna.it/atuttodonna/wp-content/uploads/2020/04/immagini-felicit%C3%A0.jpg"
 		const getAmountError = getAmount(ing,title,url,portions,src)
 		if(getAmountError)
 			return recipe;
 		break;
 	}
 	case (RegExp(/blog.giallozafferano/g).test(url)):{
   		try{
    		const $ = await readHtml(url);
    
		    const htmlTitle = 'h1.entry-title';
			const title = getHtmlTitle($,htmlTitle)

			const src = $('figure.recipe-cover').find('img').attr('src')
			console.log(src)
		    const htmlPortionsTag = 'li.servings';
		    const htmlPortionsValue = $(htmlPortionsTag).find('span.recipe-value').text()
		    const portions = normalizePortions(htmlPortionsValue)

		    const htmlIngredients = "div.recipe-ingredients";
			$(htmlIngredients)
			.find('div.recipe-ingredient-item')
			.each((i,el)=>{
				let number = $(el).find('span.recipe-ingredient-number').text();
				let unit = $(el).find('span.recipe-ingredient-unit').text();
				let name = $(el).find('span.recipe-ingredient-name').text();
				let notes = $(el).find('span.recipe-ingredient-notes').text();
				name = name+" "+notes;
				unit = normalizeUnit(unit);
				name = normalizeNames(name);
				ingredients[i] = number +" "+unit+" "+name;
			})//end each
	
			const getAmountError = getAmount(ingredients,title,url,portions,src)	
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('-----------GetAmountError-----------')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
    case (RegExp(/ricette.giallozafferano+/g).test(url)):{
		try{
			const $= await readHtml(url);

			const htmlTitle='h1.gz-title-recipe';
			const title = getHtmlTitle($,htmlTitle)

			const src = $('picture.gz-featured-image').find('source').attr('data-srcset')

			const htmlPortionsTag = 'div.gz-list-featured-data'
			let portions;
			const htmlPortionsValue = $(htmlPortionsTag)
				.find('span.gz-name-featured-data').each((i,el)=>{
					const line = $(el).text()
					if(RegExp(/Dosi/gi).test(line)){
						portions = normalizePortions($(el).find('strong').text());
					}
				})

			$(gialloZafferano).each((i,el)=>{
				ingredients[i] = $(el).children().text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/ricettedellanonna/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1.main_title'
			const title = getHtmlTitle($,htmlTitle)

			const src = $('div.img_featured').find('img').attr('src')

			const htmlPortionsTag = 'ul.info_ricetta'
			const htmlPortionsValue = $(htmlPortionsTag).find('li.dosi_per').text()
			const portions = normalizePortions(htmlPortionsValue)

			$(ricetteDellaNonna).children('li').each((i,el)=>{
						ingredients[i] = $(el).text().replace(space, " ")
			})
			
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/cucchiaio/g).test(url)):{
		try{
		const $ = await readHtml(url);

		const htmlTitle = 'h1.titolo-ricetta'
		const title = getHtmlTitle($,htmlTitle)

		const src = $('img.image').attr('src')

		const htmlPortionsTag = 'div.scheda-ricetta-new'
		let portions;
		const htmlPortionsValue = $(htmlPortionsTag).find('span.scheda-def')
			.each((i,el)=>{
				const line = $(el).text()
				if(RegExp(/Porzion/gi).test(line)){
					portions = normalizePortions(line)
				}
			})

		const text = $(cucchiaio).not(".btn-tool").find('li').each((i,el)=>{
					ingredients[i]=$(el).text().replace(space," ")
				})
			
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/ricetta.it/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1.h1-tit-recipes'
			const title = getHtmlTitle($,htmlTitle)

			const src = "https://ricetta.it"+ $('img.img-responsive.phrecipe').attr('src')

			const htmlPortionsTag1 = 'span.post-detail-attribute-label';
			const htmlPortionsTag2 = 'span.post-detail-attribute-value';
			let portions;
			let portionsIndex;
			const htmlPortionsValue1 = $(htmlPortionsTag1).each((i,el)=>{
				const line = $(el).text()
				if(RegExp(/porzion/gi).test(line)){
					portions = line
					portionsIndex=i
				}
			})
			const htmlPortionsValue2 = $(htmlPortionsTag2).each((i,el)=>{
				const line = $(el).text()
				if(portionsIndex === i)
					portions = portions + line
			})
			portions = normalizePortions(portions)

			$(ricetta).find('td').not('em').each((i,el)=>{
				ingredients[i]=$(el).text().replace(space," ")
			})
			
			const getAmountError = getAmount(ingredients,title,url,portions,src)	
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/galbani/g).test(url)):{
		try{
			const $ = await readHtml(url)

			const htmlTitle = 'h1';//col-sm-9 col-md-10
			const title = getHtmlTitle($,htmlTitle)

			const src = $('div.visual_container').find('img').attr('data-src-mobile')

			const htmlPortionsTag ='span.galbani_icon.gicon-persone'
			const htmlPortionsValue = $(htmlPortionsTag).next().text()
			const portions = normalizePortions(htmlPortionsValue)

			$(galbani).find('li').each((i,el)=>{
			 	ingredients[i] = $(el).text().replace(space," ")
			})
			
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/misya/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1.mb-0';
			const title = getHtmlTitle($,htmlTitle)

			const src = $('figure').find('img').attr('data-src')

			const htmlPortionsTag = 'li.list-group-item.active'
			let portions;
			const htmlPortionsValue = $(htmlPortionsTag).each((i,el)=>{
				let line = $(el).text()
				if(RegExp(/dosi/gi).test(line)){
					line = line.split('1')
					portions = normalizePortions(line[1])
				}

			})

			$(misya).find("label.form-check-label").each((i,el)=>{
				ingredients[i] = $(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)	
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/ricette.com/g).test(url)):{
		try{
			const $ = await readHtml(url)

			const htmlTitle = 'h1.titolo-single-sotto-img';
			const title = getHtmlTitle($,htmlTitle)

			const src = $("[itemprop='image']").attr('data-src')
			console.log(src)

			const htmlPortionsTag = 'div.fusion-one-fourth.fusion-spacing-no.specifiche'
			const htmlPortionsValue = $(htmlPortionsTag).find('span').first().text()
			const portions = normalizePortions(htmlPortionsValue+" persone")

			$(ricette).find("li").each((i,el)=>{
				ingredients[i] = $(el).text().replace(/\s\s+/g, " ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)	
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/benedetta/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1.entry-title';
			const title = getHtmlTitle($,htmlTitle)

			const src = $('embed#pubtechvideo').attr('src')
			console.log(src)
			const portions=normalizePortions()

			$(benedetta).find('li').each((i,el)=>{
				ingredients[i] = $(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/ricettelastminute/g).test(url)):{
		try{
			const $ = await readHtml(url)

			const htmlTitle = 'h1_titolo_ricetta';
			const title = normalizeNames($('h1').text())	

			const src = "https://www.ricettelastminute.com"+$('div.foto-ricetta').find('img').attr('src')

			const htmlPortionsTag='span.ricetta-dettagli'
			let portions;
			const htmlPortionsValue=$(htmlPortionsTag).each((i,el)=>{
				const line = $(el).text()
				if(RegExp(/teglia/gi).test(line)){
					portions = $(el).next().next().text()
					portions = normalizePortions(portions)
					return
				}
			})

			$(ricettaLM).find('li').each((i,el)=>{
				ingredients[i]= $(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/pisti/g).test(url)):{	
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1.entry-title'
			const title = getHtmlTitle($,htmlTitle)

			const src = $('div.cooked-post-featured-image').find('img').attr('data-lazy-src')
			console.log(src)

			const htmlPortionsTag = 'select.cooked-servings-changer'
			let portions;
			const htmlPortionsValue = $(htmlPortionsTag).find('option').each((i,el)=>{
					if($(el).prop('selected')){
						portions = normalizePortions($(el).text())
					}
			})

			$(pisti).first().find('div.cooked-ingredient').each((i,el)=>{
				let number= $(el).find('span.cooked-ing-amount').text()
				let unit= $(el).find('span.cooked-ing-measurement').text()
				let name= $(el).find('span.cooked-ing-name').text()
				unit = normalizeUnit(unit);
				name = normalizeNames(name);
				recipe.ingredients.push({
					amounts:number,
					units:unit,
					names:name,
				})
			})
			recipe.title=title
			recipe.url=url
			recipe.src=src
			recipe.portions=portions
			return recipe
		}
		catch(err){
			console.log(err);
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/ricettedalmondo/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle='h1.item.pf-title'
			const title = getHtmlTitle($,htmlTitle)

			const src = 'https://www.ricettedalmondo.it/'+$('div.foto-ricetta').find('img').attr('src')

			const htmlPortionsTag='h2.legend.legend-ingredienti'
			const htmlPortionsValue =$(htmlPortionsTag).text()
			const portions = normalizePortions(htmlPortionsValue)

			$(ricetteDalMondo).find('li').each((i,el)=>{
				ingredients[i]=$(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/chiarapassion/g).test(url)):{
		try{
			const $ = await readHtml(url)

			const htmlTitle='h1.entry-title'
			const title = getHtmlTitle($,htmlTitle)

			const src = $('img.aligncenter.size-full').attr('src')

			const htmlPortionsTag1='span.wpurp-recipe-servings';
			const htmlPortionsTag2='span.wpurp-recipe-servings-type'
			const htmlPortionsValue1 = $(htmlPortionsTag1).first().text()
			const htmlPortionsValue2 = $(htmlPortionsTag2).first().text()
			const portions = normalizePortions(htmlPortionsValue1 + htmlPortionsValue2)

			let htmlScrapeString;
			if($('ul').hasClass('wpurp-recipe-ingredient-container'))
				htmlScrapeString = 'ul.wpurp-recipe-ingredient-container'
			else
				htmlScrapeString = chiaraPassion

			$(htmlScrapeString).find('li').each((i,el)=>{
				ingredients[i] = $(el).text().replace(space,' ')
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
		}
		break;
	}
	case (RegExp(/soniaperonaci/g).test(url)):{
		try{
			console.log(url)
			console.log('Need to be implemented-SP-')
			//$(el).trovo un p successivo ad un h2 successivo ad un img
			//$(el).trovo un h2 che inizia con INGREDIENTI
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/americanfoodshop/g).test(url)):{
		try{
			const $ = await readHtml(url)	

			const htmlTitle = 'h1.entry-title'
			const title = getHtmlTitle($,htmlTitle)

			const src = $('div.entry-image.relative').find('img').attr('data-src')

			const portions = normalizePortions()

			$(americaFoodShop).find('li').each((i,el)=>{
				ingredients[i]= $(el).text().replace(space, " ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)	
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/vivalafocaccia/g).test(url)):{
		try{
			const $ = await readHtml(url)

			const htmlTitle = 'h1'
			const title =$(htmlTitle).first().text()

			const src = $('div.single-main-media-image-w').find('img').attr('nitro-lazy-src')

			const htmlPortionsTag='li.single-meta-serves';
			const htmlPortionsValue =$(htmlPortionsTag).text()
			const portions=normalizePortions(htmlPortionsValue)

			$(vlf).find('span.ingredient-amount').each((i,el)=>{
				ingredients[i]=$(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)                                	
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/gnamgnam/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1'
			const title = getHtmlTitle($,htmlTitle)

			const src = $('img.img-responsive.photo').attr('src')

			const htmlPortionsTag='div.row.box-met'
			let portions;
			const htmlPortionsValue=$(htmlPortionsTag).find('div').each((i,el)=>{
				const line = $(el).text()
				if(RegExp(/per:/gi).test(line)){
					portions = normalizePortions(line)
					return
				}
			})

			$(gnamGnam).find('dd').each((i,el)=>{
				ingredients[i] = $(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/cookaround/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1.fn'
			const title = getHtmlTitle($,htmlTitle)

			const dataRecipe = $('body').attr('data-recipe')
			const firstCode = dataRecipe.slice(0,-3)
			const link = "https://cdn.cook.stbm.it/thumbnails/ricette/"
			const src = link + firstCode + "/" + dataRecipe + "/" +"hd400x225.jpg"

			const htmlPortionsTag='li.yield'
			const htmlPortionsValue = $(htmlPortionsTag).text()
			const portions = normalizePortions(htmlPortionsValue)

			const exlusion = $(cookAround).find('li').last()
			$(cookAround).find('li').not(exlusion).each((i,el)=>{
				ingredients[i]= $(el).text().replace(space," ");
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)	
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/microonde/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h2.title';
			const title = getHtmlTitle($,htmlTitle)

			const htmlPortionsTag='h3'
			const htmlPortionsValue =$(htmlPortionsTag).each((i,el)=>{
				const line = $(el).text()
				if(RegExp(/ingredient/gi).test(line))
					return line;
			})
			const portions = normalizePortions(htmlPortionsValue)

			$(micro).each((i,el)=>{
				const paragraph = $(el).text().replace(space," ").split(/\n/);
				paragraph.map((line,y)=>{
					ingredients[y] = line	
				})
			})
			const getAmountError = getAmount(ingredients,title,url,portions)	
			if(getAmountError){
				console.log('RETURN RECIPE: ',recipe)
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/vegan/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle= 'h1'
			const title = getHtmlTitle($,htmlTitle)

			const src ="https://www.veganhome.it" + $('img.img-thumbnail').attr('src')

			const htmlPortionsTag='h2.vhome3-first'
			const htmlPortionsValue=$(htmlPortionsTag).each((i,el)=>{
				const line = $(el).text()
				if(RegExp(/ingredient/gi).test(line))
					return line
			})
			const portions = normalizePortions(htmlPortionsValue)

			$(vegan).find('li').each((i,el)=>{
				ingredients[i] = $(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/agrodolce/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1'
			const title = getHtmlTitle($,htmlTitle)

			let src;
			$('img').each((i,el)=>{
				if(title == $(el).attr('alt'))
					src = $(el).attr('data-cfsrc')		
			})

			const htmlPortions = $('div.ingredients-title').find('span').text()
			const portions = normalizePortions(htmlPortions)

			const $ingredients = $(agroDolce).find('li').children(".ingredient-info");
			$ingredients.each((i,el)=>{
				ingredients[i] =  $(el).next().text().replace(space," ")+" "+$(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)	
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/gnambox/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1.single-title'
			const title = getHtmlTitle($,htmlTitle)

			const src = $('section.recipe-main-cover').find('img').attr('src')
			console.log(src)

			const htmlPortionsTag = 'h3';
			let portions;
			const htmlPortionsValue = $(htmlPortionsTag).each((i,el)=>{
				const line = $(el).text()
				if(RegExp(/ingredient/gi).test(line))
					portions = normalizePortions(line)		
			})
			

			$(gnamBox).first().next().find('li').each((i,el)=>{
				ingredients[i] = $(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)	
			if(getAmountError){
				console.log('RETURN RECIPE: ',recipe)
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/thefoodellers/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1'
			const title =getHtmlTitle($,htmlTitle)

			const src = $('img')
			console.log(src)

			const htmlPortionsTag='div.recipe-ingredients'
			const htmlPortionsValue=$(htmlPortionsTag).find('h2').text()
			const portions = normalizePortions(htmlPortionsValue)

			$(foodlers).find('li').each((i,el)=>{
				ingredients[i] = $(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/pensieriefornelli/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1'
			const title = getHtmlTitle($,htmlTitle)

			const src = $('div.blog-thumbnail-image').find('img').attr('src')

			const hasTabMenu = $('ul').hasClass("gdl-tabs-content");
			let portions;
			let paragraphs = []
			if (!hasTabMenu){
				pensieri = "p";
				$(pensieri).next().each((i,el)=>{
					const line = $(el).text()
					if(RegExp(/ingredient/gi).test(line))
						portions = normalizePortions(line)

					if( RegExp(/^[0-9]/gm).test( line ) ){
						paragraphs[i]= $(el).text().split(/\n/);
						ingredients.push(...paragraphs[i])
						}
				});
			}
			else{
				const htmlPortionsTag='a.active'
				const htmlPortionsValue=$(htmlPortionsTag).each((i,el)=>{
					const line = $(el).text()
					if(RegExp(/ingredient/gi).test(line))
						portions = normalizePortions(line)
				})
				paragraphs = $(pensieri).find('li').first().text().split(/\n/)
				ingredients.push(...paragraphs)
			}
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}	
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/agipsy/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle='h1.single-food-title.ricettetitle'
			const title = getHtmlTitle($,htmlTitle)

			const src = $('div.ricette_featureimage').find('img').attr('src')

			const htmlPortionsTag = 'div.col-xs-8.col-sm-9.personimg';
			let portions=0
			const htmlPortionsValue=$(htmlPortionsTag).find('img').each((i,el)=>{
				portions = portions + 1
			})
			portions = normalizePortions(portions+" persone")

			let splitArr = $(gipsy).children().first().text().split(/\n/)
			ingredients.push(...splitArr)
			
			const getAmountError = getAmount(ingredients,title,url,portions,src)	
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/luciano/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h2.entry-title';
			const title = getHtmlTitle($,htmlTitle)

			const src = $('p.thumbnail').find('img').attr('src')

			const htmlPortionsTag = 'h3.bevan_small.rosso_scuro'
			let portions;
			const htmlPortionsValue = $(htmlPortionsTag).each((i,el)=>{
				const line = $(el).text()
				if(RegExp(/ingredient/gi).test(line))
					portions = normalizePortions(line)
			})

			$(luciano).next().find('li').each((i,el)=>{
				ingredients[i]= $(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				console.log('RETURN RECIPE: ',recipe)
				return recipe;
			}
		
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp (/dolcisenzaburro/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = 'h1#ricetta-title'
			const title = getHtmlTitle($,htmlTitle)

			const src = "https:"+$('div#ricetta-thumbnail-1').find('img').attr('src')

			const htmlPortionsTag = 'span#ricetta-portions'
			let portions;
			const htmlPortionsValue = "porzion" + $(htmlPortionsTag).text()
			portions = normalizePortions(htmlPortionsValue)

			$(dolciSenzaBurro).find('li').each((i,el)=>{
				ingredients[i] = $(el).text().replace(space," ")
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
		
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case (RegExp(/tavolartegusto/g).test(url)):{
		try{
			const $ = await readHtml(url);

			const htmlTitle = "span.post-title"
			const title = $(htmlTitle).find("[itemprop='name']").text().trim()
			
			const htmlImg = 'div.single-container'
			const htmlSrc= $(htmlImg).find("[itemprop='image']").attr('data-srcset')
			const srcArr = htmlSrc.split(' ')
			const src = srcArr[2]

			const htmlPortionsTag = "[itemprop='recipeYield']"
			let portions = normalizePortions($(htmlPortionsTag).text())


			$(tavolare).each((i,el)=>{
				ingredients[i] = $(el).text().replace(space,' ')
			})
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){			
				return recipe;
			}


		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
		break;
	}
	case ((/lacucinaitaliana/g).test(url)):{
		try{
			const $ = await readHtml(url)

			const htmlTitle = 'h1.article-title'
			const title = $(htmlTitle).text().trim()

			const htmlImg = 'div.article-header-text'
			const src = $(htmlImg).next().find('img').attr('srcset')

			const htmlPortionsTag = 'div.recipe-info'
			const portions = normalizePortions($(htmlPortionsTag).find('div.col-sm-6').text())

			$(lci).find('li').each((i,el)=>{
				ingredients[i] = $(el).text().replace(space,' ')
			})

			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError){
				return recipe;
			}
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
	}
	case ((/salepepe/g).test(url)):{
		try{
			const $ = await readHtml(url)

			const htmlTitle = 'h1.fn.sp-title.playfairheavy'
			const title = $(htmlTitle).text().trim()

			const htmlImg = 'div.sp-ricetta-img.col-md-12.clearfix'
			const src = $(htmlImg).find('img').attr('data-srcset').split(' ')


			const htmlPortionsTag ='h3.lato.block-heading.clearfix'
			const portions = normalizePortions($(htmlPortionsTag).text())

			$(sep).find('ul.row').each((i,el)=>{
				ingredients[i] = $(el).text().trim().replace(space,' ')
			})

			const getAmountError = getAmount(ingredients,title,url,portions,src[0])
			if(getAmountError)
				return recipe;
			else
				throw new Error('GetAmountError')

		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta !'})
		}
	}
	case ((/buonissimo/g).test(url)):{
		try{
			const $ = await readHtml(url)

			const htmlTitle = 'article'
			const title = $(htmlTitle).find('h1').text().trim()

			const htmlImg = 'picture.topImg'
			const src = $(htmlImg).find('img').attr('src')

			let portions;
			const htmlPortionsTag = 'ul.dettRicc'
			$(htmlPortionsTag).find('li').each((i,el)=>{
				if(i===2){
					portions=normalizePortions($(el).text().trim())
				}
			})

			$(buonissimo).find('li').each((i,el)=>{
				ingredients[i]= $(el).text().replace(space,' ')
			})

			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError)
				return recipe;
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta'})
		}
	}
	case ((/dolciveloci/g).test(url)),((/primochef/g).test(url)):{
		try{
			const $ = await readHtml(url)

			const htmlTitle ='h1.m-b-xs-0.axil-post-title.hover-line'
			const title = $(htmlTitle).text().trim()

			const htmlImg = 'img'
			let src
			$(htmlImg).each((i,el)=>{
				if($(el).attr('alt') == title)
					src = $(el).attr('data-src')
			})

			let portions
			const htmlPortionsTag = 'div#cotture-box'
			$(htmlPortionsTag).find('span').each((i,el)=>{
				if(i===1){
					portions = normalizePortions('persone '+ $(el).text().trim())
				}
			})

			$(ricetteVeloci).text().replace(space,' ').trim().split('•').map((el,i)=>{
				if(i>0)
					ingredients[i-1] = el
			})
			
			const getAmountError = getAmount(ingredients,title,url,portions,src)
			if(getAmountError)
				return recipe
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta'})
		}
	}
	case((/cookist/g).test(url)):{
		try{
			const $ = await readHtml(url)

			const htmlTitle = 'div.art-title'
			const title=$(htmlTitle).find('h1').text().trim();

			const htmlImg = 'div.box-triplePhoto.clearfix'
			const src=$(htmlImg).last().find('a').last().attr('data-src-big')

			const htmlPortionsTag='span.recipe-icon.icon-servings.big';
			const portions = normalizePortions($(htmlPortionsTag).next().text().trim())

			$(cookist).find('li').each((i,el)=>{
				const amount = $(el).find('b').text().trim().replace(space,' ')
				const name = $(el).find('span').first().text().trim().replace(space,' ')
				ingredients[i]=amount+" "+name
			})

			const getAmountError= getAmount(ingredients,title,url,portions,src)
			if(getAmountError)
				return recipe
			else
				throw new Error('GetAmountError')
		}
		catch(err){
			console.log(err)
			return ({err:1,msg:'Errore nel leggere la ricetta'})
		}
	}
	default:{
		return ({err:1,msg:'Impossibile leggere la ricetta !'})
		break;
	}
 }

}