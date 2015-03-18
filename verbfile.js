var verb = require('verb');

/**
 * This helper is already included in verb,
 * it's used here for example purposes.
 */

verb.asyncHelper('apidocs', require('./'));

verb.task('default', function () {
  verb.src('.verb.md')
    .pipe(verb.dest('.'));
});
