
import jsdom from 'jsdom';
import _$ from 'jquery'; // make use of this window here with _

// set up testing environment to run like browser in the command line

// create an HTML DOM object (fake browser) on the global object
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
// create a fake window object on the global object
global.window = global.document.defaultView;
// create our own instance of a jquery variable using our window
const $ = _$(global.window);

// build 'renderComponent'helper that should render a given eact class




