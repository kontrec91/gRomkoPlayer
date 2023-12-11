import { combineReducers } from "redux";
import authReducer from "./authReducer"
import playerReducer from "./playerReducer"

// ДЗ:
// написать authReducer, который будет возвращать
// пустой объект {} или {data: {.....}, token: "ey...."}, в зависимости от action.
// Предусмотреть два action с типами LOGIN и LOGOUT.

// в action LOGIN, кроме типа должен быть ключ с токеном. Редьюсер должен раскодировать токен, положить результат в data, токен в token, сохранить token в localStorage. Для раскодирования поставьте jwt-decode (npm i jwt-decode)

// по action LOGOUT - стираем ключ из localStorage, возвращаем пустой объект

// напишите два actionCreator для этих действий.
// поэкспериментируйте с токенами, который вы получали от graphql

// в коде, ниже запуска createStore проверьте наличие токена в localStorage и при наличии задиспатчите actionLogin, для синхронизации localStorage и состояния redux в момент загрузки страницы. Так же вы можете сделать эту проверку внутри редьюсера при его первом запуске (со state === undefined)

// Сделайте компонент, который будет писать логин в заголовке сайта, или же писать anon если вы не залогинены. Используйте connect и mapStateToProps для получения логина из redux

// Сделайте кнопку -компонент`logout`, которая по нажатию запускает внешний колбэк, переданный пропсами. Используя connect и mapDispatchToProps научите её экшену LOGOUT

// Попробуйте сделать компонент логина, который:
// 1) отображает login и password
// 2) по кнопке делает query login
// 3) в then при получении токена запускает внешний колбэк, переданный пропсами.
// 4) используя connect и mapDispatchToProps подвяжите actionLogin к этому пропсу.

// const initialState = {
//     token: null,
//     userName: null,
//     id:null
//   };

//   export default function authReducer(state=initialState, action){
//       if (state === undefined) {
//         return Object.assign({}, state)
//       }
//       if (action.type === 'LOGIN') {
//         var decoded = jwt_decode(action.token)
//         localStorage.authToken = action.token
//         console.log(action.token,'++')
//         return Object.assign({}, state, {
//           'token': action.token,
//           'userName': decoded.sub.login,
//           'id': decoded.sub.id
//         })
//       }
//       // if ( action.type === 'FAILURE'){
//       //   return Object.assign({}, state, {
//       //     'token': null,
//       //     'userName': null,
//       //     'id': null,
//       //   })
//       // }
//       if (action.type === 'LOGOUT') {
//           localStorage.authToken = ''
//           return Object.assign({}, state, {
//             'token': null,
//             'userName': null,
//             'id': null,
//         })
//       }
//       return state



// store.dispatch(actionPending())
// p.then(data => store.dispatch(actionResolved(data)))

// const promiseReducer = (state, action) => {
//   if (state === undefined) {
//     return {};
//   }
//   if (action.type === "PROMISE") {
//     return {
//       ...state,
//       [action.name]: {
//         status: action.status,
//         payload: action.payload,
//         error: action.error,
//       },
//     };
//   }
// };

export default combineReducers({
  auth: authReducer,
  // promise: promiseReducer,
  player: playerReducer
});
