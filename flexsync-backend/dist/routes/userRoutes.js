"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const userValidation_1 = require("../middlewares/validation/userValidation");
const router = (0, express_1.Router)();
// Route d'inscription avec validation
router.post('/api/users/register', userValidation_1.validateRegister, authController_1.register);
// Route de connexion avec validation
router.post('/login', userValidation_1.validateLogin, authController_1.login);
exports.default = router;
