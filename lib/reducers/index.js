import { combineReducers } from 'redux'

function repos(state ={active:null,items:[],isFetching:false}, action) {
  switch (action.type) {
    case 'SET_ACTIVE':
      return Object.assign({}, state,{active:action.item});
    case 'REQUEST_REPOS':
      return Object.assign({}, state,{isFetching:true})
    case 'RECEIVE_REPOS':
      return Object.assign({}, state,{isFetching:false,items:action.items})
    default:
      return state
  }
}
function uploads(state = {}, action) {
  var file= {};
  switch (action.type) {
    case 'UPLOAD_START':
      file[action.name] = {size:action.size||0,progress:action.progress||0,active:action.active||false}
      return Object.assign({}, state,file)
    case 'UPLOAD_PROGRESS':
      file[action.name] = Object.assign({}, state[action.name],{progress:action.progress});
      return Object.assign({}, state,file)
    case 'UPLOAD_TOGGLE':
      file[action.name] = Object.assign({}, state[action.name],{active:!state[action.name].active});
      return Object.assign({}, state,file)
    case 'UPLOAD_REMOVE':
      Object.assign(file,state);
      delete file[action.name];
      return file;
    default:
      return state
  }
}
const rootReducer = combineReducers({
  repos, uploads
})

export default rootReducer
