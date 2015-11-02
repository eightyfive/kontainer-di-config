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
  "env": "prod", /* [1] */
  "isDev": false, /* [2] */
  "roles": ["admin", "user"], /* [3] */
  "knex.config": {"client": "pg", ... }, /* [4] */
  
  "config.path": "./config/prod.json", /* [5] */
  "config": "(./config/prod.json)", /* [6] */

  "knex": ["(knex)", "knex.config"], /* [7] */
  "bookshelf": ["(bookshelf)", "knex"],

  "user.model": ["(./models/user)", "bookshelf", "dep2", "dep3", ...], /* [8] */
  "user.service": ["(./services/user)", "user.model"],
  ...
}
```

1- You can register a `string` directly from the config
2- Or a `boolean`...
3- Or an `Array`.
4- And of course an `object`!
5- Here, this won't load/require the `json` file
6- Here yes! (because it's wrapped between paranthesis, this is the way to `require` something)
7- You can even `require` Node modules, as long as they follow the factory pattern (or don't have any dependency)
8- Etc...

### Example

```js
var getKontainer = require('kontainer-di-config');
var config = require('./config/di.json');

var di = getKontainer(config, __dirname);
var userService;

userService = di.get('user.service');
userService.findAll().then( ... );

// ...
```

See the [example](https://github.com/eightyfive/kontainer-di-config/tree/master/example) folder for a more complete example.

### `dirname` option (required)

All "requirable" relative paths (between paranthesis) given in config, are resolved from the `dirname` option. Meaning you may need to adjust the `dirname` option regarding from where you want to declare you dependencies in the config file/object:

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
