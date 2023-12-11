import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import mainReducer from "./reducers/mainReducer";
import thunk from "redux-thunk";
import {actionLogIn} from './actions/authActions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //composeEnhancers улучшает расширитель enhancer

const enhancer = composeEnhancers(applyMiddleware(thunk)); // applyMiddleware улучшает createStore переданным мидлваром(thunk):

const store = createStore(mainReducer, enhancer); //первый параметр это combineReducers(в него мы "подключаем" все reducers),вторым параметром идет расширитель store (для того что бы дать store дополнительные возможности, такие как applyMiddleware)


if(localStorage.authTocken){//используем для того чтобы перейти на основную страницу (треки) с поля регистрация
    store.dispatch(actionLogIn(localStorage.authTocken))
}
store.subscribe(()=>console.log(store.getState()));

export default store;
