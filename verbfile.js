var verb = require('verb');

verb.data({nickname: 'apidocs'});

/**
 * This helper is already included in verb,
 * it's used here for example purposes.
 */

verb.task('default', function () {
  verb.src('.verb.md')
    .pipe(verb.dest('.'));
});
