const mongoose = require('mongoose');

// Schema matching Atlas keam_portal_db validator
const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId('000000000000000000000000')
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: function () {
        return this.title;
      }
    },
    isRead: {
      type: Boolean,
      default: false
    },
    badge: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: 'General'
    },
    isTicker: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: '#'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
