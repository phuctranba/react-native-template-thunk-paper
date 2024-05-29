module.exports = {
  commands: [
    {
      name: "generate-logo <logoPath>",
      description:
        "Generate a logo using an original logo file (PNG or SVG)",
      options: [],
      func: (
        [logoPath],
        { project: { android, ios } },
        { },
      ) => {
        const path = require("path");
        const { generate } = require("./scripts/generate");

        const workingPath =
          process.env.INIT_CWD || process.env.PWD || process.cwd();

        return generate({
          android,
          ios,
          workingPath,
          logoPath: path.resolve(workingPath, logoPath),
        }).catch((error) => {
          console.error(error);
        });
      },
    },
    {
      name: "rename <name>",
      description:
        "Rename Project to <name>",
      options: [],
      func: ([name]) => {
        const { rename } = require("./scripts/rename");
        return rename({
          name,
        }).catch((error) => {
          console.error(error);
        });
      },
    },
  ],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    }
  },
};

