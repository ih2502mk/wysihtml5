/**
 * Model plugin
 * TODO: 
 */

wysihtml5.models.Model = Base.extend({
	constructor : function(mainFieldKey) {
		this.instance = {};
		this.mainFieldKey = mainFieldKey || "body";
	},

	setFieldValue : function (key, value) {
		this.instance[key] = value;
	},

	getFieldValue : function (key) {
		return Object.hasOwnproPerty.apply(this.instance, key) ? this.instance[key] : null;
	},

	setMainFieldValue : function(value) {
		this.setFieldValue(this.mainFieldKey, value);
	},

	getMainFieldValue : function() {
		return this.setFieldValue(this.mainFieldKey, value);
	}

});
