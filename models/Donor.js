var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Donor Model
 * ==========
 */
var Donor = new keystone.List('Donor');

Donor.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Donor.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Donor.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Donor.defaultColumns = 'name, email, isAdmin';
Donor.register();
