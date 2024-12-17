const { createContext, useReducer } = require("react")
const { default: axiosInstance } = require("../utils/axiosConfig")
export const AppContext = createContext()

const Context  = ({children}) => {
    const initialState = {
        registerUser : {},
        errorState : {},
        userProfile : {},
        addPatient : {},
    }
    const reducer = (state, data) => {
        return {...state, [data?.type] : data?.payload}
    }
    const [state, dispatch] = useReducer(reducer, initialState,)
    const apiPostCall = async (route, state, data) => {
        try{
            const config = {
                url : route,
                data : data,
                method:"POST"
            }
            const apiRes = await axiosInstance(config)
            console.log(apiRes.data)
            if(apiRes.data.code === 200){
                if(apiRes?.data?.msg){
                    alert(apiRes?.data?.msg)

                }
                dispatch({type : state, payload : apiRes.data})
                console.log(apiRes.data,"//////// data")
                return apiRes.data
            }else{
                dispatch({type: "errorState", payload : apiRes.data})
                alert(apiRes.data.msg)
                return apiRes.data
            }

        }catch(error){
            dispatch({type: "errorState", payload : {code : 500, msg : "Internal Server Error"}})
            alert(error.message)
        }

    }
    const apiGetCall = async (route, state) => {
        try{
            const config = {
                url : route,
                method:"GET"
            }
            const apiRes = await axiosInstance(config)
            console.log(apiRes.data)
            if(apiRes.data.code === 200){
                if(apiRes?.data?.msg){
                    alert(apiRes?.data?.msg)

                }
                dispatch({type : state, payload : apiRes.data})
                return apiRes.data
            }else{
                dispatch({type: "errorState", payload : apiRes.data})
                alert(apiRes.data.msg)
                return apiRes.data
            }

        }catch(error){
            dispatch({type: "errorState", payload : {code : 500, msg : "Internal Server Error"}})
            alert(error.message)
        }

    }
    return (
        <AppContext.Provider  value={{
state, dispatch,apiPostCall,apiGetCall
        }
        }>
            {children}
        </AppContext.Provider>
    )
}

export default Context