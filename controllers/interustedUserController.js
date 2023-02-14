const InterustedUser = require("../models/InterustedUser");
const Property = require("../models/Property")

exports.messagefromIntrusredUser = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
          return res.status(400).json({
            success: false,
            message: `Property not found with id: ${req.params.id}`
          });
        }
        let intrustedUser = await InterustedUser.findOne({
            property: req.params.id,
            
        });
        if (!intrustedUser) {
            intrustedUser = new InterustedUser({
              property: req.params.id,
              name: req.body.name,
              email:req.body.email,
              phone:req.body.phone,
              message: req.body.message
            });
          } else {
            intrustedUser.name = req.body.name,
            intrustedUser.email = req.body.email,
            intrustedUser.phone = req.body.phone,
            intrustedUser.message = req.body.message
          }
          await intrustedUser.save();
          property.interustedUsers.push(intrustedUser._id);
          await property.save();
          res.status(200).json({
            success: true, 
            message: "Message sent Successfully"
          })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// exports.reciveMessageFromUser = async (req, res) => {
//     try {
//       const property = await Property.findById(req.params.id).populate({
//         path: 'intrustedUsers',
//         options: { strict: false }
//       });
//       if(!property){
//         return res.status(400).json({
//           success: false,
//           message: `Property not found with id: ${req.params.id}`
//         });
//       }
//       if(property.ownerId.toString() !== req.user._id.toString()){
//         return res.status(401).json({
//           success: false,
//           message: 'Unauthorized'
//         });
//       }
//       res.status(200).json({
//         success: true,
//         intrustedUsers: property.interustedUser
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message
//       });
//     }
//   };
