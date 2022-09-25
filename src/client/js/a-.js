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
  initializeApp() {
    this.fetchLoggedUserEmail();
  },
};