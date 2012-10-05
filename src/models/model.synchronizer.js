/**
 * TODO: The fact model sits in folder called views is somewhat mileading... Needs to be refactored.
 */

/**
 * Class that puts data from composer to corresponding "model". Based on synchronizer.js
 * 
 */
(function(wysihtml5) {
  var INTERVAL = 400;
  
  wysihtml5.models.ModelSynchronizer = Base.extend(
    /** @scope wysihtml5.views.Synchronizer.prototype */ {

    constructor: function(editor, model, composer) {
      this.editor   = editor;
      this.model = model;
      this.composer = composer;

      this._observe();
    },

    /**
     * Sync html from composer to model body field
     * TODO: this should be puting data not just into body field 
     * 
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the textarea
     */
    fromComposerToModel: function(shouldParseHtml) {
      this.model.setFieldValue("body", wysihtml5.lang.string(this.composer.getValue()).trim(), shouldParseHtml);
    },

    /**
     * Sync value of model to composer
     * TODO: this should be building contents of composer from all fields in the model
     * 
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the composer
     */
    fromModelToComposer: function(shouldParseHtml) {
      var bodyValue = this.model.getFieldValue("body");
      if (bodyValue) {
        this.composer.setValue(bodyValue, shouldParseHtml);
      } else {
        this.composer.clear();
        this.editor.fire("set_placeholder");
      }
    },

    /**
     * Invoke syncing based on view state
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the composer/textarea
     */
    sync: function(shouldParseHtml) {
      this.fromComposerToModel(shouldParseHtml);
    },

    /**
     * Initializes interval-based syncing
     * also makes sure that on-submit the composer's content is synced with the textarea
     * immediately when the form gets submitted
     */
    _observe: function() {
      var interval,
          that          = this,
          startInterval = function() {
            interval = setInterval(function() { that.fromComposerToModel(); }, INTERVAL);
          },
          stopInterval  = function() {
            clearInterval(interval);
            interval = null;
          };

      startInterval();

      this.editor.observe("destroy:composer", stopInterval);
    }
  });
})(wysihtml5);
