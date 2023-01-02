const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/myprofile/:id', profileController.getProfile);
router.get('/bookmarks/:id', profileController.getProfileBookmarks);
router.get('/notifications', profileController.getNotifications);
router.put('/:id/updateBio', profileController.updateBio);
router.put('/:id/follow', profileController.followUser);
router.put('/:id/unfollow', profileController.unfollowUser);

module.exports = router