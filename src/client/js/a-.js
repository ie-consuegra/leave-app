const xData = {
  file: null,
  userEmail: '',
  userEmailIsOk: false,
  fetchLoggedUserEmail() {
    const self = this;
    google
      .script
      .run
      .withSuccessHandler((email) => {
        if (email.includes('@')) {
          self.userEmail = email;
          self.userEmailIsOk = true;
        } else {
          self.userEmailIsOk = false;
        }
      })
      .getUserEmail();
  },
  saveFile() {
    const { file } = this;
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const fileObj = {
          filename: file.name,
          mimeType: file.type,
          bytes: [...new Int8Array(event.target.result)],
        };

        google
          .script
          .run
          .withSuccessHandler()
          .uploadFile(fileObj);
      }
      fileReader.readAsArrayBuffer(file);
    }
  },
  submit() {
    const formElem = document.getElementById('permissionRequestForm');
    this.saveFile();
    google
      .script
      .run
      .withSuccessHandler(() => {
        console.log('Enviado');
      })
      .setNewPermissionRequest(formElem);
  },
  initializeApp() {
    this.fetchLoggedUserEmail();
  },
};