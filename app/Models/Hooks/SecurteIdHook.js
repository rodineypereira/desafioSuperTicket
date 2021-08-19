'use strict'

const SecurteIdHook = exports = module.exports = {}
const { v4: uuidv4 } = require('uuid');

SecurteIdHook.uuid = async (object) => {
    object.secure_id = uuidv4();
}
