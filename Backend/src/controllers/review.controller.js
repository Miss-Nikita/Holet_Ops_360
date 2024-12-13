const propertyModel = require("../Models/property.model");
const CustomError = require("../utils/customError")
const reviewModel = require("../Models/review.model")

module.exports.addReview = async(req,res,next) =>{
    try {
        const {propertyId,rating,comment} = req.body;

        const property = await propertyModel.findById(propertyId);

        if(!property) return next(new CustomError("Property not found",404))

            const existingReview = await reviewModel.findOne({
                user:req.user._id,
                property:propertyId
            })
            if(existingReview) return res.status(400).json({error:"You have already reviewed this property"})

                const newReview = new reviewModel({
                    property:propertyId,
                    user:req._id,
                    rating,
                    comment
                })

                const savedReview = await newReview.save();

                res.status(201).json(savedReview);
    } catch (error) {
        next(new CustomError("Error adding review",500))
    }
}


// module.exports.updateReview = async(req,res,next) =>{
    
// }