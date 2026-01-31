import mongoose, { Types } from "mongoose";


export const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [2,"title must be at least 2 characters"],
    required:function(){
      return !this.images || images.length ===0
    }
  },
   images:[
    {
      publicID:String,
      secretURL:String
    }
   ],
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  likes:[{
    type: Types.ObjectId,
    required: true,
    ref: "User"
  }],
  isDeleted:{
    type:Boolean,
    default:false
  },
  deletedBy:{
    type:Types.ObjectId,
    ref:"User"
  },
  cloudPost:{
    type:String,
    unique:true,
    required:function(){
      return this.images.length?true:false
    }
  }
}
,{
  timestamps:true, toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

postSchema.virtual("comments",{
  ref:"Comment",
  localField:"_id",
  foreignField:"post"
})
export const postModel = mongoose.model("Post", postSchema);