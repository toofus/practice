module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "requireConfigFile": false,
        "babelOptions": {
            "presets": ["@babel/preset-react"]
        }
    },
    "plugins": [
        "react",
        "@babel"
    ],
    "rules": {
        "semi": ["error", "always"],
        "eqeqeq": ["error", "smart"],
        "no-alert": "error",
        "no-await-in-loop": "error",
        "require-atomic-updates": "error",
        "no-console": "warn"
    }
};
