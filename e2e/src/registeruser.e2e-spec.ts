import { ElementFinder, browser, by, element, protractor } from 'protractor';
describe('/#/register', () => {
    beforeEach(() => {
      browser.get('/#/register')
    })
    describe('challenge "registerAdmin"', () => {
        it('should be possible to register admin user using REST API', () => {
          browser.executeScript(() => {
            var xhttp = new XMLHttpRequest()
            xhttp.onreadystatechange = function () {
              if (this.status === 201) {
                console.log('Success')
              }
            }
    
            xhttp.open('POST', 'http://localhost:3000/api/Users/', true)
            xhttp.setRequestHeader('Content-type', 'application/json')
            xhttp.send(JSON.stringify({ email: 'testing@test.com', password: 'pwned', passwordRepeat: 'pwned', role: 'admin' }))
          })
        })
    
       
      })
    
      describe('challenge "passwordRepeat"', () => {
        it('should be possible to register user without repeating the password', () => {
          browser.executeScript(() => {
            var xhttp = new XMLHttpRequest()
            xhttp.onreadystatechange = function () {
              if (this.status === 201) {
                console.log('Success')
              }
            }
    
            xhttp.open('POST', 'http://localhost:3000/api/Users/', true)
            xhttp.setRequestHeader('Content-type', 'application/json')
            xhttp.send(JSON.stringify({ email: 'uncle@bob.com', password: 'ThereCanBeOnlyOne' }))
          })
        })
        
        describe('/#/privacy-security/privacy-policy', () => {
          describe('challenge "privacyPolicy"', () => {
            it('should be possible to access privacy policy', () => {
              browser.get('/#/privacy-security/privacy-policy')
              expect(browser.getCurrentUrl()).toMatch(/\/privacy-policy/)
            })
        
           
          })
        })
        
        
      })
    })  