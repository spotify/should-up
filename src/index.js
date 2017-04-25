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

const replacements = require('./replacements');

function convert(input) {
  let output = input;

  output = output.replace(/^([ ]*it\(['"])(.*)$/gm, (match, it, description) => {

    Object.keys(replacements).forEach(from => {
      const to = replacements[from];
      from = new RegExp(`\\b${from}\\b`);
      description = description.replace(from, to);
    });

    return it + description;
  });


  return output;
}

module.exports = convert;
