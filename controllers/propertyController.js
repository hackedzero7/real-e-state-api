const InterustedUser = require("../models/InterustedUser");
const Property = require("../models/Property");
const User = require("../models/User");
const ApiFeatures = require("../utils/apifeatures");

exports.createProperty = async (req, res) => {
  try {
    const {
      title,
      status,
      type,
      bedrooms,
      bathrooms,
      category,
      location,
      detailedInformation,
      contactInformation,
    } = req.body;
    //         let images = [];

    //   if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    //   } else {
    //     images = req.body.images;
    //   }

    //   const imagesLinks = [];

    //   for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //       folder: "property",
    //     });

    //     imagesLinks.push({
    //       public_id: result.public_id,
    //       url: result.secure_url,
    //     });
    //   }

    //   req.body.images = imagesLinks;
    const newProperty = await Property.create({
      title,
      status,
      type,
      bedrooms,
      bathrooms,
      category,
      location,
      detailedInformation,
      contactInformation,
      images: {
        public_id: "this is sample image",
        url: "this is sample url",
      },
      ownerId: req.user._id,
    });
    res.status(201).json({
      success: true,
      newProperty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**get admin all propertys */

exports.getAdminALLProperty = async (req, res) => {
  try {
    const property = await Property.find({});
    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**get all properties */

exports.getAllProperties = async (req, res) => {
  try {
    const resultPerPage = 8;
    const propertyCount = await Property.countDocuments();
    const apiFeature = new ApiFeatures(Property.find(), req.query).search();
    let property = apiFeature.query.clone();
    apiFeature.pagination(resultPerPage);
    property = await apiFeature.query;
    res.status(200).json({
      success: true,
      property,
      resultPerPage,
      propertyCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/** get properties details */

exports.getPropertyDetails = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(400).json({
        success: false,
        message: `Property not found with this id:${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/** user and admin update the properties */

exports.updateProperties = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(500).json({
        success: false,
        message: `Property not found with this id:${req.params.id}`,
      });
    }
    // Images Start Here
    //   let images = [];

    //   if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    //   } else {
    //     images = req.body.images;
    //   }

    //   if (images !== undefined) {
    //     // Deleting Images From Cloudinary
    //     for (let i = 0; i < property.images.length; i++) {
    //       await cloudinary.v2.uploader.destroy(property.images[i].public_id);
    //     }

    //     const imagesLinks = [];

    //     for (let i = 0; i < images.length; i++) {
    //       const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: "property",
    //       });

    //       imagesLinks.push({
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //       });
    //     }

    //     req.body.images = imagesLinks;
    //   }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Property Updated Sucessfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/** admin or user delete the properties */
exports.deleteProperty = async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        if(!property){
            return res.status(400).json({
                success: false,
                message: "Property not found"
            })
        }
              // Deleting Images From Cloudinary
//   for (let i = 0; i < property.images.length; i++) {
//     await cloudinary.v2.uploader.destroy(property.images[i].public_id);
//   }
        await property.remove();
        res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

/**how many users click on property details */

exports.incrementVeiws = async(req, res) => {
    try {
        let property = await Property.findByIdAndUpdate(req.params.id,{ $inc: { views: 1 }
        }, { new: true });
        if(!property){
            return res.status(404).json({
                success: false,
                message: "Property not found"
            })
        }
        res.status(200).json({
            success: true,
            message: 'Views incremented', views: property.views
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**Add to favraites */

exports.addToFavraite = async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        if(!property){
            return res.status(404).json({
                success: false,
                message: `Property not found with this id:${req.params.id}`
            })
        }
        let user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: `User not found with this id:${req.user._id}`
            })
        }
        if(!user.favorites.includes(property._id)){
            user.favorites.push(property._id)
            await user.save();
        }
        res.status(200).json({
            success: true,
            message: "Property added to favorites",
            
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**Remove to favorites */

exports.removeToFavorites = async (req, res) => {
    try{
        let property = await Property.findById(req.params.id);
        if(!property){
            return res.status(404).json({
                success: false,
                message: `Property not found with this id:${req.params.id}`
            })
        }
        let user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: `User not found with this id:${req.user._id}`
            })
        }
        if (user.favorites.includes(property._id)) {
            user.favorites = user.favorites.filter(fav => fav.toString() !== property._id.toString());
            await user.save();
          }
          res.status(200).json({
            success: true,
            message: "Property remove to favorites"
          })
    }catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**Intrusted Users */
// exports.reciveMessageFromUser = async (req, res) => {
//   try {
//     let intrusteduser = await InterustedUser.find();
//     if(!intrusteduser){
//       return res.status(400).json({
//         success: false,
//         message:`Intrusted user not found with this id:${req.params.id}`
//       })
//     }
//     res.status(200).json({
//       success:true,
//       intrusteduser
//     })

//   } catch (error) {
//       res.status(500).json({
//           success: false,
//           message: error.message
//       })
//   }
// }

  // if(property.ownerId.toString() !== req.user._id.toString()){
      //     return res.status(401).json({
      //         success: false,
      //         message: 'Unautherize'
      //     })
      // }

      
      
      // const users = await User.find({ _id: { $in: property.interustedUser } });

      // const userContacts = users.map((user) => {
      //   return {
      //     name: user.name,
      //     email: user.email,
      //     phone: user.phone,
      //     message: user.message
      //   };
      // });

      // res.status(200).json({
      //     success: true,
      //     // userContacts
      // })


      exports.reciveMessageFromUser = async (req, res) => {
        try {
          const property = await Property.findById(req.params.id).populate({
            path: 'interustedUsers',
            options: { strict: false }
          });
          if(!property){
            return res.status(400).json({
              success: false,
              message: `Property not found with id: ${req.params.id}`
            });
          }
          if(property.ownerId.toString() !== req.user._id.toString()){
            return res.status(401).json({
              success: false,
              message: 'Unauthorized'
            });
          }
          res.status(200).json({
            success: true,
            interustedUsers: property.interustedUsers
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message
          });
        }
      };
      