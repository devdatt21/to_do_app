const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    completed : {
        type : Boolean,
        default : false,
    },
    priority : {
        type : String,
        enum:["low", "high"],
        default : "low",
    },
    dueDate: { 
        type: Date 
    },
}, {timestamps:true});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;