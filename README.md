# kontainer-di-config
Setup [kontainer-di](https://github.com/redradix/kontainer) through configuration

## Installation

```js
$ npm install kontainer-di-config --save
```

## Usage

```js
var di = require('kontainer-di-config')(diConfig, dirname);
```

### Sample config

```json
{
  "knex.config": {"./config/knex.json":   []},
  "knex":        {"./services/knex":      ["knex.config"]},
  "bookshelf":   {"./services/bookshelf": ["knex"]},

  "user.model":      {"./models/user":   ["bookshelf"]},
  "user.collection": {"./models/users":  ["bookshelf", "user.model"]},
  "user.service":    {"./services/user": ["user.model", "user.collection"]}
}
```

### Example

```js
var getContainer = require('kontainer-di-config');
var config = require('./config/di.json');

var di = getContainer(config, __dirname);
var userService;

userService = di.get('user.service');
userService.findAll().then( ... );

// ...
```

See the [example](https://github.com/eightyfive/kontainer-di-config/tree/master/example) folder for a more complete example.

### `dirname` option (required)

All relative paths given in config, are resolved from the `dirname` option. Meaning you may need to adjust the `dirname` option regarding from where you want to declare you dependencies in the config file/object:

```js
var config = {
  "user": {"./src/models/user": ["bookshelf"]}
};
var di = getContainer(config, __dirname);

// -- OR --

var config = {
  "user": {"./models/user": ["bookshelf"]}
};
var di = getContainer(config, path.resolve(__dirname, 'src'));
```

You can also browse the [source code](https://github.com/eightyfive/kontainer-di-config/blob/master/index.js) to get a better idea of this.

## Todo

- Allow to declare json objects directly in di json config
- Allow to type only a string when no dependencies
