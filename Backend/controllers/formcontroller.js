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
       res.json(user);//for testing an api in postman
     
      // res.render('createuser');//frontend part
    })
    .catch((err) => {
      console.log('Error occurred while fetching hotels:', err);
    });
};

exports.getuserbyid= async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Form.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateuserbyid = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const result = await Form.updateById(userId, updates);
    res.json({ success: true, message: 'User updated successfully', result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
