export function getServsFromRad(rad){
	const area = Math.pow((rad / 2),2) * Math.PI
	switch(true){
			case(area <= 96):{return 1;break;}
			case(area>96 && area <=123):{return 2;break;}
			case(area>123 && area <=167):{return 3;break;}
			case(area>167 && area <=214):{return 4;break;}
			case(area>214 && area <=270):{return 6;break;}
			case(area>270 && area <=299):{return 7;break;}
			case(area>299 && area <=330):{return 8;break;}
			case(area>330 && area <=363):{return 9;break;}
			case(area>363 && area <=398):{return 10;break;}
			case(area>398 && area <=434):{return 11;break;}
			case(area>434 && area <=472):{return 12;break;}
			case(area>472 && area <=511):{return 13;break;}
			case(area>511 && area <=552):{return 14;break;}
			case(area>552 && area <=594):{return 15;break;}
			case(area>594 && area <=638):{return 16;break;}
			case(area>638 && area <=684):{return 17;break;}
			case(area>684 && area <=731):{return 18;break;}
			case(area>731 && area <=780):{return 19;break;}
			case(area>780 && area <=830):{return 20;break;}
			case(area>830 && area <=882):{return 21;break;}
			case(area>882 && area <=935):{return 22;break;}
			case(area>935 && area <=990):{return 23;break;}
			case(area>990 && area <=1047):{return 24;break;}
			case(area>1047 && area <=1105):{return 25;break;}
			case(area>1105 && area <=1164):{return 26;break;}
			case(area>1164 && area <=1226):{return 27;break;}
			case(area>1226 && area <=1288):{return 28;break;}
			case(area>1288 && area <=1530):{return 30;break;}
			default: return 'Misure troppo grandi!';
		}
}

export function getRadFromServs(servs){
	switch(true){
		case(servs === 1):{return 11;break;}
		case(servs === 2):{return 12;break;}
		case(servs === 3):{return 14;break;}
		case(servs === 4):{return 15;break;}
		case(servs === 5):{return 17;break;}
		case(servs === 6):{return 18;break;}
		case(servs === 7):{return 19;break;}
		case(servs === 8):{return 20;break;}
		case(servs === 9):{return 21;break;}
		case(servs === 10):{return 22;break;}
		case(servs === 11):{return 23;break;}
		case(servs === 12):{return 24;break;}
		case(servs === 13):{return 25;break;}
		case(servs === 14):{return 26;break;}
		case(servs === 15):{return 27;break;}
		case(servs === 16):{return 28;break;}
		case(servs === 17):{return 29;break;}
		case(servs === 18):{return 30;break;}
		case(servs === 19):{return 31;break;}
		case(servs === 20):{return 32;break;}
		case(servs === 21):{return 33;break;}
		case(servs === 22):{return 34;break;}
		case(servs === 23):{return 35;break;}
		case(servs === 24):{return 36;break;}
		case(servs === 25):{return 37;break;}
		case(servs === 26):{return 38;break;}
		case(servs === 27):{return 39;break;}
		case(servs === 28):{return 40;break;}
		case(servs === 29):{return 42;break;}
		case(servs === 30):{return 44;break;}
	}
}

export function getKfromArea(area,targetArea){
	const k = targetArea/area;
	return k
}

export function getAreaByType(dim,key){
	const keyType = Math.trunc(key)
	switch(true){
		case(keyType === 0):{
			return {type:'Rotonda',area:Math.pow((dim / 2),2) * Math.PI}
		}
		case(keyType === 1):{
			const sides = dim.split('x')
			return {type:'Rettangolare',area:sides[0]*sides[1]}
		}
		case(keyType === 2):{
			return {type:'Quadrata',area:Math.pow(dim,2)}
		}
	}
}