const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  images: [
    {
      public_id: {
        type: String,
        
      },
      url: {
        type: String,
        
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  detailedInformation: {
    description: {
      type: String,
      required: true,
    },
    builtYears: {
      type: Number,
      required: true,
    },
    garage: {
      type: Boolean,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
    },
  },
  contactInformation: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", schema);
