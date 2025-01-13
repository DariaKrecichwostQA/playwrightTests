class Config {
  get email() {
    if (!process.env.email) {
      throw new Error("Email not provided");
    }
    return process.env.email;
  }

  get password() {
    if (!process.env.password) {
      throw new Error("Password not provided");
    }
    return process.env.password;
  }

  get roomName() {
    if (!process.env.roomName) {
      throw new Error("Room name not provided");
    }
    return process.env.roomName;
  }
}

export const config = new Config();
