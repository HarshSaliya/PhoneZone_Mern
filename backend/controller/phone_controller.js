import Phone from "../models/phonemodel.js"

export const getPhone = async(req, res) => {// testing  1 f work
    try {
        const phone = await Phone.find();
        res.status(200).json(phone);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Failed to fetch phones", error: error.message });
    }
};


export const getPhoneById = async (req, res) => { 
    try {
      const phoneId = parseInt(req.params.id); 
      const phone = await Phone.findOne({ id: phoneId });
      if (!phone) {
        return res.status(404).json({ message: "Phone not found" });
      }
      res.status(200).json(phone);
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Failed to fetch phone", error: error.message });
    }
  };
  
  

  export const createPhone = async (req, res) => {
    try {
      const { name, title, price, category, image } = req.body;
  
      const newPhone = new Phone({
        name,
        title,
        price,
        category,
        image,
      });
  
      await newPhone.save();
      res.status(201).json({ message: "Phone created successfully", phone: newPhone });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Failed to create phone", error: error.message });
    }
  };
  
 
  export const updatePhone = async (req, res) => {
    try {
      const { name, title, price, category, image } = req.body;
      const phone = await Phone.findByIdAndUpdate(
        req.params.id, { name, title, price, category, image }, { new: true }
      );
  
      if (!phone) {
        return res.status(404).json({ message: "Phone not found" });
      }  
      res.status(200).json({ message: "Phone updated successfully", phone });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Failed to update phone", error: error.message });
    }
  };
  

  export const deletePhone = async (req, res) => {
    try {
      const phone = await Phone.findByIdAndDelete(req.params.id);
      if (!phone) {
        return res.status(404).json({ message: "Phone not found" });
      }
      res.status(200).json({ message: "Phone deleted successfully" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Failed to delete phone", error: error.message });
    }
  };