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
