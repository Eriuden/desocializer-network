const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

//Message au Eriu du futur, tu est allé de bas en haut pour tes commentaires

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data:" + err);
  }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file != null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("taille maximale dépassée");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }

  //on doit créer un objet, donc forcément, on reprend le model et on entre les clés et valeurs
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file != null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  //si ca marche, on sauvegarde le nouveau post et on renvoie un status 201 en json

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  //On lui précide de poser, par updatedRecord, la valeur du message ainsi modifiée
  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("update errors:" + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  //on a direct une fonction pour ça, juste donc à préciser que si il n'y a pas d'erreur, la fonction opère normalement
  //donc on envoie le résultat prenant en réponse le paramètres "de réussite" docs

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("delete error:" + err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      //on ajoute à l'objet post un like
      //il va répertorier le like par l'id du liker
      //puis nous renvoyer le post avec les nouvelles infos
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      //cette fois, c'est pour ajouter à l'user les likes qu'il a placé
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { news: true },
      (err, docs) => {
        if (!err) res.send(docs);
        return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  //ici, on va retirer l'id du liker puis renvoyer le post, "purgé" du like
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      //là, c'est pour dire que le liker ne like plus ( dhat franglais)

      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { news: true },
      (err, docs) => {
        if (!err) res.send(docs);
        return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  //Diff fonctions findbyid et findbyidupdate, bah c'est simple, c'est findOneAndUpdate, mais qui find par l'id la deuxième
  //comme d'hab, findby et comme c'est avec l'id, on la requiert après
  //on veut insérer dans l'objet, ici Post, un commentaire, comme défini dans le modèle
  //mais comme l'élément comment est un array, il faut push, pour insérer une valeur dans un tableau
  //du coup, on reproduit l'architecture de ce dernier dans le model, en précisant ce que l'on veut écrire
  //bah du coup, il récupère ce qu'il il y a dans le body du commentaire, pour chaque élément
  //C'est pourquoi Postman va pas être d'accord si on met pas "clé":"valeur", à chaque fois, il veut tout !
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  //comme d'hab, on cherche en requierant l'id (on update pas ici)
  //on fabrique une const comment pour pointer dans l'objet post le comment
  //on précise que l'id du comment doit être égale à celle du commentaire dans l'objet

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      //si l'id commentaire est introuvable

      if (!theComment) return res.status(404).send("commentaire introuvable");

      //sinon on modifie le texte selon les nouvelles entrées
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    //on appelle une fonction qui cherche par id
    //on requiert donc forcément l'id
    //on emploi la fonction $pull, qui retire un élément d'un tableau
    //on lui précise l'objet JSON comment
    //on lui indique la clé et la valeur de l'objet à supprimer
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      //new est une option de requète qui renvoie l'objet après requète
      //si pas d'erreur, on renvoie l'objet
      //sinon on dit ce qui ne va pas
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};
