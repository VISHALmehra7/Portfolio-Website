import {createSlice} from '@reduxjs/toolkit'
// name
//initialState
//reducers

const initialState = {
    projects :[],
    selectedProject:null

}
const projectSlice = createSlice({
    name:"projectSlice",
    initialState,
    reducers:{
        
        setProjects(state,action){
            state.projects=action.payload
        },
        addProject(state,action){
            state.projects.push(action.payload)
        },
        selectProject(state,action){
            state.selectedProject = action.payload
        },
        clearSelectedProject(state,action){
            state.selectedProject =null
        },
    
    }
    

})

export const {setProjects,addProject,selectProject,clearSelectedProject} = projectSlice.actions
export default projectSlice.reducer