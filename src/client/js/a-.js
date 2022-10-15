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
        self.userEmail = email;
        self.validateEmail();
      })
      .getUserEmail();
  },
  validateEmail() {
    const emailPattern = /^[a-z0-9._]+@brandcolombia\.co$/;
    this.userEmailIsOk = this.userEmail.match(emailPattern);
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