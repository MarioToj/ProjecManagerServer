import Project from "../models/Project.js"
import Task from "../models/Task.js"


export const  resolvers = {
    Query: {
        hello: () => 'Hola mundo',

        task: async (_, { _id }) => await Task.findById(_id),
        project: async (_, { _id }) => await Project.findById(_id),

        projects: async () => {
            const projectList = await Project.find()

            return projectList
        },

        tasks: async () => {
            const tasksList = await Task.find()

            return tasksList
        },

    },

    Mutation: {
        createProject: async (_, { name, description }) => {
            const project = new Project({ name, description })

            const savedProject = await project.save()
            return savedProject
        },

        createTask: async (_, { title, projectId}) => {
            const projectFound = await Project.findById(projectId)
            if( !projectFound ) throw new Error('Project not Found')

            const task = new Task({ title, projectId })

            const savedTask = await task.save()
            return savedTask
        },

        deleteProject: async (_, { _id }) => { 
            const projectDeleted = await Project.findByIdAndDelete(_id)
            if (!projectDeleted) throw new Error('El proyecto a eliminar no existe')

            await Task.deleteMany({ projectId: projectDeleted._id })

            return projectDeleted
        },
        deleteTask: async (_, { _id }) => { 
            const taskDeleted = await Task.findByIdAndDelete(_id)
            if (!taskDeleted) throw new Error('La tarea a eliminar no existe')
            return taskDeleted
        },

        updateProject: async (_, args) => { 
            const updatedProject = await Project.findByIdAndUpdate(args._id, args, {
                new: true
            })
            if (!updatedProject) throw new Error('El proyecto a actualizar no existe')
            return updatedProject
        },

        updateTask: async (_, args) => { 
            const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
                new: true
            })
            if (!updatedTask) throw new Error('La tarea a actualizar no existe')
            return updatedTask
        },
    },
    Project: {
    tasks: async (parent) => {
    return  await Task.find({projectId: parent._id})
         
    }
    },

    Task: {
        project: async (parent) => {
            return await Project.findById(parent.projectId)
        }
    }
}