export default {
  'User Logs in': (client) => {
    client
    .url('https://mail.google.com/mail/u/0/#inbox')
    .waitForElementVisible('body', 1000)
    .assert.title('Gmail')
    .assert.visible('input[id=Email]')
    .setValue('input[id=Email]', '')
    .waitForElementVisible('input[name=signIn]', 1000)
    .click('input[name=signIn]')
    .waitForElementVisible('input[name=Passwd]', 1000)
    .setValue('input[id=Passwd]', '')
    .waitForElementVisible('input[id=signIn]', 1000)
    .click('input[id=signIn]')
    .waitForElementVisible('#sidebar', 3000)
    .assert.containsText('#basia', 'Basiunia')
    .assert.visible('#sidebar')
    .saveScreenshot('./screen_.png')
    .pause(2000)
    .end();
  }
};
