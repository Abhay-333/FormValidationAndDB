const path=require('path')
const { ObjectId } = require('mongodb');
const mongodb = require('mongodb');

const {getdb}=require(path.join(__dirname,'../','utils','pathutils'));
module.exports=class Form{
 constructor(fullName, email, password, role, phone, address) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phone = phone;
    this.address = address;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

 validate() {
    const errors = [];

    if (!this.fullName || this.fullName.length < 3)
      errors.push('Full name must be at least 3 characters');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailPattern.test(this.email))
      errors.push('Invalid email format');

    if (!this.password || this.password.length < 6)
      errors.push('Password must be at least 6 characters long');

    if (!['Student', 'Teacher'].includes(this.role))
      errors.push('Role must be either Student or Teacher');

    if (!/^\d{10}$/.test(this.phone))
      errors.push('Phone number must be exactly 10 digits');

    if (this.address && this.address.length > 100)
      errors.push('Address cannot exceed 100 characters');

    return errors;
  }

 async save() {
    const db = getdb();
    const users = db.collection('users');
    const errors = this.validate();

    if (errors.length) {
      throw new Error(errors.join(', '));
    }

    // Check email uniqueness
    const existing = await users.findOne({ email: this.email });
    if (existing) {
      throw new Error('Email already exists');
    }

    const result = await users.insertOne(this);
    return result;
  }

  // ✅ Get all users
  static fetchAll() {
    const db = getdb();
    return db.collection('users').find().toArray();
  }

  // ✅ Find user by ID
  static findById(userId) {
    const db = getdb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
  static async updateById(userId, updates) {
    const db = getdb();
    const allowed = ['fullName', 'password', 'phone', 'address', 'role'];
    const isValid = Object.keys(updates).every((f) => allowed.includes(f));

    if (!isValid) throw new Error('Invalid fields in update');

    updates.updatedAt = new Date();

    const result = await db
      .collection('users')
      .updateOne({ _id: new ObjectId(userId) }, { $set: updates });

    if (result.matchedCount === 0) throw new Error('User not found');

    return result;
  }
};

