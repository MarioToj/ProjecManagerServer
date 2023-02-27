import mongoose from "mongoose";



const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        require: true
    }
},
{
    timestamps: true
})

export default mongoose.model('Task', taskSchema)