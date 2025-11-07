const Form = require('../models/formmodel');

exports.postform = (req, res) => {
  try {
    const { fullName, email, password, role, phone, address } = req.body;
    const user = new Form(fullName, email, password, role, phone, address);
user.save().then((result) => {
        res.json({
          success: true,
          message: 'User created',
          id: result.insertedId,
        });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err.message });
      });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


exports.getform = (req, res) => {
  Form.fetchAll()
    .then(user => {
       res.json("success",user);//for testing an api in postman
     
      //res.render('success');//frontend part
    })
    .catch((err) => {
      console.log('Error occurred while fetching hotels:', err);
    });
};