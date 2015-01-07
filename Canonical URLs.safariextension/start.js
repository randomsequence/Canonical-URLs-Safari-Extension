//  Copyright (c) 2014 Johnnie Walker
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var url = document.location.href;
var cannonicalURL = null;

var redirectFunction = function regexRedirect (matchPattern, replacePattern) {
  return function (url) {
    var cannonicalURL = null;
    var regex = new RegExp(matchPattern, "g");
    var matches = regex.exec(url);
    if (null !== matches) {
      cannonicalURL = url.replace(regex, replacePattern);
    }  
    return cannonicalURL;
  }
}

var cannonicalEbay = redirectFunction("www\.ebay\.(co\.uk|com)\/itm/[0-9a-zA-Z-]+/([0-9]{12,})\?.*", "www.ebay.$1/itm/$2");

var cannonicalAmazon = redirectFunction("www\.amazon\.(co\.uk|com)\/[0-9a-zA-Z-]+/dp/([0-9A-Z]{10,})\?.*", "www.amazon.$1/dp/$2");

var redirects = [cannonicalEbay, cannonicalAmazon];

while (redirects.length > 0 && cannonicalURL == null) {
	cannonicalURL = redirects.pop()(url);;
}

if (null != cannonicalURL) {
  window.location = cannonicalURL;
}
