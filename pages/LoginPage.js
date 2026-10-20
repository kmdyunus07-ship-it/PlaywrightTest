
export class LoginPage {
  constructor(page) {
    this.page = page;

    this.loginLink = page.locator('#login2');
    this.username = page.locator('#loginusername');
    this.password = page.locator('#loginpassword');
    this.loginButton = page.locator(
      "//button[normalize-space()='Log in']"
    );
  }

  async open() {
    await this.page.goto(
      'https://demoblaze.com/index.html'
    );
  }

  async login(username, password) {
    await this.loginLink.click();
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
