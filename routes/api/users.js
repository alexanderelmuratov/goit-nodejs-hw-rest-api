const express = require("express");

const { auth, upload, validation, ctrlWrapper } = require("../../middlewares");
const {
  verificationJoiSchema,
  subscriptionJoiSchema,
} = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(verificationJoiSchema),
  ctrlWrapper(ctrl.resendVerification)
);

router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
