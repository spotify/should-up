// Copyright 2017 Spotify AB. All rights reserved.
//
// The contents of this file are licensed under the Apache License, Version 2.0
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

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
