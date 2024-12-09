const CustomError = require("../utils/customError");

module.exports.createProperty = async (req, res, next) => {
  const { title, descripton, location, price, amenities, images } = req.body;
  try {
    if (!title || !descripton || !location || !price || !amenities || !images) {
      next(new CustomError("all Field are required"));
    }

    const newProperty = new PropertyModel({
      title,
      descripton,
      location,
      price,
      amenities,
      images,
      host: req.user._id,
    });

    const savedproperty = newProperty.save();
    res
      .status(201)
      .json({ message: "Property created successfully", newProperty });
  } catch (error) {
    next(new CustomError("Error Creating Property",500));
  }
};



module.exports.updateProperty = async (req, res, next) => {
    const { id } = req.params;
    try {
     if(id){
        next(new CustomError("Property ID is required",400))
     }

     res.status(200).json({message:"Propertyupdate successfully",updateProperty })

     const updateProperty = await propertyModel.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true,
     })

     if(!updateProperty){
        next (new CustomError("Property not found",404))
     }
    } catch (error) {
      next(new CustomError("Error updating Property",500 ));
    }
  };
  