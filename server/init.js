Meteor.startup(function () {
  // init items collection
  if (Items.find().count() == 0) {
    Items.insert({name: 'Ref_bien_code_unique_par_client_en prefix_', uploads: []});
  }

  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      if (formData && formData.directoryName != null) {
        return formData.directoryName;
      }
      return "";
    },
    getFileName: function(fileInfo, formData) {
      if (formData && formData.prefix != null) {
        return formData.prefix + '_' + fileInfo.name;
      }
      return fileInfo.name;
    },
    finished: function(fileInfo, formData) {
      if (formData && formData._id != null) {
        Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
      }
    }
  });
});
