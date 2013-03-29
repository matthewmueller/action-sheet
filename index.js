/**
 * Module dependencies
 */

var domify = require('domify'),
    event = require('event'),
    classes = require('classes'),
    html = require('./template');

/**
 * Button functions
 */

var buttons = {};

/**
 * Button template
 */

var buttonTemplate = domify('<li class="button"></li>')[0];

/**
 * Export `ActionSheet`
 */

module.exports = ActionSheet;

/**
 * Initialize `ActionSheet`
 */

function ActionSheet(title) {
  if (!(this instanceof ActionSheet)) return new ActionSheet(title);
  var el = this.el = domify(html)[0];
  this.inner = el.getElementsByTagName('div')[0];
  this.list = el.getElementsByTagName('ul')[0];
  el.getElementsByTagName('p')[0].innerHTML = title;
  document.body.appendChild(this.el);
}

/**
 * Add a button
 *
 * @param {String} title
 * @param {Function} fn
 * @return {ActionSheet}
 * @api public
 */

ActionSheet.prototype.button = function(title, fn) {
  var button = buttonTemplate.cloneNode(true);
  button.innerHTML = title;
  this.list.appendChild(button);
  if (fn) event.bind(button, 'click', fn);
  buttons[title] = [button, fn];
  return this;
};

/**
 * Cancel button
 *
 * @param {String} title
 * @param {Function} fn
 * @return {ActionSheet}
 * @api public
 */

ActionSheet.prototype.cancel = function(title, fn) {
  var self = this,
      button = buttonTemplate.cloneNode(true);

  classes(button).add('cancel');
  button.innerHTML = title;
  this.list.appendChild(button);

  event.bind(button, 'click', cancel);
  buttons[title] = [button, cancel];

  function cancel() {
    if (fn) fn();
    self.hide();
  }

  return this;
};

/**
 * Show the action sheet
 *
 * @return {ActionSheet}
 * @api public
 */

ActionSheet.prototype.show = function() {
  var height = this.inner.offsetHeight;
  this.el.style.height = height + 'px';
  classes(this.el).add('show');
  return this;
};

/**
 * Hide the action sheet
 *
 * @return {ActionSheet}
 * @api public
 */

ActionSheet.prototype.hide = function() {
  this.el.style.height = 0;
  classes(this.el).remove('show');
  return this;
};

/**
 * Remove the action sheet
 *
 * @return {ActionSheet}
 * @api public
 */

ActionSheet.prototype.remove = function() {
  this.unbind();
  this.el.remove();
  return this;
}

/**
 * Unbind
 *
 * @return {ActionSheet}
 * @api private
 */

ActionSheet.prototype.unbind = function() {
  for(var title in buttons) {
    var button = buttons[title];
    event.unbind(button[0], 'click', button[1]);
  }

  return this;
}
