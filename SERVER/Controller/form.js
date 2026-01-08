import Contact from "../model/contact.js";

export const form = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    // check existing email
    // const existingAccount = await Contact.findOne({ email });
    // if (existingAccount) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "Email already exists",
    //   });
    // }

    const user = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Form created successfully",
      user,
    });
  } catch (error) {
    console.error("Form creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAppContact = async (req, res) => {
  try {
    const allcontact = await Contact.find({});
    return res.status(200).json({
      success: true,
      message: "All contact fetched succesfully",
      data: allcontact,
    });
  } catch (error) {
    console.error("Issue in getting all the contact", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
