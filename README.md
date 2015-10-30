# kontainer-di-config
Setup [kontainer-di](https://github.com/redradix/kontainer) through configuration

## Installation

```js
$ npm install kontainer-di-config --save
```

## Usage

```js
var di = require('kontainer-di-config')(diConfig, __dirname);
```

### Sample config

```json
{
  "knexConfig": {"./config/knex.json":   []},
  "knex":       {"./services/knex":      ["knexConfig"]},
  "bookshelf":  {"./services/bookshelf": ["knex"]},

  "user.model":       {"./models/user":       ["bookshelf"]},
  "user.collection":  {"./models/users":      ["bookshelf", "m.user"]},
  "user.service":     {"./services/user":     ["m.user", "m.users"]}

  ...
}
```

### Example

```js
var path = require('path');
var getContainer = require('kontainer-di-config');
var config = require('./config/di.json');

var di = getContainer(config, __dirname);
```

See the [example]() folder for a more complete example.

### `dirname` option (required)

All relative paths are resolved from the `dirname` option. Meaning you may need to adjust the `dirname` option regarding from where you want to declare you dependencies in the config file/object:

```js
var di = getContainer({ ... }, path.resolve(__dirname, 'src'));
```

You can also browse the source code to get a better idea of this.

## Todo

- Allow to declare json objects directly in di json config
- Allow to type only a string when no dependencies
