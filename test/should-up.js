const expect = require('expect.js');
const shouldUp = require('../src');

describe('should-up', () => {
  it('removes the "should" prefix', () => {
    const input = `
      it('should clear the cache', function () {
        expect(cache.empty).to.be(true);
      })
    `;

    const expected = `
      it('clears the cache', function () {
        expect(cache.empty).to.be(true);
      })
    `;

    expect(shouldUp(input)).to.be(expected);
  });

  // In this example "should download" would match the "should do" replacement
  // unless the regex ignores non-word boundary matches. This is important,
  // since if this wasn't handled correctly it'd get replaced with something
  // like "it('doeswnload the file')" and that would be very bad.
  it('ignores matches that are not on word boundaries', () => {
    const input = `
      it('should download the file', function () {
        expect(download.complete).to.be(true);
      });

      it('should do another thing', function () {
        expect(download.complete).to.be(true);
      });
    `;

    const expected = `
      it('should download the file', function () {
        expect(download.complete).to.be(true);
      });

      it('does another thing', function () {
        expect(download.complete).to.be(true);
      });
    `;

    expect(shouldUp(input)).to.be(expected);
  });
});
