import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../app/components/App';

// Mock crontab module
jest.mock('crontab', () => ({
  load: jest.fn(callback => {
    // Simulate successful load with mock API
    const mockApi = {
      jobs: () => [],
      create: jest.fn(),
      remove: jest.fn(),
      save: jest.fn(cb => cb()),
      reset: jest.fn()
    };
    callback(null, mockApi);
  })
}));

// Mock message from antd
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should load crontab on mount', () => {
    // eslint-disable-next-line global-require
    const crontab = require('crontab');
    mount(<App />);
    expect(crontab.load).toHaveBeenCalled();
  });

  it('should show loading spinner initially', () => {
    const wrapper = shallow(<App />);
    const spinner = wrapper.find('Spin');
    expect(spinner.prop('spinning')).toBe(true);
  });

  it('should hide loading spinner after crontab loads', async () => {
    const wrapper = mount(<App />);

    // Wait for useEffect to complete
    await new Promise(resolve => {
      setTimeout(() => {
        wrapper.update();
        const spinner = wrapper.find('Spin');
        expect(spinner.prop('spinning')).toBe(false);
        resolve();
      }, 100);
    });
  });

  it('should render sidebar and placeholder when no job selected', async () => {
    const wrapper = mount(<App />);

    await new Promise(resolve => {
      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find('Sidebar').exists()).toBe(true);
        expect(wrapper.find('Placeholder').exists()).toBe(true);
        expect(wrapper.find('Editor').exists()).toBe(false);
        resolve();
      }, 100);
    });
  });
});
