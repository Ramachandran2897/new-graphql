const {userLists, movieList, employeeList} = require('../fakeData');
const resolvers = {
    Query:{
        employees: ()=>{
            if(employeeList && employeeList.length>0){
                return {employees: employeeList}
            }
            return {message: "problem in server"}
        },
        users: (parent, arg, context, info)=> {
            console.log(context.req.headers)
            return userLists
        },
        user: (parent, {id})=> userLists.find((obj)=>obj.id == id)
    },
    user:{
        favouriteMovie: (parent)=>{
            //eg for parent 
           return movieList.filter((obj)=>parent.id === obj.userId)
        }
    },
    Mutation: {
        createUser: (parent, {data})=>{
            const {name, age} = data
            userLists.push({id: userLists[userLists.length-1].id+1, name, age})
            return userLists
        },
        updateUser: (parent, {data})=>{
            const {name, age, id} = data
            userLists.splice(id-1, 1, {id, name, age})
            return userLists
        },
        deleteUser: (parent, {id})=>{
            userLists.splice(id-1, 1)
            return userLists
        }
    },
    getEmployeesOrError:{
        //union. resolver and union using something called resolve type. use this function from apollo
        __resolveType(obj){
            if(obj.employees){
                // console.log(obj.employee)
                return "employeeData"
            }
                return "error"
        }
    }
}
module.exports = resolvers