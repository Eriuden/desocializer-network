const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();

router.get("/", postController.readPost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

//Commentaires

/*Le cas de patch est assez particulier, ca permet de ne modifier qu'un champ de l'objet, par exemple ici
les commentaires restent un seul champ (bien que sous forme d'array contenant plusieurs valeurs)
en somme, pour le CRUD de ce genre d'objets dans l'objet, patch est bien plus conseillé*/

router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
