const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      "id", 
      "category_name"
    ],
    // include its associated Products
    include: [
      {
        model: Product,
        attributes: ["category_id"]
      }
    ]
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id 
    },
    attributes: [
      "id", 
      "category_name"
    ],
    // include its associated Products
    include: [
      {
        model: Product,
        attributes: ["category_id"]
      }
    ]
  })
    .then(dbData => {
      if(!dbData) {
        res.status(400).json({ message: "No category found with this id" }); 
        return;
      }
      res.json(dbData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id 
      }
    }
  )
    .then(dbData => {
      if(!dbData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dbData => {
      if(!dbData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbData);
    }))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
