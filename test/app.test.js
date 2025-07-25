const { Application } = require('spectron');
const path = require('path');
const electronPath = require('electron');

describe('Application launch', function testApplicationLaunch() {
  this.timeout(10000);
  let app;

  beforeEach(function beforeEachHook() {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', 'app')]
    });
    return app.start();
  });

  afterEach(function afterEachHook() {
    if (app && app.isRunning()) {
      return app.stop();
    }
    return undefined;
  });

  it('shows the main window', async function testMainWindow() {
    await app.client.waitUntilWindowLoaded();
    const count = await app.client.getWindowCount();
    expect(count).toBe(1);
  });

  it('renders the app content', async function testAppContent() {
    await app.client.waitUntilWindowLoaded();
    const element = await app.client.$('#root');
    const exists = await element.isExisting();
    expect(exists).toBe(true);
  });
});
