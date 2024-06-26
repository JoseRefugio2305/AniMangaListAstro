import Jikan from 'jikan4.js'
const client = new Jikan.Client()



export const animesEmision = async () =>{
	enum Days {
		Sundays = 0,
		Mondays = 1,
		Tuesdays = 2,
		Wednesdays = 3,
		Thursdays = 4,
		Fridays = 5,
		Saturdays = 6,
		Unknown = 7
	}
	let count=0;
	const results = (await client.anime.listScheduled(0,200)).map((anime) => {
        // console.log(anime)
        // console.log(anime.url.href)
        count++
        return {
			conteo:count,
			titulo: anime.title.default ? anime.title.default.length>49? anime.title.default.slice(0,49)+"..." : anime.title.default : "",
			sinopsis:anime.synopsis ? anime.synopsis.length>150? anime.synopsis.slice(0,150)+"..." : anime.synopsis : "",
			imagen:anime?.image?.jpg?.default?.href ? anime?.image?.jpg?.default?.href : '/image_not_found.jpg',
			calificacion:anime.score,
			linkmal:anime.url.href,
			dia_em:anime?.broadcast?.day ? anime?.broadcast?.day : "Unknown"
        };
      }).filter((a)=>{
      		let calificacion = a.calificacion ? a.calificacion : 0
      		return calificacion>7
      });

	return results;
}


export const maTop = async (matype:number) => {
	const resp = matype==0 ? await client.anime.listTop({},0,10) :  await client.manga.listTop({},0,10)

	const results = resp.map((element)=>{
		return {
			titulo: element.title.default ? element.title.default.length>49? element.title.default.slice(0,49)+"..." : element.title.default : "",
			sinopsis:element.synopsis ? element.synopsis.length>150? element.synopsis.slice(0,150)+"..." : element.synopsis : "",
			imagen:element?.image?.jpg?.default?.href ? element?.image?.jpg?.default?.href : '/image_not_found.jpg',
			calificacion:element.score,
			linkmal:element.url.href,
		}
	})

	return results
}


export const news = async () => {

	const resan = (await client.anime.getNews(1,0,10))?.map((anews)=>{
		return {
			titulo : anews.title,
			fecha : anews.date,
			url : anews.url.href,
			imagen : anews?.image?.jpg?.default?.href ? anews?.image?.jpg?.default?.href : '/image_not_found.jpg',
			resumen : anews.excerpt

		}
	})

	const resman = (await client.manga.getNews(2,0,10))?.map((mnews)=>{
		return {
			titulo : mnews.title,
			fecha : mnews.date,
			url : mnews.url.href,
			imagen : mnews?.image?.jpg?.default?.href ? mnews?.image?.jpg?.default?.href : '/image_not_found.jpg',
			resumen : mnews.excerpt

		}
	})
	let results = resan && resman ? resan.concat(resman) : []

	results = results.sort((a,b)=>{
		return a.fecha>b.fecha ? -1 : 0
	})
	return results
}

export const news_direct = async () => {
	const upcoming = (await client.seasons.getUpcoming())?.map((aupc)=>{
		// console.log(aupc)
		return {
			malid : aupc.id,
			titulo : aupc.title.default,
			url : aupc.url.href,
			imagen : aupc?.image?.jpg?.default?.href ? aupc?.image?.jpg?.default?.href : '/image_not_found.jpg',
			season: aupc.season,
			popularidad: aupc.popularity

		}
	})
	// console.log(upcoming)
	return upcoming
}