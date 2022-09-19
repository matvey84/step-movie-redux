export const SHOW_MAIN_ALERT='SHOW_MAIN_ALERT'
export const HIDE_MAIN_ALERT='HIDE_MAIN_ALERT'

export function showAlert (text){
  return dispatch=>{
     dispatch({type:'SHOW_MAIN_ALERT', payload: text,})
    setTimeout(()=>dispatch({type:'HIDE_MAIN_ALERT'}), 3000)
  }
}
//-------------------------------------------------------
export const SHOW_HIDE_FORM = 'SHOW_HIDE_FORM'
export const toggleForm = (payload) => ({type:SHOW_HIDE_FORM, payload})
//-------------------------------------------------------------
export const FETCH_MOVIE_TITLE='FETCH_MOVIE_TITLE';
export const DEL_MOVIE_TITLE = ' DEL_MOVIE_TITLE'
export const getQueryParams = (params) => {
  return dispatch=>{
    dispatch({type:FETCH_MOVIE_TITLE, payload:params})
    setTimeout(()=> dispatch({type:DEL_MOVIE_TITLE,}), 3000)
  }
}
//--------------------------
export const SHOW_LOADING = 'SHOW_LOADING' 
export const showLoading =()=>({type:SHOW_LOADING,})

export const HIDE_LOADING = 'HIDE_LOADING' 
export const hideLoading =()=>({type:HIDE_LOADING,})
//----------------------------------------------------------------------------
export const GET_DATA = 'GET_DATA';
//export const DEL_DATA= 'DEL_DATA'
export const fetchMovie = (title = '', type = '', year = '', page = 1, ) => {

    const apiKey = 'f5716cf9';
    let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${title}&type=${type}&y=${year}&page=${page}`
    console.log(url)
    return async dispatch => {
      try{
        dispatch(showLoading())
        const resp = await fetch(url);
        const data = await resp.json();
          setTimeout(()=>{
          resp.ok && dispatch({type:GET_DATA, payload:data})
          data.Response === 'False' && dispatch(showAlert(`${data.Error} Enter the full title of the movie!`))
          dispatch(hideLoading())
        },500)
      }catch(e){
        dispatch(showAlert('There were problems uploading the file.'))
        dispatch(toggleForm(true))	//НЕ ИСПОЛЬЗУЕТСЯ
        dispatch(hideLoading())
      }
  // 		dispatch({type:DEL_DATA, payload:[]})
  }
}
//---------
export const GET_SIMILAR_RESULTS_FETCH_FROM_DETAILS = 'GET_SIMILAR_RESULTS_FETCH_FROM_DETAILS'
export function getSimilarResults (title=''){
  const apiKey = 'f5716cf9';
  let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`
  console.log(url)
  return async dispatch=>{
    try{
      const resp = await fetch(url);
      const data = await resp.json();
      resp.ok && dispatch({type:GET_SIMILAR_RESULTS_FETCH_FROM_DETAILS, payload:data})
      
    }catch(e){
      dispatch(showAlert('There were problems uploading the file.'))
      dispatch(toggleForm(true))	//НЕ ИСПОЛЬЗУЕТСЯ
      dispatch(hideLoading())
    }
  }
}

//--------------------------------------------------
export const GET_DETAILS_DATA='GET_DETAILS_DATA'

export  function getFetchForDetailsInfo(id){
  console.log(id)
  const apiKey = 'f5716cf9';
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`
      console.log(url)
        return async dispatch =>{		
        try{
          const resp = await fetch(url);
          const detailsData = await resp.json();
          setTimeout(()=>{
            resp.ok && dispatch({type:GET_DETAILS_DATA, payload:detailsData})
            detailsData.Response === 'False' && dispatch(showAlert(`${detailsData.Error} Введите полное название фильма!`))
            dispatch(hideLoading())
        },500)
        }catch(e){
          dispatch(showAlert('Возникли проблемы с загрузкой файла.'))
          //dispatch(toggleForm(true))	//НЕ ИСПОЛЬЗУЕТСЯ
          dispatch(hideLoading())
        }
      }
}
//------------------------------------
export const  GET_NUMBERS_OF_PAGE='GET_NUMBERS_OF_PAGE'
export const GET_ARR_WITH_ALL_PAGES='GET_ARR_WITH_ALL_PAGES' 
export const UPDATE_CURRENT_PAGE_VALUE='UPDATE_CURRENT_PAGE_VALUE'


export function getNumberOfPages(data, numIndex){
  let totalResult = Number(data.totalResults)
  const arr = []
  const maxLimitPages = Math.ceil(totalResult/data.Search.length)
  const remainder = (numIndex+1)*10-maxLimitPages
  const totalAmountPagesArr=[]

  for(let i=1; i<=data.totalResults; i++){
    arr.push(i)
  }

  let totalAmountPages = Math.ceil(arr.length/10)
  
  for(let j=1;j<=totalAmountPages;j++){
    totalAmountPagesArr.push(arr.splice(0,10))
  }
  if(numIndex+1===totalAmountPages){
    totalAmountPagesArr[numIndex].splice(0-remainder, remainder)
  }

 return dispatch =>{
  setTimeout(()=>{dispatch({type:GET_NUMBERS_OF_PAGE, payload:totalAmountPages})
  dispatch({type:GET_ARR_WITH_ALL_PAGES, payload:totalAmountPagesArr})
  },500)
  }
}
//-----------------------------------------------------------------
export const GET_FETCH_WITH_PAGINATOR_BUTTON = 'GET_FETCH_WITH_PAGINATOR_BUTTON'
export const GET_VALUE_FROM_SEARCH_FORM ='GET_VALUE_FROM_SEARCH_FORM'
//---------------------------------------------------------------------

export const GET_LOCATION='GET_LOCATION'

export const locationSearchStorage =(string)=>{
  return dispatch=>{dispatch({type:GET_LOCATION, payload: string})}
}

export const GET_FAVORITE_MOVIE= 'GET_FAVORITE_MOVIE'
export const getFavoriteMovieId =(obj)=>{
    
    return dispatch =>{dispatch({
      type: GET_FAVORITE_MOVIE,
      // payload: data.Search.filter((_,i) => i===id)
      payload: obj
    })
  }
}
export const GET_FAVORITE_MOVIE_AFTER_DELETE= 'GET_FAVORITE_MOVIE_AFTER_DELETE'
export const getFavoriteMovieIdAfterDelete = (obj) => {
//	console.log(obj)
  return dispatch =>{ dispatch({
    type: GET_FAVORITE_MOVIE_AFTER_DELETE,
    payload: obj
  })
}
}

export const GET_FAVORITE_MOVIE_AFTER_REMOVING_DUPLICATE_MOVIE = 'GET_FAVORITE_MOVIE_AFTER_REMOVING_DUPLICATE_MOVIE'
export const getFavoriteMovieAfterRemoveDuplicateMovie =(arr)=>{
    return dispatch =>{dispatch({
      type:GET_FAVORITE_MOVIE_AFTER_REMOVING_DUPLICATE_MOVIE,
      payload: arr
    })
  }
}
 export const GET_FAVORITE_MOVIE_ID_FROM_DETAILLS_PAGE = 'GET_FAVORITE_MOVIE_ID_FROM_DETAILLS_PAGE'
 export const getFavoriteMovieIdFromDetailsPage = (obj)=>{
    console.log(obj)
    return dispatch =>{dispatch({
      type:GET_FAVORITE_MOVIE_ID_FROM_DETAILLS_PAGE,
      payload:obj
    })
  }
  }