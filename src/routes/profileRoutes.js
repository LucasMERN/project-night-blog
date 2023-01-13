const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require('../controllers/profileController');


router.get('/myprofile/:id', profileController.getProfile);
router.get('/followers/:id', profileController.getFollowers)
router.get('/following/:id', profileController.getFollowing)
router.get('/bookmarks/:id', profileController.getProfileBookmarks);
router.get('/notifications/:id', profileController.getNotifications);
router.put('/:id/updateBio', profileController.updateBio);
router.put('/:id/follow', profileController.followUser);
router.put('/:id/unfollow', profileController.unfollowUser);
router.put('/updateprofileimage/:id', upload.single("image"), profileController.updateProfilePic);



module.exports = router
