module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true,
        "browser" :true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
};
