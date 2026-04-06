const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "KFC",
      cuisine: "Fast Food",
      rating: 4.3,
      image:
        ",size=10x10&q=kfc+logo+images+bootstrap&adlt=strict&FORM=IRPRST&ck=67B314AEE5FB6E300F621522AEEAF5A8&selectedIndex=0&qpvt=kfc+logo+images+bootstrap",
    },
    {
      id: 2,
      name: "Dominos",
      cuisine: "Pizza",
      rating: 4.5,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.pBNLtPnGJL7Yp9iWCY3kDwHaEo?rs=1&pid=ImgDetMain&o=7&rm=3,size=10x10&q=dominos+logo+images+bootstrap&adlt=strict&FORM=IRPRST&ck=67B314AEE5FB6E300F621522AEEAF5A8&selectedIndex=0&qpvt=dominos+logo+images+bootstrap",
    },
    {
      id: 3,
      name: "Burger King",
      cuisine: "Burgers",
      rating: 4.2,
      image:
        "https://tse1.mm.bing.net/th/id/OIP.5XG6JZJZJZJZJZJZJZJZJZJZJZJZJZJZ&pid=ImgDetMain&o=7&rm=3,size=50x50&q=burger+king+logo+images+bootstrap&adlt=strict&FORM=IRPRST&ck=67B314AEE5FB6E300F621522AEEAF5A8&selectedIndex=0&qpvt=burger+king+logo+images+bootstrap",
    },
  ]);
});

module.exports = router;
