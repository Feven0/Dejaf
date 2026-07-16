const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    orgName: { type: String, default: 'DEJAF Training and Consultancy' },
    tagline: { type: String, default: 'Your Capability Building Partner' },
    heroText: { type: String, default: '' },
    aboutText: { type: String, default: '' },
    foundingText: { type: String, default: '' },
    whoWeAreText: { type: String, default: '' },
    whatWeDoText: { type: String, default: '' },
    howWeWorkText: { type: String, default: '' },
    missionText: { type: String, default: '' },
    visionText: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    hours: { type: String, default: '' },
    facebookUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    telegramUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

// Singleton accessor: always returns (and lazily creates) the one settings document.
siteSettingsSchema.statics.getSingleton = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create({});
  }
  return doc;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
