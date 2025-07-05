import Owner from "../models/Owner.js";

export const registerOwner = async (req,res) => {
  try {
    const { name, email, password, mobile, location, role} = req.body;

    const emailExists = await Owner.findOne({ email });
    if(emailExists) {
      return res.status(400).json({ message: "Email already registered"});
    }

    const mobileExist = await Owner.findOne({ mobile });
    if(mobileExist) {
      return res.status(400).json({ message: "Mobile number already registered" });
    }

    const newOwner = new Owner({ name, email, password, mobile, location, role});
    await newOwner.save();
    console.log("Owner saved:", newOwner);
    res.status(201).json( { message: "Owner registered successfully" });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export const loginOwner = async (req,res) => {
    try {
      const { email, password }= req.body;
        
      const owner = await Owner.findOne({ email });
      if(!owner || owner.password !== password ) {
        return res.status(400).json({ messsage: "Invalid Email or Password"});
      }

      res.status(200).json({ message: "Login Successfull"});
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
}